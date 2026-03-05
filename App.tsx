import './global.css';
import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Routes } from '@routes';
import { StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const queryClient = new QueryClient();

function App() {
  return (
    <SafeAreaProvider>
      <QueryClientProvider client={queryClient}>
        <StatusBar translucent barStyle="dark-content" />
        <Routes />
      </QueryClientProvider>
    </SafeAreaProvider>
  );
}

export default App;
