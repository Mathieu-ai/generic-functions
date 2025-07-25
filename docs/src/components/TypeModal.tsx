'use client';

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

import { SUCCESS_MESSAGES } from '@/lib/constants';
import type { DocType } from '@/lib/docs-parser';
import { copyToClipboard } from '@/lib/utils';

import { CodeBlock } from './CodeBlock';
import { Code, Copy, Type, X } from './icons';

interface TypeModalProps {
  readonly isOpen: boolean;
  readonly onClose: () => void;
  readonly type: DocType | null;
  readonly onNavigateToType?: (typeName: string) => void;
}

export function TypeModal({ isOpen, onClose, type }: TypeModalProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (isOpen) {
      // Prevent body scrolling when modal is open
      document.body.classList.add('modal-open');
      
      // Add keyboard event listener for escape key
      const handleEscape = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          onClose();
        }
      };
      
      document.addEventListener('keydown', handleEscape);
      
      return () => {
        document.removeEventListener('keydown', handleEscape);
      };
    } else {
      document.body.classList.remove('modal-open');
    }

    return () => {
      // Cleanup on unmount
      document.body.classList.remove('modal-open');
    };
  }, [isOpen, onClose]);

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleCopyDefinition = () => {
    if (type) {
      copyToClipboard(type.definition, SUCCESS_MESSAGES.TYPE_COPIED);
    }
  };

  const handleCopyName = () => {
    if (type) {
      copyToClipboard(type.name, SUCCESS_MESSAGES.NAME_COPIED);
    }
  };

  const getCategoryGradient = (category: string) => {
    return `gradient-${category}`;
  };

  const formatDefinition = (definition: string) => {
    if (definition.includes('{') && definition.length > 100) {
      return definition
        .replace(/,\s*(?=[a-zA-Z])/g, ',\n  ')
        .replace(/{/g, '{\n  ')
        .replace(/}/g, '\n}');
    }
    return definition;
  };

  if (!mounted || !isOpen || !type) {
    return null;
  }

  const modalContent = (
    <div
      className="modal-fixed flex items-center justify-center p-4"
      style={{ 
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        backdropFilter: 'blur(2px)'
      }}
      onClick={handleBackdropClick}
    >
      <div 
        className="bg-base-100 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden border border-base-300 transform transition-all duration-200 ease-out"
        style={{
          animation: 'fadeIn 200ms ease-out'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-base-300/50 bg-base-200/30">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-lg ${getCategoryGradient(type.category)} flex items-center justify-center`}>
              <Type className="h-5 w-5 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-base-content">{type.name}</h2>
              <p className="text-sm text-base-content/60">
                {type.category} • {type.sourceFile}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyName}
              className="modern-btn modern-btn-ghost modern-btn-sm tooltip tooltip-left"
              data-tip="Copy type name"
            >
              <Copy className="h-4 w-4" />
            </button>
            <button
              onClick={onClose}
              className="modern-btn modern-btn-ghost modern-btn-sm tooltip tooltip-left"
              data-tip="Close"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
          {/* Description */}
          {type.description && (
            <div className="mb-6">
              <p className="text-lg text-base-content/80 leading-relaxed">
                {type.description}
              </p>
            </div>
          )}

          {/* Type Definition */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-base-content flex items-center gap-2">
                <Code className="h-5 w-5 text-primary" />
                Definition
              </h3>
              <button
                onClick={handleCopyDefinition}
                className="modern-btn modern-btn-ghost modern-btn-sm"
              >
                <Copy className="h-4 w-4" />
                Copy
              </button>
            </div>
            <CodeBlock
              code={formatDefinition(type.definition)}
              language="typescript"
              showCopy={false}
              title="Type Definition"
            />
          </div>

          {/* Properties */}
          {type.properties && type.properties.length > 0 && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-base-content mb-4 flex items-center gap-2">
                <div className="w-5 h-5 rounded bg-gradient-to-br from-accent to-accent-focus flex items-center justify-center">
                  <span className="text-xs font-bold text-white">{type.properties.length}</span>
                </div>
                Properties
              </h3>
              <div className="grid gap-4">
                {type.properties.map((prop, index) => (
                  <div
                    key={index}
                    className="bg-base-200/50 rounded-lg p-4 border border-base-300/50"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <code className="text-primary font-mono font-semibold text-base">
                          {prop.name}
                        </code>
                        {prop.optional && (
                          <span className="badge badge-ghost badge-sm">optional</span>
                        )}
                      </div>
                      <code className="text-accent font-mono text-sm bg-accent/10 px-2 py-1 rounded">
                        {prop.type}
                      </code>
                    </div>
                    {prop.description && (
                      <p className="text-base-content/70 text-sm leading-relaxed">
                        {prop.description}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Version Info */}
          {type.since && (
            <div className="text-center py-4 border-t border-base-300/50">
              <span className="text-sm text-base-content/50">
                Available since v{type.since}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  // Use createPortal to render the modal at the document body level
  // Only render on client side to avoid SSR issues
  if (typeof window === 'undefined') {
    return null;
  }
  
  return createPortal(modalContent, document.body);
}
