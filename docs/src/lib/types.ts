/**
 * Common types used across the documentation website
 */

import type { DocConstant, DocFunction, DocType } from './docs-parser';

// Component prop types
export interface BaseCardProps {
  readonly onTypeClick?: (typeName: string) => void;
}

export interface FunctionCardProps extends BaseCardProps {
  readonly func: DocFunction;
  readonly types?: readonly DocType[];
}

export interface ConstantCardProps extends BaseCardProps {
  readonly constant: DocConstant;
}

export interface TypeCardProps extends BaseCardProps {
  readonly type: DocType;
}

export interface SearchBarProps {
  readonly onSearch: (term: string) => void;
  readonly placeholder?: string;
  readonly className?: string;
  readonly value?: string;
}

export interface CodeBlockProps {
  readonly code: string;
  readonly language?: string;
  readonly showCopy?: boolean;
  readonly title?: string;
  readonly maxHeight?: string;
  readonly collapsible?: boolean;
  readonly defaultCollapsed?: boolean;
  readonly previewLines?: number;
}

export interface ModalProps {
  readonly isOpen: boolean;
  readonly onClose: () => void;
}

export interface TypeModalProps extends ModalProps {
  readonly type: DocType | null;
  readonly onNavigateToType?: (typeName: string) => void;
}

export interface TypeTooltipProps {
  readonly typeName: string;
  readonly children: React.ReactNode;
  readonly types?: readonly DocType[];
  readonly onTypeClick?: (type: DocType) => void;
}

export interface SidebarProps {
  readonly activeTab: 'functions' | 'constants' | 'types';
  readonly filteredItems: ReadonlyArray<{
    readonly name: string;
    readonly description: string;
    readonly category?: string;
    readonly [key: string]: unknown;
  }>;
  readonly onItemClick?: (id: string) => void;
}

// State types
export interface TabSearchState {
  readonly functions: string;
  readonly constants: string;
  readonly types: string;
}

export interface SidebarState {
  readonly [category: string]: boolean;
}

// Context types
export interface ThemeContextType {
  readonly theme: 'light' | 'dark';
  readonly toggleTheme: () => void;
  readonly setTheme: (theme: 'light' | 'dark') => void;
}

export interface SidebarContextType {
  readonly sidebarState: SidebarState;
  readonly toggleCategory: (category: string) => void;
  readonly setCategoryState: (category: string, collapsed: boolean) => void;
}

// Utility types
export type TabType = 'functions' | 'constants' | 'types';

export interface FilterableItem {
  readonly name: string;
  readonly description: string;
}

export interface CategorizedItem extends FilterableItem {
  readonly category: string;
}

export interface PositionCoordinates {
  readonly x: number;
  readonly y: number;
}

// Toast types
export interface ToastOptions {
  readonly duration?: number;
  readonly style?: React.CSSProperties;
}

// Theme types
export type Theme = 'light' | 'dark';

// Icon component props
export interface IconProps {
  readonly className?: string;
}
