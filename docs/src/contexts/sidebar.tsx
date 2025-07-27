import { createContext, useContext, useEffect, useState } from 'react';

import { ERROR_MESSAGES, STORAGE_KEYS } from '@/lib/constants';

interface SidebarState {
  readonly [category: string]: boolean;
}

interface SidebarContextType {
  readonly sidebarState: SidebarState;
  readonly toggleCategory: (category: string) => void;
  readonly setCategoryState: (category: string, collapsed: boolean) => void;
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

export function SidebarProvider({ children }: { readonly children: React.ReactNode }) {
  const [sidebarState, setSidebarState] = useState<SidebarState>({});

  useEffect(() => {
    // Load saved sidebar state from localStorage
    const saved = localStorage.getItem(STORAGE_KEYS.SIDEBAR_STATE);
    if (saved) {
      try {
        setSidebarState(JSON.parse(saved));
      } catch (error) {
        console.error('Error parsing sidebar state:', error);
      }
    }
  }, []);

  const saveSidebarState = (newState: SidebarState) => {
    setSidebarState(newState);
    localStorage.setItem(STORAGE_KEYS.SIDEBAR_STATE, JSON.stringify(newState));
  };

  const toggleCategory = (category: string) => {
    const newState = {
      ...sidebarState,
      [category]: !sidebarState[category],
    };
    saveSidebarState(newState);
  };

  const setCategoryState = (category: string, collapsed: boolean) => {
    const newState = {
      ...sidebarState,
      [category]: collapsed,
    };
    saveSidebarState(newState);
  };

  return (
    <SidebarContext.Provider value={{ sidebarState, toggleCategory, setCategoryState }}>
      {children}
    </SidebarContext.Provider>
  );
}

export function useSidebar() {
  const context = useContext(SidebarContext);
  if (context === undefined) {
    throw new Error(ERROR_MESSAGES.SIDEBAR_REQUIRED);
  }
  return context;
}
