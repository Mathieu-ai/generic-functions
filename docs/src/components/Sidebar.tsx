'use client';

import { useSidebar } from '@/lib/sidebar-provider';
import { formatCategoryName, generateId, groupByCategory, scrollToElement, sortByName } from '@/lib/utils';

import { ChevronDown, ChevronRight } from './icons';

interface SidebarProps {
  readonly activeTab: 'functions' | 'constants' | 'types';
  readonly filteredItems: ReadonlyArray<{ 
    readonly name: string; 
    readonly description: string; 
    readonly category?: string; 
    readonly [key: string]: unknown; 
  }>;
  readonly onItemClick?: (id: string) => void;
}

export function Sidebar({ activeTab, filteredItems, onItemClick }: SidebarProps) {
  const { sidebarState, toggleCategory } = useSidebar();

  // Use filtered items and ensure they have category property
  const itemsWithCategory = filteredItems.map(item => ({
    ...item,
    category: item.category || 'other' // Fallback category if not present
  }));
  
  const groupedItems = groupByCategory(itemsWithCategory);

  const handleItemClick = (itemName: string) => {
    const id = generateId(activeTab.slice(0, -1), itemName); // Remove 's' from tab name
    scrollToElement(id);
    onItemClick?.(id);
  };

  const getCategoryIcon = (category: string) => {
    const gradientClass = `gradient-${category}`;
    return (
      <div className={`w-3 h-3 rounded-full ${gradientClass} flex-shrink-0`} />
    );
  };

  return (
    <div className="h-full flex flex-col bg-base-200/30">
      {/* Header */}
      <div className="p-6 border-b border-base-300/50">
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

      {/* Content */}
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
            {Object.entries(groupedItems).map(([category, items]) => {
              const isCollapsed = sidebarState[category] ?? false;
              const sortedItems = sortByName(items);

              return (
                <div key={category} className="space-y-1">
                  <button
                    onClick={() => toggleCategory(category)}
                    className="flex items-center justify-between w-full p-3 text-left rounded-lg hover:bg-base-300/50 transition-all duration-200 group"
                  >
                    <div className="flex items-center gap-3">
                      {getCategoryIcon(category)}
                      <span className="font-medium text-base-content group-hover:text-primary transition-colors">
                        {formatCategoryName(category)}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-base-content/60 bg-base-300 px-2 py-1 rounded-full font-medium">
                        {sortedItems.length}
                      </span>
                      {isCollapsed ? (
                        <ChevronRight className="h-4 w-4 text-base-content/60" />
                      ) : (
                        <ChevronDown className="h-4 w-4 text-base-content/60" />
                      )}
                    </div>
                  </button>
                  
                  {!isCollapsed && (
                    <div className="ml-6 space-y-1 pb-2">
                      {sortedItems.map((item) => (
                        <button
                          key={item.name}
                          onClick={() => handleItemClick(item.name)}
                          className="flex items-center justify-between w-full p-2 text-left text-sm rounded-md hover:bg-primary/10 hover:text-primary transition-all duration-200 group"
                        >
                          <span className="font-mono font-medium truncate">
                            {item.name}
                          </span>
                          <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                            <ChevronRight className="h-3 w-3" />
                          </div>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-base-300/50">
        <p className="text-xs text-base-content/50 text-center">
          Click any item to jump to its documentation
        </p>
      </div>
    </div>
  );
}
