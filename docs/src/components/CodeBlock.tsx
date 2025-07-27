'use client';

import { useEffect, useRef, useState } from 'react';

import { DEFAULT_VALUES } from '@/lib/constants';
import { copyToClipboard } from '@/lib/utils';

import { Check, ChevronDown, ChevronRight, Copy } from './icons';

interface CodeBlockProps {
  readonly code: string;
  readonly language?: string;
  readonly showCopy?: boolean;
  readonly title?: string;
  readonly maxHeight?: string;
  readonly collapsible?: boolean;
  readonly defaultCollapsed?: boolean;
  readonly previewLines?: number;
}

export function CodeBlock({ 
  code, 
  language = DEFAULT_VALUES.CODE_LANGUAGE, 
  showCopy = true, 
  title,
  maxHeight = DEFAULT_VALUES.MAX_HEIGHT,
  collapsible = false,
  defaultCollapsed = false,
  previewLines = DEFAULT_VALUES.PREVIEW_LINES
}: CodeBlockProps) {
  const codeRef = useRef<HTMLElement>(null);
  const [copied, setCopied] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(defaultCollapsed);

  // Calculate if code should be collapsible based on line count
  const shouldBeCollapsible = collapsible && code.split('\n').length > previewLines;
  
  // Get preview code for collapsed state
  const getDisplayCode = () => {
    if (shouldBeCollapsible && isCollapsed) {
      const lines = code.split('\n');
      return lines.slice(0, previewLines).join('\n') + '\n// ... more code';
    }
    return code;
  };

  const displayCode = getDisplayCode();

  useEffect(() => {
    const highlightCode = async () => {
      if (typeof window !== 'undefined' && codeRef.current) {
        try {
          // Dynamically import Prism to avoid SSR issues
          const Prism = (await import('prismjs')).default;
          
          // Import required language modules
          // @ts-expect-error - Prism component imports don't have type definitions
          await import('prismjs/components/prism-javascript');
          // @ts-expect-error - Prism component imports don't have type definitions
          await import('prismjs/components/prism-typescript');
          // @ts-expect-error - Prism component imports don't have type definitions
          await import('prismjs/components/prism-json');
          // @ts-expect-error - Prism component imports don't have type definitions
          await import('prismjs/components/prism-bash');
          
          // Double-check that the ref is still valid before setting innerHTML
          if (codeRef.current) {
            codeRef.current.innerHTML = Prism.highlight(
              displayCode,
              Prism.languages[language] || Prism.languages.javascript,
              language
            );
          }
        } catch (error) {
          console.warn('Prism highlighting failed:', error);
          // Fallback to plain text - check if ref is still valid
          if (codeRef.current) {
            codeRef.current.textContent = displayCode;
          }
        }
      }
    };

    highlightCode();
  }, [displayCode, language]);

  const handleCopy = async () => {
    await copyToClipboard(code, 'Code copied to clipboard!');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className="modern-code-block">
      {title && (
        <div className="modern-code-header">
          <div className="flex items-center gap-2">
            <span>{title}</span>
            {shouldBeCollapsible && (
              <button
                onClick={toggleCollapse}
                className="modern-btn modern-btn-ghost modern-btn-xs flex items-center gap-1"
                title={isCollapsed ? "Show full code" : "Show preview"}
              >
                {isCollapsed ? (
                  <>
                    <ChevronRight className="h-3 w-3" />
                    <span className="text-xs">Expand</span>
                  </>
                ) : (
                  <>
                    <ChevronDown className="h-3 w-3" />
                    <span className="text-xs">Collapse</span>
                  </>
                )}
              </button>
            )}
          </div>
          {showCopy && (
            <button
              onClick={handleCopy}
              className="modern-btn modern-btn-ghost modern-btn-sm"
              disabled={copied}
            >
              {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
              {copied ? 'Copied!' : 'Copy'}
            </button>
          )}
        </div>
      )}
      <div className="modern-code-content overflow-x-auto">
        <pre 
          className="modern-scrollbar min-w-full" 
          style={{ maxHeight }}
        >
          <code
            ref={codeRef}
            className={`language-${language} block`}
          >
            {displayCode}
          </code>
        </pre>
        {showCopy && !title && (
          <button
            onClick={handleCopy}
            className="modern-code-copy modern-btn modern-btn-ghost modern-btn-sm"
            disabled={copied}
          >
            {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
          </button>
        )}
        {shouldBeCollapsible && !title && (
          <button
            onClick={toggleCollapse}
            className="absolute bottom-2 left-2 modern-btn modern-btn-ghost modern-btn-xs flex items-center gap-1 bg-base-100/80 backdrop-blur-sm"
            title={isCollapsed ? "Show full code" : "Show preview"}
          >
            {isCollapsed ? (
              <>
                <ChevronRight className="h-3 w-3" />
                <span className="text-xs">Expand</span>
              </>
            ) : (
              <>
                <ChevronDown className="h-3 w-3" />
                <span className="text-xs">Collapse</span>
              </>
            )}
          </button>
        )}
      </div>
    </div>
  );
}
