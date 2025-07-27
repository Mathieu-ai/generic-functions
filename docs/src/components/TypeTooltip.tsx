'use client';

import { useEffect, useRef, useState } from 'react';

import type { DocType } from '@/lib/docs-parser';

import { CodeBlock } from './CodeBlock';
import { Type } from './icons';

interface TypeTooltipProps {
  readonly typeName: string;
  readonly children: React.ReactNode;
  readonly types?: readonly DocType[];
  readonly onTypeClick?: (type: DocType) => void;
}

export function TypeTooltip ({ typeName, children, types = [], onTypeClick }: TypeTooltipProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const tooltipRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLSpanElement>(null);

  // Find the type definition
  const typeDefinition = types.find(type => type.name === typeName);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (tooltipRef.current && !tooltipRef.current.contains(event.target as Node) &&
        triggerRef.current && !triggerRef.current.contains(event.target as Node)) {
        setIsVisible(false);
      }
    };

    if (isVisible) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isVisible]);

  const calculatePosition = (rect: DOMRect) => {
    const tooltipWidth = 350; // Approximate tooltip width
    const tooltipHeight = 300; // Approximate tooltip height
    const padding = 10;

    let x = rect.left + rect.width / 2;
    let y = rect.top - padding;

    // Adjust horizontal position if tooltip would go off screen
    if (x + tooltipWidth / 2 > window.innerWidth) {
      x = window.innerWidth - tooltipWidth / 2 - padding;
    } else if (x - tooltipWidth / 2 < 0) {
      x = tooltipWidth / 2 + padding;
    }

    // Adjust vertical position if tooltip would go off screen
    if (y - tooltipHeight < 0) {
      y = rect.bottom + padding;
    }

    return { x, y };
  };

  const handleMouseEnter = (e: React.MouseEvent) => {
    if (typeDefinition) {
      const rect = e.currentTarget.getBoundingClientRect();
      const newPosition = calculatePosition(rect);
      setPosition(newPosition);
      setIsVisible(true);
    }
  };

  const handleMouseLeave = () => {
    // Add a small delay before hiding to allow moving to tooltip
    setTimeout(() => {
      if (!tooltipRef.current?.matches(':hover') && !triggerRef.current?.matches(':hover')) {
        setIsVisible(false);
      }
    }, 100);
  };

  const handleTooltipMouseEnter = () => {
    setIsVisible(true);
  };

  const handleTooltipMouseLeave = () => {
    setIsVisible(false);
  };

  const handleTypeClick = () => {
    if (typeDefinition && onTypeClick) {
      onTypeClick(typeDefinition);
      setIsVisible(false);
    }
  };

  if (!typeDefinition) {
    return <>{children}</>;
  }

  return (
    <>
      <span
        ref={triggerRef}
        className="type-badge modern-tooltip"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {children}
      </span>

      {isVisible && (
        <div
          ref={tooltipRef}
          className="fixed z-50"
          style={{
            left: position.x,
            top: position.y - 10,
            transform: 'translate(-50%, -100%)'
          }}
          onMouseEnter={handleTooltipMouseEnter}
          onMouseLeave={handleTooltipMouseLeave}
        >
          <div className="modern-card bg-base-100 border border-base-300 shadow-2xl max-w-sm">
            <div className="modern-card-header">
              <div className="flex items-center gap-2">
                <Type className="h-4 w-4 text-primary" />
                <span className="text-sm font-semibold text-primary">{typeDefinition.name}</span>
                <span className="text-xs text-base-content/60 badge badge-outline badge-xs">
                  {typeDefinition.category}
                </span>
              </div>
              {typeDefinition.description && (
                <p className="text-sm text-base-content/80 mt-2 leading-relaxed">
                  {typeDefinition.description}
                </p>
              )}
            </div>
            <div className="modern-card-body">
              <CodeBlock
                code={typeDefinition.definition}
                language="typescript"
                showCopy={false}
                maxHeight="200px"
                collapsible={typeDefinition.definition.split('\n').length > 8}
                defaultCollapsed={false}
                previewLines={5}
              />
              {typeDefinition.properties && typeDefinition.properties.length > 0 && (
                <div className="mt-3 border-t border-base-300/50 pt-3">
                  <h6 className="text-xs font-semibold text-secondary mb-2 flex items-center gap-1">
                    <span>Properties</span>
                    <span className="badge badge-xs badge-secondary">
                      {typeDefinition.properties.length}
                    </span>
                  </h6>
                  <div className="space-y-1">
                    {typeDefinition.properties.slice(0, 4).map((prop, index) => (
                      <div key={index} className="text-xs flex justify-between items-center bg-base-200/50 rounded px-2 py-1">
                        <span className="font-mono text-accent font-medium">
                          {prop.name}{prop.optional ? '?' : ''}
                        </span>
                        <span className="text-base-content/60 text-right ml-2 truncate">
                          {prop.type}
                        </span>
                      </div>
                    ))}
                    {typeDefinition.properties.length > 4 && (
                      <div className="text-xs text-base-content/50 text-center py-1">
                        +{typeDefinition.properties.length - 4} more properties...
                      </div>
                    )}
                  </div>
                </div>
              )}
              {/* Click to view full details */}
              {onTypeClick && (
                <div className="mt-3 border-t border-base-300/50 pt-3">
                  <button
                    onClick={handleTypeClick}
                    className="w-full modern-btn modern-btn-primary modern-btn-sm text-xs"
                  >
                    View Full Details
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
