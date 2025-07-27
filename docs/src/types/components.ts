import { DocConstant, DocFunction, DocType } from '@/types/docs';

export interface BaseComponentProps {
  readonly className?: string;
}

export interface BaseCardProps extends BaseComponentProps {
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

export interface SearchBarProps extends BaseComponentProps {
  readonly onSearch: (term: string) => void;
  readonly placeholder?: string;
  readonly value?: string;
}

export interface CodeBlockProps extends BaseComponentProps {
  readonly code: string;
  readonly language?: string;
  readonly showCopy?: boolean;
  readonly title?: string;
  readonly maxHeight?: string;
  readonly collapsible?: boolean;
  readonly defaultCollapsed?: boolean;
  readonly previewLines?: number;
}

export interface ModalProps extends BaseComponentProps {
  readonly isOpen: boolean;
  readonly onClose: () => void;
}

export interface TypeModalProps extends ModalProps {
  readonly type: DocType | null;
  readonly onNavigateToType?: (typeName: string) => void;
}

export interface TypeTooltipProps extends BaseComponentProps {
  readonly typeName: string;
  readonly children: React.ReactNode;
  readonly types?: readonly DocType[];
  readonly onTypeClick?: (type: DocType) => void;
}
