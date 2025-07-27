'use client';

import { type ReactElement } from 'react';

import { useSidebar } from '@/lib/sidebar-provider';
import { formatCategoryName, generateId, groupByCategory, sortByName } from '@/lib/utils';

import { ChevronDown, ChevronRight } from './icons';

interface SidebarProps {
  readonly activeTab: 'functions' | 'constants' | 'types';
  readonly filteredItems: ReadonlyArray<{ 
    readonly name: string; 
    readonly description: string; 
    readonly category?: string; 
    readonly [key: string]: unknown; 
  }>;
  readonly onItemClick?: (id: string, itemIndex?: number) => void;
}

export function Sidebar({ activeTab, filteredItems, onItemClick }: SidebarProps): ReactElement {
  const { sidebarState, toggleCategory } = useSidebar();

  // Use filtered items and ensure they have category property
  const itemsWithCategory = filteredItems.map(item => ({
    ...item,
    category: item.category || 'other' // Fallback category if not present
  }));
  
  const groupedItems = groupByCategory(itemsWithCategory);

  const handleItemClick = (itemName: string) => {
    const id = generateId(activeTab.slice(0, -1), itemName); // Remove 's' from tab name
    
    // Find item's index in the full list
    const itemIndex = filteredItems.findIndex(item => item.name === itemName);
    
    // Pass both id and index to parent component
    onItemClick?.(id, itemIndex);
  };

  const getCategoryIcon = (category: string) => {
    const gradientClass = `gradient-${category}`;
    return (
      <div className={`w-3 h-3 rounded-full ${gradientClass} flex-shrink-0`} />
    );
  };

  return (
    <nav className="h-[100dvh] lg:h-full flex flex-col bg-base-200/30 fixed lg:relative inset-0 z-50">
      <div className="p-6 border-b border-base-300/50 bg-base-200/30 backdrop-blur-md">
        <h2 className="text-lg font-semibold text-base-content flex items-center gap-3">
          <div className="w-6 h-6 bg-gradient-to-br from-primary to-secondary rounded flex items-center justify-center">
            <span className="text-white font-bold text-xs">
              {activeTab[0].toUpperCase()}
            </span>
          </div>
          {formatCategoryName(activeTab)}
        </h2>
        <p className="text-sm text-base-content/60 mt-1">
          {filteredItems.length} item{filteredItems.length !== 1 ? 's' : ''} available
        </p>
      </div>

      <div className="flex-1 overflow-y-auto modern-scrollbar p-4">
        {Object.keys(groupedItems).length === 0 ? (
          <div className="text-center py-8">
            <div className="text-base-content/40 mb-2">
              <div className="w-12 h-12 bg-base-300 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl opacity-50">📋</span>
              </div>
            </div>
            <p className="text-sm text-base-content/60">
              No {activeTab} found
            </p>
          </div>
        ) : (
          <div className="space-y-2">
            {Object.entries(groupedItems).map(([category, items]) => (
              <div key={category} className="mb-2">
                <button
                  onClick={() => toggleCategory(category)}
                  className="flex w-full items-center justify-between rounded p-2 hover:bg-base-300"
                >
                  <div className="flex items-center gap-2">
                    {getCategoryIcon(category)}
                    <span className="font-medium">{formatCategoryName(category)}</span>
                    <span className="text-sm text-base-content/60">({items.length})</span>
                  </div>
                  {sidebarState[category] ? (
                    <ChevronDown className="h-4 w-4 text-base-content/60" />
                  ) : (
                    <ChevronRight className="h-4 w-4 text-base-content/60" />
                  )}
                </button>

                {sidebarState[category] && (
                  <ul className="mt-1 space-y-1 pl-5">
                    {sortByName(items).map(item => (
                      <li key={item.name}>
                        <button
                          onClick={() => handleItemClick(item.name)}
                          className="w-full rounded-sm p-1 text-left text-sm hover:bg-base-300"
                        >
                          {item.name}
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}
