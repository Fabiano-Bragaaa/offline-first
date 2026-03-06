import {
  ArrowLeft,
  ChevronLeft,
  ClipboardList,
  Plus,
} from 'lucide-react-native';
import { spacing } from '@theme';

const ICON_MAP = {
  'arrow-left': ArrowLeft,
  'chevron-left': ChevronLeft,
  'clipboard-list': ClipboardList,
  'plus': Plus,
};

export type IconName = keyof typeof ICON_MAP;

export type IconProps = {
  name: IconName;
  size?: number;
  color?: string;
};

export function Icon({ name, size = spacing.s24, color }: IconProps) {
  const LucideIconComponent = ICON_MAP[name];

  return (
    <LucideIconComponent size={size} color={color} />
  );
}
