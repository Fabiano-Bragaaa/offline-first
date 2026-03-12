# FieldSync — Offline-first Work Orders

FieldSync é um aplicativo **React Native** para gerenciamento de ordens de serviço com foco em **offline-first**.  
O app permite listar, criar, editar e excluir ordens de serviço mesmo sem conexão, sincronizando com a API assim que a internet volta.

A aplicação usa **Realm** como fonte de dados local e um fluxo de sincronização incremental com a API proposta no teste:

- `https://fieldsync.onrender.com/`
  - `GET /work-orders`
  - `GET /work-orders/:id`
  - `POST /work-orders`
  - `PUT /work-orders/:id`
  - `DELETE /work-orders/:id`
  - `GET /work-orders/sync?since=...`

> ⚠️ A API hiberna após inatividade e pode demorar alguns minutos para reiniciar.

---

### Setup Environment

Projeto criado com **React Native CLI** em TypeScript.

Antes de rodar:

- Configure o ambiente React Native:  
  [https://reactnative.dev/docs/environment-setup](https://reactnative.dev/docs/environment-setup)
- Certifique-se de ter:
  - Node.js
  - `pnpm` instalado globalmente (`npm i -g pnpm`)
  - Emulador Android ou simulador iOS configurado (ou dispositivo físico)

---

### Env Variables

O app consome a API via variável de ambiente para a base URL.

Crie um arquivo `.env` na raiz do projeto com:

```env
API_URL=https://fieldsync.onrender.com
```

Você pode usar `.env.example` como referência:

```env
API_URL=https://fieldsync.onrender.com
```

---

### Run

**Instalar dependências**

```sh
pnpm install
```

**Rodar o Metro**

```sh
pnpm start
```

**Rodar no Android**

```sh
pnpm android
```

**Rodar no iOS**

```sh
pnpm ios
```

---

### 🛠 Tech and Libraries

- [React Native](https://reactnative.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Realm](https://www.mongodb.com/docs/realm/sdk/react-native/) — banco de dados local principal
- [Axios](https://github.com/axios/axios) — HTTP client
- [TanStack React Query](https://tanstack.com/query/latest) — fetching, cache e sincronização de server state
- [Zustand](https://zustand-demo.pmnd.rs/) — estado global de sincronização (`isSyncing`, `lastSyncAt`, `isOnline`, `lastSyncError`)
- [React Navigation](https://reactnavigation.org/) — navegação
- [NativeWind](https://www.nativewind.dev/) — Tailwind CSS para React Native
- [@react-native-community/netinfo](https://github.com/react-native-netinfo/react-native-netinfo) — detecção de conectividade

---

### Arquitetura

A aplicação é organizada em camadas para separar responsabilidades:

- **`src/domain/order`**
  - `order-types.ts` — tipos de domínio (`Order`) e tipos brutos (`OrderRaw`, payloads da API)
  - `order-adapter.ts` — conversão `OrderRaw ↔ Order` e mapeamento de status
  - `order-local.ts` — acesso ao Realm (CRUD local, pendências, `applySync`, `upsertFromServer`, `reconcileCreate`)
  - `order-api.ts` — chamadas HTTP para a API (`GET/POST/PUT/DELETE/sync`)
  - `order-service.ts` — fachada de domínio usada pela UI (sempre offline-first, conversa só com Realm)
  - `order-sync.ts` — orquestração de sincronização (`syncUp`, `syncDown`, `sync`)
  - `use-cases/*` — hooks de aplicação (`useOrderList`, `useGetOrder`, `useCreateOrder`, `useUpdateOrder`, `useDeleteOrder`, `useSyncOrders`)

- **`src/services/order`**
  - `use-order.ts` — store global (Zustand) com estado de sync e funções `getOrderSyncState` / `getOrderSyncActions`
  - `order-type.ts` — tipos do estado de sync

- **`src/infra`**
  - `persistence/realm` — configuração do Realm + schema + migration (v1 → v2 com campos de sync)
  - `persistence/api` — configuração do Axios com `baseURL = API_URL`
  - `operations` — wrappers de React Query (`useAppQuery`, `useAppMutation`, `queryKeys`)

- **`src/screens/app`**
  - `home` — lista de ordens do Realm, criação via modal, gatilho de sincronização, lógica agrupada em `useHome`
  - `details` — detalhes da ordem, edição e exclusão, lógica agrupada em `useDetails`
  - componentes de UI específicos (cards, headers, modais)

---

### Fluxo Offline-first e Sincronização

#### Fonte de verdade

A **fonte única de verdade** para a UI é o Realm:

- `Home` e `Details` consomem dados via `orderService`, que lê de `orderLocal` (Realm).
- A API nunca é chamada diretamente pela UI.

#### Escritas offline-first

| Operação | Comportamento |
| --- | --- |
| `create` | Salva no Realm com `id = local_<timestamp>`, `pendingAction = 'create'` |
| `update` | Atualiza no Realm; se `pendingAction` era `'create'`, mantém `'create'`; senão `'update'` |
| `remove` | Se `pendingAction = 'create'` → delete definitivo; senão soft delete com `pendingAction = 'delete'` |

#### Fila de pendências

- Persistida no próprio Realm via campo `pendingAction` (`'create' | 'update' | 'delete' | null`).
- Campo `syncError` guarda a mensagem da última falha de sync por item.
- `orderLocal.getPending()` retorna todos os registros com pendência para o `syncUp`.

#### Sync Up (local → servidor)

Para cada item pendente:

- `'create'` → `POST /work-orders` → `reconcileCreate` troca o `id` local pelo id definitivo do servidor
- `'update'` → `PUT /work-orders/:id` → `upsertFromServer` aplica o retorno do servidor no Realm
- `'delete'` → `DELETE /work-orders/:id`
  - sucesso ou `404` → `clearPending`
  - qualquer outro erro → `setSyncError` por item, incrementa `failedCount`

#### Sync Down (servidor → local)

- Chama `GET /work-orders/sync?since=lastSyncAt`
- Aplica `created` e `updated` via `upsertFromServer` (com last-write-wins por `updatedAt`)
- Aplica `deleted` marcando registros como `deleted = true` (se não houver pendência local)
- Atualiza `lastSyncAt` no Zustand

#### Ordem da sincronização

```
sync()
  ├── syncUp()   → push: local → servidor
  └── syncDown() → pull: servidor → local (via /sync?since=...)
```

#### Estratégia de conflito

- **last-write-wins por `updatedAt`**:
  - Se o item local tiver `pendingAction`, compara `updatedAt` local com `updatedAt` do servidor.
  - Local mais recente → preserva local.
  - Servidor mais recente → aplica servidor e limpa `pendingAction` + `syncError`.
- No `syncUp` para `update`: sempre envia o estado local atual, depois reaplica o retorno do servidor via `upsertFromServer` para reconciliar campos normalizados e `updatedAt`.

#### Gatilho de sincronização

- A `Home` registra um listener em `NetInfo`.
- Quando a conexão é restaurada, dispara `orderSync.sync()` automaticamente.

### Screenshots / Demo

> Adicione aqui imagens ou um GIF curto mostrando o fluxo principal:
> - Lista de ordens (online e offline)
> - Criação/edição offline
> - Reconexão e sincronização automática
> - Tela de detalhes
