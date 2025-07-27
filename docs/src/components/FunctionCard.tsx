'use client';

import { useState } from 'react';

import { REGEX_PATTERNS, SUCCESS_MESSAGES } from '@/lib/constants';
import type { DocFunction, DocType } from '@/lib/docs-parser';
import { copyToClipboard, generateId } from '@/lib/utils';

import { CodeBlock } from './CodeBlock';
import { ArrowRight, Code, Copy, Hash } from './icons';
import { TypeModal } from './TypeModal';

interface FunctionCardProps {
  readonly func: DocFunction;
  readonly onTypeClick?: (typeName: string) => void;
  readonly types?: readonly DocType[];
}

export function FunctionCard ({ func, onTypeClick, types = [] }: FunctionCardProps) {
  const [selectedType, setSelectedType] = useState<DocType | null>(null);
  const [showTypeModal, setShowTypeModal] = useState(false);
  const id = generateId('function', func.name);

  const handleCopySignature = () => {
    copyToClipboard(func.syntax, SUCCESS_MESSAGES.SIGNATURE_COPIED);
  };

  const handleCopyExample = () => {
    copyToClipboard(func.example, SUCCESS_MESSAGES.EXAMPLE_COPIED);
  };

  const getCategoryGradient = (category: string) => {
    return `gradient-${category}`;
  };

  // Extract linked types from parameters and return type
  const getLinkedTypes = () => {
    const types = new Set<string>();

    // Helper function to extract base type name from generic types
    const extractBaseTypeName = (typeString: string): string | null => {
      // Remove generic type parameters like <T>, <K, V>, etc.
      const baseType = typeString.replace(REGEX_PATTERNS.GENERIC_TYPE, '');

      // Check if it's a custom type (starts with capital letter)
      if (baseType.match(REGEX_PATTERNS.CUSTOM_TYPE)) {
        return baseType;
      }

      // Check for interface types like i_func_filterData
      if (baseType.match(REGEX_PATTERNS.INTERFACE_TYPE)) {
        return baseType;
      }

      return null;
    };

    // Check parameters for custom types
    func.params?.forEach(param => {
      if (param.type) {
        const baseType = extractBaseTypeName(param.type);
        if (baseType) {
          types.add(baseType);
        }
      }
    });

    // Check return type
    if (func.returns?.type) {
      const baseType = extractBaseTypeName(func.returns.type);
      if (baseType) {
        types.add(baseType);
      }
    }

    return Array.from(types);
  };

  const linkedTypes = getLinkedTypes();

  const handleTypeModalClose = () => {
    setShowTypeModal(false);
    setSelectedType(null);
  };

  const renderParameterType = (type: string) => {
    // Extract base type name from generic types
    const extractBaseTypeName = (typeString: string): string | null => {
      const baseType = typeString.replace(/<[^>]*>/g, '');
      if (baseType.match(/^[A-Z][a-zA-Z0-9_]*$/) || baseType.match(/^i_[a-zA-Z0-9_]+$/)) {
        return baseType;
      }
      return null;
    };

    const baseTypeName = extractBaseTypeName(type);
    const isCustomType = baseTypeName && linkedTypes.includes(baseTypeName);
    const typeDefinition = baseTypeName ? types.find(t => t.name === baseTypeName) : null;

    if (isCustomType && typeDefinition) {
      return (
        <button
          onClick={() => {
            // Show modal directly
            setSelectedType(typeDefinition);
            setShowTypeModal(true);
          }}
          className="type-badge hover:scale-105 transition-transform cursor-pointer relative group"
          title={`Click to view ${baseTypeName} definition`}
        >
          {type} {/* Show the full type including generics */}
          <span className="absolute -top-1 -right-1 w-2 h-2 bg-primary rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
        </button>
      );
    } else if (isCustomType) {
      // Type exists but no definition found, still make it clickable to navigate
      return (
        <button
          onClick={() => {
            // Try to navigate to types tab as fallback
            if (onTypeClick) {
              onTypeClick(baseTypeName);
            }
          }}
          className="type-badge hover:scale-105 transition-transform cursor-pointer opacity-75"
          title={`Navigate to ${baseTypeName} in types tab`}
        >
          {type} {/* Show the full type including generics */}
        </button>
      );
    }

    return <code className="text-accent font-mono text-sm">{type}</code>;
  };

  return (
    <div id={id} className="modern-card">
      <div className="modern-card-header space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-3">
            <Hash className="h-5 w-5 text-primary flex-shrink-0" />
            <h3 className="text-xl sm:text-2xl font-bold text-primary break-all sm:break-normal">{func.name}</h3>
            <span className={`badge badge-sm ${getCategoryGradient(func.category)} text-white font-medium shrink-0`}>
              {func.category}
            </span>
          </div>

          <div className="flex gap-2 shrink-0">
            <button
              onClick={handleCopySignature}
              className="modern-btn modern-btn-ghost tooltip tooltip-left"
              data-tip="Copy signature"
            >
              <Copy className="h-4 w-4" />
            </button>
          </div>
        </div>

        <p className="text-base-content/80 text-lg leading-relaxed">{func.description}</p>

        {func.since && (
          <div className="text-xs text-base-content/50">
            Since v{func.since}
          </div>
        )}
      </div>

      <div className="modern-card-body flex flex-col gap-6">
        {/* Function Signature */}
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-3">
            <Code className="h-5 w-5 text-secondary" />
            <h4 className="font-semibold text-lg text-secondary">Signature</h4>
          </div>
          <div className="h-full">
            <CodeBlock code={func.syntax} language="typescript" showCopy={false} />
          </div>
        </div>

        {/* Parameters */}
        {func.params && func.params.length > 0 && (
          <div className="flex-1">
            <h4 className="font-semibold text-lg text-accent mb-3 flex items-center gap-2">
              <ArrowRight className="h-5 w-5" />
              Parameters
            </h4>
            <div className="space-y-3">
              {func.params.map((param, index) => (
                <div key={index} className="bg-base-200/50 rounded-lg p-4 border border-base-300/50">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <code className="text-primary font-mono font-semibold">{param.name}</code>
                      {param.optional && (
                        <span className="badge badge-ghost badge-sm">optional</span>
                      )}
                    </div>
                    <div>
                      {renderParameterType(param.type)}
                    </div>
                  </div>
                  <p className="text-base-content/70 text-sm">{param.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Returns */}
        {func.returns && (
          <div className="flex-1">
            <h4 className="font-semibold text-lg text-success mb-3 flex items-center gap-2">
              <ArrowRight className="h-5 w-5 rotate-180" />
              Returns
            </h4>
            <div className="bg-success/10 border border-success/20 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium text-success">Return Value</span>
                {renderParameterType(func.returns.type)}
              </div>
              <p className="text-base-content/70 text-sm">{func.returns.description}</p>
            </div>
          </div>
        )}

        {/* Example */}
        {func.example && func.example.trim() && (
          <div className="flex-1">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-semibold text-lg text-warning flex items-center gap-2">
                <Code className="h-5 w-5" />
                Example
              </h4>
              <button
                onClick={handleCopyExample}
                className="flex items-center gap-2 text-sm text-base-content/70 hover:text-base-content transition-colors"
              >
                <Copy className="h-4 w-4" />
                Copy
              </button>
            </div>
            <div className="h-full">
              <CodeBlock
                code={func.example}
                language="javascript"
                showCopy={false}
                title={`${func.name} Example`}
                collapsible={true}
                defaultCollapsed={func.example.split('\n').length > 6}
                previewLines={4}
              />
            </div>

            {/* Source File */}
            {func.sourceFile && (
              <div className="text-sm text-base-content/60">
                <span className="block sm:inline">Source: </span>
                <span className="font-mono text-base-content/70 break-all sm:break-normal">{func.sourceFile}</span>
              </div>
            )}
          </div>

        )}
      </div>

      {/* Type Modal */}
      <TypeModal
        isOpen={showTypeModal}
        onClose={handleTypeModalClose}
        type={selectedType}
      />
    </div>
  );
}
