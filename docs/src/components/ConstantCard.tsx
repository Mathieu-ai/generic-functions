'use client';

import { SUCCESS_MESSAGES } from '@/lib/constants';
import type { DocConstant } from '@/lib/docs-parser';
import { copyToClipboard, generateId } from '@/lib/utils';

import { CodeBlock } from './CodeBlock';
import { Copy, Database, Eye, Hash } from './icons';

interface ConstantCardProps {
  readonly constant: DocConstant;
  readonly onTypeClick?: (typeName: string) => void;
}

export function ConstantCard ({ constant, onTypeClick: _onTypeClick }: ConstantCardProps) {
  const id = generateId('constant', constant.name);

  const handleCopyValue = () => {
    copyToClipboard(constant.value, SUCCESS_MESSAGES.VALUE_COPIED);
  };

  const handleCopyName = () => {
    copyToClipboard(constant.name, SUCCESS_MESSAGES.NAME_COPIED);
  };

  const getCategoryGradient = (category: string) => {
    return `gradient-${category}`;
  };

  // Parse complex objects for better visualization
  const getFormattedValue = () => {
    if (constant.value.startsWith('{') && constant.value.includes('\n')) {
      // Multi-line object
      return constant.value;
    }
    return constant.value;
  };

  return (
    <div id={id} className="modern-card">
      <div className="modern-card-header space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-3 mb-3">
              <Hash className="h-5 w-5 text-primary flex-shrink-0" />
              <h3 className="text-xl sm:text-2xl font-bold text-primary break-all sm:break-normal">{constant.name}</h3>
              <span className={`badge badge-sm ${getCategoryGradient(constant.category)} text-white font-medium shrink-0`}>
                {constant.category}
              </span>
            </div>
            <p className="text-base-content/80 text-base sm:text-lg leading-relaxed break-words">{constant.description}</p>

            {constant.since && (
              <div className="flex items-center gap-2 mt-3">
                <span className="text-xs text-base-content/50">Since v{constant.since}</span>
              </div>
            )}
          </div>

          <div className="flex gap-2 shrink-0">
            <button
              onClick={handleCopyName}
              className="modern-btn modern-btn-ghost tooltip tooltip-left"
              data-tip="Copy name"
            >
              <Copy className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      <div className="modern-card-body">
        {/* Type */}
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-3">
            <Database className="h-5 w-5 text-secondary" />
            <h4 className="font-semibold text-lg text-secondary">Type</h4>
          </div>
          <div className="bg-secondary/10 border border-secondary/20 rounded-lg p-4">
            <code className="text-secondary font-mono font-semibold">{constant.type}</code>
          </div>
        </div>

        {/* Value */}
        <div className="mb-6">
          <div className="flex flex-wrap items-center justify-between mb-3 gap-4">
            <div className="flex items-center gap-3 min-w-0">
              <Eye className="h-5 w-5 text-accent flex-shrink-0" />
              <h4 className="font-semibold text-lg text-accent truncate">Value</h4>
            </div>
            <div className="flex-shrink-0">
              <button
                onClick={handleCopyValue}
                className="modern-btn modern-btn-ghost modern-btn-sm"
              >
                <Copy className="h-4 w-4" />
                <span className="hidden sm:inline ml-2">Copy</span>
              </button>
            </div>
          </div>
          <CodeBlock
            code={getFormattedValue()}
            language="javascript"
            showCopy={false}
            title={`${constant.name} Definition`}
            collapsible={true}
            defaultCollapsed={getFormattedValue().split('\n').length > 10}
            previewLines={6}
          />
        </div>

        {/* Special visualizations for specific constants */}
        {constant.name === 'REGEX' && (
          <div className="mb-4">
            <h5 className="font-medium text-base-content/80 mb-2">Common Patterns:</h5>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <code className="text-primary">email</code>
                <span className="text-base-content/60">Email validation</span>
              </div>
              <div className="flex justify-between">
                <code className="text-primary">url</code>
                <span className="text-base-content/60">URL validation</span>
              </div>
              <div className="flex justify-between">
                <code className="text-primary">datetime</code>
                <span className="text-base-content/60">DateTime parsing</span>
              </div>
            </div>
          </div>
        )}

        {constant.name === 'STATUS_COLORS' && (
          <div className="mb-4">
            <h5 className="font-medium text-base-content/80 mb-2">Color Preview:</h5>
            <div className="grid grid-cols-2 gap-2">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                <span className="text-sm">ACTIVE</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-gray-500 rounded-full"></div>
                <span className="text-sm">INACTIVE</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-orange-500 rounded-full"></div>
                <span className="text-sm">PENDING</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-red-500 rounded-full"></div>
                <span className="text-sm">ERROR</span>
              </div>
            </div>
          </div>
        )}

        {/* Source file */}
        {constant.sourceFile && (
          <div className="text-sm text-base-content/60">
            <span className="block sm:inline">Source: </span>
            <span className="font-mono text-base-content/70 break-all sm:break-normal">{constant.sourceFile}</span>
          </div>
        )}
      </div>
    </div>
  );
}
