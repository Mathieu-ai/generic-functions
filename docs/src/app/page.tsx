'use client';

import Image from 'next/image';
import { useCallback, useMemo, useState } from 'react';

import { ConstantCard } from '@/components/ConstantCard';
import { FunctionCard } from '@/components/FunctionCard';
import { BookOpen, Menu, Package, Type, X } from '@/components/icons';
import { SearchBar } from '@/components/SearchBar';
import { Sidebar } from '@/components/Sidebar';
import { ThemeToggle } from '@/components/ThemeToggle';
import { TypeCard } from '@/components/TypeCard';
import { TypeModal } from '@/components/TypeModal';
import docsData from '@/data/docs-data.json';
import type { DocsData, DocType, DocFunction, DocConstant } from '@/lib/docs-parser';
import { filterBySearch, generateId, scrollToElement } from '@/lib/utils';

interface TabSearchState {
  readonly functions: string;
  readonly constants: string;
  readonly types: string;
}

export default function HomePage() {
  const [activeTab, setActiveTab] = useState<'functions' | 'constants' | 'types'>('functions');
  const [searchTerms, setSearchTerms] = useState<TabSearchState>({
    functions: '',
    constants: '',
    types: ''
  });
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedType, setSelectedType] = useState<DocType | null>(null);
  const [showTypeModal, setShowTypeModal] = useState(false);
  
  // Load the generated documentation data
  const docs = docsData as DocsData;

  // Current search term for active tab
  const currentSearchTerm = searchTerms[activeTab];

  const filteredItems = useMemo(() => {
    const items = docs[activeTab] || [];
    return filterBySearch(items as { readonly name: string; readonly description: string }[], currentSearchTerm);
  }, [docs, activeTab, currentSearchTerm]);

  const handleTabChange = useCallback((tab: 'functions' | 'constants' | 'types') => {
    setActiveTab(tab);
  }, []);

  const handleSearch = useCallback((term: string) => {
    setSearchTerms(prev => ({
      ...prev,
      [activeTab]: term
    }));
  }, [activeTab]);

  const handleTypeClick = useCallback((typeName: string) => {
    // Check if the type exists in our types array
    const type = docs.types.find(t => t.name === typeName);
    if (type) {
      setSelectedType(type);
      setShowTypeModal(true);
    } else {
      // Fallback to scrolling to type if found
      setActiveTab('types');
      
      // Clear search to ensure the type is visible
      setSearchTerms(prev => ({
        ...prev,
        types: ''
      }));
      
      // After a small delay to ensure tab switch, scroll to the type
      setTimeout(() => {
        const typeId = generateId('type', typeName);
        scrollToElement(typeId);
      }, 100);
    }
  }, [docs.types]);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleTypeModalClose = () => {
    setShowTypeModal(false);
    setSelectedType(null);
  };

  const getTabIcon = (tab: string) => {
    switch (tab) {
      case 'functions': return <BookOpen className="h-4 w-4" />;
      case 'constants': return <Package className="h-4 w-4" />;
      case 'types': return <Type className="h-4 w-4" />;
      default: return null;
    }
  };

  const getTabCount = (tab: 'functions' | 'constants' | 'types') => {
    return docs[tab]?.length || 0;
  };

  const getTabDescription = (tab: 'functions' | 'constants' | 'types') => {
    switch (tab) {
      case 'functions': return 'Utility functions to boost your productivity';
      case 'constants': return 'Pre-defined constants and configurations';
      case 'types': return 'TypeScript type definitions and interfaces';
      default: return '';
    }
  };

  const renderEmptyState = () => {
    const messages = {
      functions: {
        title: currentSearchTerm ? 'No functions found' : 'No functions available',
        subtitle: currentSearchTerm 
          ? `No functions match "${currentSearchTerm}". Try adjusting your search.`
          : 'Start exploring by browsing the available categories.'
      },
      constants: {
        title: currentSearchTerm ? 'No constants found' : 'No constants available',
        subtitle: currentSearchTerm 
          ? `No constants match "${currentSearchTerm}". Try adjusting your search.`
          : 'Constants will appear here when available.'
      },
      types: {
        title: currentSearchTerm ? 'No types found' : 'No types available',
        subtitle: currentSearchTerm 
          ? `No types match "${currentSearchTerm}". Try adjusting your search.`
          : 'TypeScript definitions will appear here when available.'
      }
    };

    const message = messages[activeTab];

    return (
      <div className="text-center py-24">
        <div className="bg-base-200 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6 opacity-50">
          {getTabIcon(activeTab) && <div className="scale-[3] opacity-30">{getTabIcon(activeTab)}</div>}
        </div>
        <h3 className="text-2xl font-semibold text-base-content/60 mb-3">
          {message.title}
        </h3>
        <p className="text-base-content/50 max-w-md mx-auto leading-relaxed">
          {message.subtitle}
        </p>
        {currentSearchTerm && (
          <button
            onClick={() => handleSearch('')}
            className="modern-btn modern-btn-primary mt-6"
          >
            <X className="h-4 w-4" />
            Clear search
          </button>
        )}
      </div>
    );
  };

  const renderTabContent = () => {
    if (filteredItems.length === 0) {
      return renderEmptyState();
    }

    return (
      <div className="modern-grid">
        {filteredItems.map((item) => {
          switch (activeTab) {
            case 'functions':
              return <FunctionCard key={item.name} func={item as DocFunction} onTypeClick={handleTypeClick} types={docs.types} />;
            case 'constants':
              return <ConstantCard key={item.name} constant={item as DocConstant} onTypeClick={handleTypeClick} />;
            case 'types':
              return <TypeCard key={item.name} type={item as DocType} onTypeClick={handleTypeClick} />;
            default:
              return null;
          }
        })}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-base-100 transition-all duration-300">
      {/* Modern Header */}
      <header className="sticky top-0 z-40 bg-base-100/80 backdrop-blur-md border-b border-base-300/50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Left side - Logo and mobile menu */}
            <div className="flex items-center gap-4">
              <button
                onClick={toggleSidebar}
                className="modern-btn modern-btn-ghost lg:hidden"
                aria-label="Toggle sidebar"
              >
                <Menu className="h-5 w-5" />
              </button>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center overflow-hidden">
                  <Image src="/gf.png" alt="Generic Functions Logo" width={32} height={32} className="object-cover" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-base-content">Generic Functions</h1>
                  <p className="text-xs text-base-content/60 hidden sm:block">
                    v{docs.packageInfo?.version} • {getTabCount('functions')} functions, {getTabCount('constants')} constants, {getTabCount('types')} types
                  </p>
                </div>
              </div>
            </div>

            {/* Center - Search (desktop) */}
            <div className="hidden md:flex flex-1 max-w-md mx-8">
              <SearchBar
                value={currentSearchTerm}
                onSearch={handleSearch}
                placeholder={`Search ${activeTab}...`}
                className="w-full"
              />
            </div>

            {/* Right side - Controls */}
            <div className="flex items-center gap-2">
              <ThemeToggle />
            </div>
          </div>

          {/* Mobile search */}
          <div className="md:hidden pb-3">
            <SearchBar
              value={currentSearchTerm}
              onSearch={handleSearch}
              placeholder={`Search ${activeTab}...`}
              className="w-full"
            />
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Modern Sidebar */}
        <aside className={`
          fixed lg:sticky top-16 left-0 h-[calc(100vh-4rem)] 
          w-80 bg-base-200/50 backdrop-blur-md border-r border-base-300/50
          transform transition-transform duration-300 lg:transform-none z-30
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
          modern-scrollbar overflow-y-auto
        `}>
          <Sidebar 
            activeTab={activeTab}
            filteredItems={filteredItems}
            onItemClick={toggleSidebar}
          />
        </aside>

        {/* Overlay for mobile */}
        {sidebarOpen && (
          <div 
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-20 lg:hidden"
            onClick={toggleSidebar}
          />
        )}

        {/* Main Content */}
        <main className="flex-1 min-h-[calc(100vh-4rem)]">
          {/* Enhanced Tab Navigation */}
          <div className="border-b border-base-300/50 bg-base-100/50">
            <div className="container mx-auto px-4">
              <div className="flex space-x-8 overflow-x-auto">
                {(['functions', 'constants', 'types'] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => handleTabChange(tab)}
                    className={`
                      flex items-center gap-3 py-4 px-2 border-b-2 transition-all duration-200
                      ${activeTab === tab 
                        ? 'border-primary text-primary' 
                        : 'border-transparent text-base-content/60 hover:text-base-content hover:border-base-content/20'
                      }
                    `}
                  >
                    <div className="flex items-center gap-2">
                      {getTabIcon(tab)}
                      <span className="font-medium capitalize">{tab}</span>
                    </div>
                    <span className="bg-base-300 text-base-content/80 px-2 py-1 rounded-full text-xs font-medium">
                      {getTabCount(tab)}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Tab description */}
          <div className="bg-base-200/30 border-b border-base-300/50">
            <div className="container mx-auto px-4 py-4">
              <p className="text-base-content/70">
                {getTabDescription(activeTab)}
              </p>
            </div>
          </div>

          {/* Content Area */}
          <div className="container mx-auto px-4 py-8">
            {renderTabContent()}
          </div>
        </main>
      </div>

      {/* Modern Footer */}
      <footer className="bg-base-200/50 border-t border-base-300/50 mt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-4">
              <div className="w-6 h-6 rounded flex items-center justify-center overflow-hidden">
                <Image src="/gf.png" alt="Generic Functions Logo" width={24} height={24} className="object-cover" />
              </div>
              <div>
                <p className="text-sm font-medium text-base-content">Generic Functions</p>
                <p className="text-xs text-base-content/60">
                  A comprehensive utility library for developers
                </p>
              </div>
            </div>
            <div className="flex items-center gap-6 text-sm text-base-content/60">
              {docs.packageInfo?.repository && (
                <a 
                  href={docs.packageInfo.repository.url.replace('git+', '')} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-primary transition-colors"
                >
                  GitHub
                </a>
              )}
              <span>v{docs.packageInfo?.version}</span>
              <span>{docs.packageInfo?.license}</span>
            </div>
          </div>
        </div>
      </footer>

      {/* Global Type Modal */}
      <TypeModal
        isOpen={showTypeModal}
        onClose={handleTypeModalClose}
        type={selectedType}
        onNavigateToType={handleTypeClick}
      />
    </div>
  );
}
