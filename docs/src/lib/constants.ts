/**
 * Application constants
 */

// Tab types
export const TAB_TYPES = {
  FUNCTIONS: 'functions',
  CONSTANTS: 'constants',
  TYPES: 'types',
} as const;

export type TabType = typeof TAB_TYPES[keyof typeof TAB_TYPES];

// Default values
export const DEFAULT_VALUES = {
  SEARCH_PLACEHOLDER: 'Search...',
  CODE_LANGUAGE: 'javascript',
  MAX_HEIGHT: 'none',
  PREVIEW_LINES: 3,
  DEBOUNCE_DELAY: 300,
  TOAST_DURATION: 2000,
} as const;

// CSS classes
export const CSS_CLASSES = {
  MODERN_CARD: 'modern-card',
  MODERN_CARD_HEADER: 'modern-card-header',
  MODERN_CARD_BODY: 'modern-card-body',
  MODERN_BTN: 'modern-btn',
  MODERN_BTN_GHOST: 'modern-btn-ghost',
  MODERN_SCROLLBAR: 'modern-scrollbar',
  TYPE_BADGE: 'type-badge',
} as const;

// Local storage keys
export const STORAGE_KEYS = {
  THEME: 'theme',
  SIDEBAR_STATE: 'sidebar-state',
} as const;

// API endpoints and paths
export const PATHS = {
  DOCS_DATA: '@/data/docs-data.json',
} as const;

// Regular expressions
export const REGEX_PATTERNS = {
  ID_CLEANUP: /[^a-z0-9]/g,
  CUSTOM_TYPE: /^[A-Z][a-zA-Z0-9_]*$/,
  INTERFACE_TYPE: /^i_[a-zA-Z0-9_]+$/,
  GENERIC_TYPE: /<[^>]*>/g,
} as const;

// Error messages
export const ERROR_MESSAGES = {
  COPY_FAILED: 'Failed to copy to clipboard',
  THEME_REQUIRED: 'useTheme must be used within a ThemeProvider',
  SIDEBAR_REQUIRED: 'useSidebar must be used within a SidebarProvider',
} as const;

// Success messages
export const SUCCESS_MESSAGES = {
  COPIED: 'Copied to clipboard!',
  SIGNATURE_COPIED: 'Function signature copied!',
  EXAMPLE_COPIED: 'Example copied!',
  TYPE_COPIED: 'Type definition copied!',
  NAME_COPIED: 'Name copied!',
  VALUE_COPIED: 'Constant value copied!',
} as const;
