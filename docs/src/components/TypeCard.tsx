import { SUCCESS_MESSAGES } from '@/lib/constants';
import type { DocType } from '@/lib/docs-parser';
import { copyToClipboard, generateId } from '@/lib/utils';

import { CodeBlock } from './CodeBlock';
import { Code, Copy, Type } from './icons';

interface TypeCardProps {
  readonly type: DocType;
  readonly onTypeClick?: (typeName: string) => void;
}

export function TypeCard ({ type, onTypeClick: _onTypeClick }: TypeCardProps) {
  const id = generateId('type', type.name);

  const handleCopyType = () => {
    copyToClipboard(type.definition, SUCCESS_MESSAGES.TYPE_COPIED);
  };

  const handleCopyName = () => {
    copyToClipboard(type.name, SUCCESS_MESSAGES.NAME_COPIED);
  };

  const getCategoryGradient = (category: string) => {
    return `gradient-${category}`;
  };

  // Format complex type definitions for better readability
  const getFormattedDefinition = () => {
    if (type.definition.includes('{') && type.definition.length > 100) {
      // Multi-line interface/object type
      return type.definition
        .replace(/,\s*(?=[a-zA-Z])/g, ',\n  ')
        .replace(/{/g, '{\n  ')
        .replace(/}/g, '\n}');
    }
    return type.definition;
  };

  return (
    <div id={id} className="modern-card">
      <div className="modern-card-header space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-3 mb-3">
              <Type className="h-5 w-5 text-info flex-shrink-0" />
              <h3 className="text-xl sm:text-2xl font-bold text-info break-all sm:break-normal">{type.name}</h3>
              <span className={`badge badge-sm ${getCategoryGradient(type.category)} text-white font-medium shrink-0`}>
                {type.category}
              </span>
            </div>
            <p className="text-base-content/80 text-base sm:text-lg leading-relaxed break-words">{type.description}</p>

            {type.since && (
              <div className="flex items-center gap-2 mt-3">
                <span className="text-xs text-base-content/50">Since v{type.since}</span>
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
        {/* Type Definition */}
        <div className="mb-6">
          <div className="flex flex-wrap items-center justify-between mb-3 gap-4">
            <div className="flex items-center gap-3 min-w-0">
              <Code className="h-5 w-5 text-warning flex-shrink-0" />
              <h4 className="font-semibold text-lg text-warning truncate">Definition</h4>
            </div>
            <div className="flex-shrink-0">
              <button
                onClick={handleCopyType}
                className="modern-btn modern-btn-ghost modern-btn-sm"
              >
                <Copy className="h-4 w-4" />
                <span className="hidden sm:inline ml-2">Copy</span>
              </button>
            </div>
          </div>
          <CodeBlock
            code={getFormattedDefinition()}
            language="typescript"
            showCopy={false}
            title={`${type.name} Type`}
            collapsible={true}
            defaultCollapsed={getFormattedDefinition().split('\n').length > 8}
            previewLines={5}
          />
        </div>

        {/* Expanded Details */}

        <div className="border-t border-base-300/50 pt-6">
          {/* Source file */}
          {type.sourceFile && (
            <div className="text-sm text-base-content/60 mt-4">
              <span className="block sm:inline">Source: </span>
              <span className="font-mono text-base-content/70 break-all sm:break-normal">{type.sourceFile}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
