/**
 * Documentation types
 */

export interface DocParameter {
  readonly name: string;
  readonly type: string;
  readonly description: string;
  readonly optional?: boolean;
  readonly defaultValue?: string;
}

export interface DocReturn {
  readonly type: string;
  readonly description: string;
}

export interface DocFunction {
  readonly name: string;
  readonly description: string;
  readonly category: string;
  readonly syntax: string;
  readonly params?: readonly DocParameter[];
  readonly returns?: DocReturn;
  readonly example: string;
  readonly sourceFile?: string;
}

export interface DocConstant {
  readonly name: string;
  readonly description: string;
  readonly category: string;
  readonly value: string;
  readonly type: string;
  readonly sourceFile?: string;
}

export interface DocType {
  readonly name: string;
  readonly description: string;
  readonly category: string;
  readonly definition: string;
  readonly sourceFile?: string;
}

/**
 * Documentation data structure
 */
export interface DocsData {
  readonly functions: readonly DocFunction[];
  readonly constants: readonly DocConstant[];
  readonly types: readonly DocType[];
}

/**
 * Theme type
 */
export type Theme = 'light' | 'dark';
