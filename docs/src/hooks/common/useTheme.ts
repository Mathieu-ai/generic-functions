import { ERROR_MESSAGES } from '@/lib/constants';
import { useTheme as useThemeBase } from '@/lib/theme-provider';

export function useTheme() {
  const context = useThemeBase();
  if (context === undefined) {
    throw new Error(ERROR_MESSAGES.THEME_REQUIRED);
  }
  return context;
}
