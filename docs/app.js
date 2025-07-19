class FunctionsDocs {
    // SECTION - FunctionsDocs Class Definition
    // ANCHOR - Constructor and Initialization
    constructor() {
        // NOTE - Constructor: Initializes the FunctionsDocs class with default values or provided data.
        this.functions = functionsData || [];
        this.constants = constantsData || [];
        this.packageInfo = packageInfo || {};
        this.currentCategory = 'all';
        this.currentTab = 'functions'; // Add tab state
        this.searchTerm = '';
        this.categories = {};
        this.sidebarCollapseState = {};
        this.defaultCollapse = true;
        this.init();
    }

    // ANCHOR - Application Initialization
    init() {
        // NOTE - init: Initializes the theme, sidebar, functions, events, and page information.
        this.initTheme();
        this.loadSidebarCollapsePreference();
        this.processCategories();
        this.renderSidebar();
        this.renderContent(); // Changed from renderFunctions
        this.bindEvents();
        this.updatePageInfo();
    }

    // SECTION - Page Information Management
    // ANCHOR - Package Information Display
    updatePageInfo() {
        // NOTE - updatePageInfo: Updates the page title and UI with package info.
        // Update page title with package info
        if (this.packageInfo.name) {
            document.title = `${this.packageInfo.name} - Documentation`;
        }

        // ANCHOR - Package Name Display
        const packageNameEl = document.querySelector('[data-package-name]');
        if (packageNameEl && this.packageInfo.name) {
            packageNameEl.textContent = this.packageInfo.name;
        }

        // ANCHOR - Package Version Display
        const packageVersionEl = document.querySelector('[data-package-version]');
        if (packageVersionEl && this.packageInfo.version) {
            packageVersionEl.textContent = `v${this.packageInfo.version}`;
        }

        // ANCHOR - Package Author Display
        const packageAuthorEl = document.querySelector('[data-package-author]');
        if (packageAuthorEl && this.packageInfo.author) {
            // NOTE - Handle both string and object author formats
            const authorName = typeof this.packageInfo.author === 'string'
                ? this.packageInfo.author
                : this.packageInfo.author?.name || 'Unknown';
            packageAuthorEl.textContent = authorName;
        }

        // ANCHOR - Package Description Display
        const packageDescriptionEl = document.querySelector('[data-package-description]');
        if (packageDescriptionEl) {
            packageDescriptionEl.innerHTML = '';
            if (this.packageInfo.description) {
                // NOTE - Split description into sentences for better formatting
                const points = this.packageInfo.description.match(/[^.?!]+[.?!]+(\s|$)/g) || [this.packageInfo.description];
                points.forEach(point => {
                    const p = document.createElement('p');
                    p.textContent = point.trim();
                    packageDescriptionEl.appendChild(p);
                });
            }
        }
    }

    // SECTION - Theme Management
    // ANCHOR - Theme Initialization
    initTheme() {
        // NOTE - initTheme: Initializes and applies the theme (dark/light) on load.
        // Get saved theme preference, system preference, or default to 'light'
        const savedTheme = localStorage.getItem('theme');
        const systemPreference = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
        const initialTheme = savedTheme || systemPreference;

        // Set initial theme without animation
        this.setTheme(initialTheme, false);

        // ANCHOR - Theme Animation Enablement
        // Enable transitions after initial theme is set
        setTimeout(() => {
            document.documentElement.classList.add('theme-ready');
        }, 50);
    }

    // ANCHOR - Theme Application
    setTheme(theme, animate = true) {
        // NOTE - setTheme: Sets the theme and updates UI elements accordingly.
        const html = document.documentElement;
        const sunIcon = document.getElementById('sunIcon');
        const moonIcon = document.getElementById('moonIcon');

        // ANCHOR - Theme Transition Control
        // Disable transitions during theme switch for instant change
        if (animate) {
            html.classList.add('theme-switching');
            html.classList.remove('theme-ready');
        }

        // ANCHOR - Theme Class Application
        // Apply theme class immediately
        if (theme === 'dark') {
            html.classList.add('dark');
        } else {
            html.classList.remove('dark');
        }

        // ANCHOR - Theme Icon Updates
        // Update icons instantly
        if (sunIcon && moonIcon) {
            if (theme === 'dark') {
                sunIcon.style.opacity = '0';
                sunIcon.style.transform = 'rotate(180deg)';
                moonIcon.style.opacity = '1';
                moonIcon.style.transform = 'rotate(0deg)';
            } else {
                sunIcon.style.opacity = '1';
                sunIcon.style.transform = 'rotate(0deg)';
                moonIcon.style.opacity = '0';
                moonIcon.style.transform = 'rotate(-180deg)';
            }
        }

        // ANCHOR - Theme Persistence
        // Save theme preference
        localStorage.setItem('theme', theme);

        // ANCHOR - Theme Animation Re-enablement
        // Re-enable transitions after a short delay
        if (animate) {
            requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                    html.classList.remove('theme-switching');
                    html.classList.add('theme-ready');
                });
            });
        }
    }

    // ANCHOR - Theme Toggle Handler
    toggleTheme() {
        // NOTE - toggleTheme: Toggles between dark and light themes.
        const isDark = document.documentElement.classList.contains('dark');
        this.setTheme(isDark ? 'light' : 'dark', true);

        // ANCHOR - Haptic Feedback
        // Add haptic feedback if available
        if ('vibrate' in navigator) {
            navigator.vibrate(50);
        }

        // ANCHOR - Visual Feedback
        // Add visual feedback to theme toggle button
        const themeToggle = document.getElementById('themeToggle');
        if (themeToggle) {
            themeToggle.style.transform = 'scale(0.95)';
            setTimeout(() => {
                themeToggle.style.transform = 'scale(1)';
            }, 100);
        }
    }

    // SECTION - Category Management
    // ANCHOR - Category Processing
    processCategories() {
        // NOTE - processCategories: Groups and sorts functions by category.
        // Group functions by category
        this.categories = this.functions.reduce((acc, func) => {
            if (!acc[func.category]) {
                acc[func.category] = [];
            }
            acc[func.category].push(func);
            return acc;
        }, {});

        // ANCHOR - Function Sorting
        // Sort functions within each category
        Object.keys(this.categories).forEach(category => {
            this.categories[category].sort((a, b) => a.name.localeCompare(b.name));
        });
    }

    // SECTION - Sidebar Preferences
    // ANCHOR - Sidebar Collapse Preference Loading
    loadSidebarCollapsePreference() {
        // NOTE - loadSidebarCollapsePreference: Loads sidebar collapse/expand preference from localStorage.
        const pref = localStorage.getItem('sidebarCollapseDefault');
        if (pref === 'expand') {
            this.defaultCollapse = false;
        } else {
            this.defaultCollapse = true;
        }
    }

    // ANCHOR - Sidebar Collapse Preference Setting
    setSidebarCollapsePreference(pref) {
        // NOTE - setSidebarCollapsePreference: Sets and saves sidebar collapse/expand preference.
        localStorage.setItem('sidebarCollapseDefault', pref);
        this.defaultCollapse = (pref !== 'expand');
        // Reset all collapse state and re-render
        this.sidebarCollapseState = {};
        this.renderSidebar();
    }

    // SECTION - Sidebar Rendering
    // ANCHOR - Main Sidebar Render
    renderSidebar() {
        // NOTE - renderSidebar: Renders the sidebar with categories and handles expand/collapse logic.
        const categoriesList = document.getElementById('categoriesList');
        if (!categoriesList) return;

        // ANCHOR - Tab Navigation HTML
        const tabNavigationHtml = `
            <div class="flex mb-4 bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
                <button class="tab-btn flex-1 py-2 px-3 rounded-md text-xs font-semibold transition ${this.currentTab === 'functions' ? 'bg-yellow-400 text-gray-900' : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'}"
                        data-tab="functions">
                    Functions (${this.functions.length})
                </button>
                <button class="tab-btn flex-1 py-2 px-3 rounded-md text-xs font-semibold transition ${this.currentTab === 'constants' ? 'bg-yellow-400 text-gray-900' : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'}"
                        data-tab="constants">
                    Constants (${this.constants.length})
                </button>
            </div>
        `;

        let contentHtml = '';

        if (this.currentTab === 'functions') {
            const categoryNames = Object.keys(this.categories).sort();

            // ANCHOR - Options Menu HTML
            const optionMenuHtml = `
                <div class="flex justify-end mb-2 pr-2">
                    <div class="relative inline-block text-left">
                        <button id="sidebarOptionsBtn" class="text-xs text-gray-500 dark:text-gray-400 hover:text-yellow-600 dark:hover:text-yellow-400 px-2 py-1 rounded focus:outline-none border border-transparent hover:border-gray-300 dark:hover:border-gray-700">
                            <span class="font-semibold">Options</span>
                            <svg class="inline w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 20 20">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7l3-3 3 3m0 6l-3 3-3-3"/>
                            </svg>
                        </button>
                        <div id="sidebarOptionsMenu" class="hidden absolute right-0 mt-1 w-36 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded shadow-lg z-50">
                            <button class="block w-full text-left px-4 py-2 text-xs text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700" data-sidebar-option="expand">Expand all</button>
                            <button class="block w-full text-left px-4 py-2 text-xs text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700" data-sidebar-option="collapse">Collapse all</button>
                        </div>
                    </div>
                </div>
            `;

            // ANCHOR - All Functions Button HTML
            const allFunctionsHtml = `
                <div class="mb-4">
                    <button class="w-full flex items-center justify-center gap-2 py-2 px-4 rounded-xl bg-gradient-to-r from-yellow-400 to-yellow-300 text-gray-900 font-bold shadow hover:from-yellow-500 hover:to-yellow-400 transition
                        ${this.currentCategory === 'all' ? 'ring-2 ring-yellow-400' : ''}"
                        data-category="all"
                        data-action="select">
                        <svg class="w-5 h-5 text-yellow-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <circle cx="12" cy="12" r="10" stroke-width="2"/>
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h8M12 8v8"/>
                        </svg>
                        All Functions (${this.functions.length})
                    </button>
                </div>
            `;

            // ANCHOR - Category Cards HTML Generation
            const categoriesHtml = categoryNames.map(categoryName => {
                const functions = this.categories[categoryName];
                const isCollapsed = this.sidebarCollapseState[categoryName] !== undefined
                    ? this.sidebarCollapseState[categoryName]
                    : this.defaultCollapse;
                const isActive = this.currentCategory === categoryName;

                return `
                    <div class="category-item${isCollapsed ? ' collapsed' : ''} mb-4 rounded-2xl shadow-md bg-white/90 dark:bg-gray-800/90 border border-gray-200 dark:border-gray-700 transition group overflow-hidden">
                        <div class="flex items-center px-4 py-3 border-b border-yellow-200 dark:border-yellow-900 bg-yellow-50 dark:bg-yellow-900/20">
                            <button class="category-name-btn flex-1 text-left text-xs font-extrabold tracking-widest uppercase text-yellow-700 dark:text-yellow-300 ${isActive ? 'underline underline-offset-4' : ''} focus:outline-none"
                                data-category="${categoryName}"
                                data-action="select">
                                ${categoryName}
                                <span class="ml-2 text-xs text-gray-400 dark:text-gray-500 font-normal">(${functions.length})</span>
                            </button>
                            <button class="category-expand-btn ml-2 p-1 rounded-full hover:bg-yellow-100 dark:hover:bg-yellow-900/40 transition"
                                data-category="${categoryName}"
                                data-action="toggle"
                                title="${isCollapsed ? 'Expand' : 'Collapse'} ${categoryName} category">
                                <svg class="w-5 h-5 text-yellow-500 dark:text-yellow-300 transition-transform duration-200${isCollapsed ? '' : ' rotate-90'}"
                                    fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                                </svg>
                            </button>
                        </div>
                        <div class="category-content px-2 py-2${isCollapsed ? '" style="display:none;' : ''}" >
                            <div class="method-list flex flex-col gap-1 max-h-48 overflow-y-auto">
                                ${functions.map(func => `
                                    <a href="#${func.name}" 
                                        class="function-link flex items-center gap-2 px-3 py-2 rounded-full bg-gray-50 dark:bg-gray-900/60 text-xs font-mono text-gray-700 dark:text-gray-200 hover:bg-yellow-100 dark:hover:bg-yellow-800 hover:text-yellow-700 dark:hover:text-yellow-300 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition"
                                        data-function="${func.name}">
                                        <svg class="w-3 h-3 text-yellow-400" fill="currentColor" viewBox="0 0 20 20"><circle cx="10" cy="10" r="10"/></svg>
                                        ${func.name}
                                    </a>
                                `).join('')}
                            </div>
                        </div>
                    </div>
                `;
            }).join('');

            contentHtml = optionMenuHtml + allFunctionsHtml + categoriesHtml;
        } else if (this.currentTab === 'constants') {
            // ANCHOR - Constants Search Results
            const filteredConstants = this.filterConstants();

            const constantsListHtml = `
                <div class="constants-search-results flex flex-col gap-2">
                    ${filteredConstants.length === 0 ? `
                        <div class="text-center py-8 text-gray-500 dark:text-gray-400">
                            <p class="text-sm">No constants found${this.searchTerm ? ` for "${this.searchTerm}"` : ''}</p>
                        </div>
                    ` : filteredConstants.map(constant => `
                        <button class="constant-item text-left bg-white/90 dark:bg-gray-800/90 border border-gray-200 dark:border-gray-700 rounded-xl p-3 shadow-sm hover:shadow-md hover:bg-blue-50 dark:hover:bg-blue-900/20 transition cursor-pointer"
                                data-constant-name="${constant.name}">
                            <div class="flex items-center gap-2 mb-2">
                                <svg class="w-4 h-4 text-blue-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M9 12h2v2H9v-2zm0-8h2v6H9V4zm1-4C4.477 0 0 4.477 0 10s4.477 10 10 10 10-4.477 10-10S15.523 0 10 0z"/>
                                </svg>
                                <span class="font-mono text-sm font-semibold text-gray-900 dark:text-white">${this.highlightSearchTerm(constant.name)}</span>
                            </div>
                            <p class="text-xs text-gray-600 dark:text-gray-400 mb-2">${this.highlightSearchTerm(constant.description)}</p>
                            <div class="text-xs font-mono bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200 px-2 py-1 rounded overflow-hidden">
                                ${this.highlightSearchTerm(constant.preview)}
                            </div>
                        </button>
                    `).join('')}
                </div>
            `;

            contentHtml = constantsListHtml;
        }

        categoriesList.innerHTML = tabNavigationHtml + contentHtml;

        // ANCHOR - Tab Button Event Binding
        categoriesList.querySelectorAll('.tab-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const tab = btn.getAttribute('data-tab');
                this.switchTab(tab);
            });
        });

        // ANCHOR - Options Menu Event Binding
        // Option menu events
        setTimeout(() => {
            const btn = document.getElementById('sidebarOptionsBtn');
            const menu = document.getElementById('sidebarOptionsMenu');
            if (btn && menu) {
                btn.onclick = (e) => {
                    e.stopPropagation();
                    menu.classList.toggle('hidden');
                };
                document.body.addEventListener('click', () => menu.classList.add('hidden'));
                menu.querySelectorAll('[data-sidebar-option]').forEach(optBtn => {
                    optBtn.onclick = (e) => {
                        const val = optBtn.getAttribute('data-sidebar-option');
                        if (val === 'expand') this.setSidebarCollapsePreference('expand');
                        else this.setSidebarCollapsePreference('collapse');
                        menu.classList.add('hidden');
                    };
                });
            }
        }, 0);

        // ANCHOR - Category Button Event Binding
        // Fix: Always set currentCategory to 'all' as a string, not the value 'all' (not undefined/null)
        categoriesList.querySelectorAll('.category-name-btn').forEach(btn => {
            btn.onclick = (e) => {
                e.preventDefault();
                const category = btn.getAttribute('data-category');
                // Always use string comparison
                this.currentCategory = category || 'all';
                this.renderSidebar();
                this.renderFunctions();
            };
        });

        // ANCHOR - All Functions Button Event Binding
        // Fix: Ensure "All Functions" button event is properly bound
        const allFunctionsBtn = categoriesList.querySelector('[data-category="all"]');
        if (allFunctionsBtn) {
            allFunctionsBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.currentCategory = 'all';
                this.renderSidebar();
                this.renderFunctions();
            });
        }

        // ANCHOR - Additional Category Button Bindings
        // Bind events for all category buttons
        categoriesList.querySelectorAll('.category-name-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const category = btn.getAttribute('data-category');
                this.currentCategory = category || 'all';
                this.renderSidebar();
                this.renderFunctions();
            });
        });

        // ANCHOR - Expand/Collapse Button Event Binding
        // Expand/collapse logic for categories
        categoriesList.querySelectorAll('.category-expand-btn').forEach(btn => {
            btn.onclick = (e) => {
                e.preventDefault();
                e.stopPropagation();
                const category = btn.getAttribute('data-category');
                if (category) {
                    const categoryItem = btn.closest('.category-item');
                    const icon = btn.querySelector('svg');
                    const content = categoryItem.querySelector('.category-content');
                    const isCollapsed = categoryItem.classList.toggle('collapsed');
                    this.sidebarCollapseState[category] = isCollapsed;
                    if (icon) icon.classList.toggle('rotate-90', !isCollapsed);
                    if (content) content.style.display = isCollapsed ? 'none' : '';
                    btn.title = `${isCollapsed ? 'Expand' : 'Collapse'} ${category} category`;
                }
            };
        });

        // ANCHOR - Constants Click Handler
        // Add constants click handler
        if (this.currentTab === 'constants') {
            categoriesList.querySelectorAll('.constant-item').forEach(item => {
                item.addEventListener('click', (e) => {
                    e.preventDefault();
                    const constantName = item.getAttribute('data-constant-name');
                    if (constantName) {
                        this.centerConstantInNetwork(constantName);
                    }
                });
            });
        }
    }

    // SECTION - Constants Filtering
    // ANCHOR - Constants Filter Logic
    filterConstants() {
        // NOTE - filterConstants: Filters constants by search term.
        let filtered = this.constants;

        // ANCHOR - Search Term Filtering for Constants
        if (this.searchTerm) {
            filtered = filtered.filter(constant =>
                constant.name.toLowerCase().includes(this.searchTerm) ||
                constant.description.toLowerCase().includes(this.searchTerm) ||
                constant.preview.toLowerCase().includes(this.searchTerm)
            );
        }

        return filtered;
    }

    // ANCHOR - Center Constant in Network
    centerConstantInNetwork(constantName) {
        // NOTE - centerConstantInNetwork: Centers the specified constant node in the neuronal network.
        if (this.networkSvg && this.networkZoom) {
            // Find the node in the network
            const targetNode = this.networkSimulation?.nodes()?.find(node => node.name === constantName || node.id === constantName);

            if (targetNode) {
                // Center the node with smooth animation
                const scale = 2.0;
                const centerX = this.networkWidth / 2;
                const centerY = this.networkHeight / 2;

                const transform = d3.zoomIdentity
                    .translate(centerX, centerY)
                    .scale(scale)
                    .translate(-targetNode.x, -targetNode.y);

                this.networkSvg
                    .transition()
                    .duration(1000)
                    .ease(d3.easeCubicInOut)
                    .call(this.networkZoom.transform, transform);

                // Highlight the selected node
                d3.selectAll('.network-node circle').classed('selected', false);
                d3.selectAll('.network-node')
                    .filter(d => d.name === constantName || d.id === constantName)
                    .select('circle')
                    .classed('selected', true);

                // Show node details
                this.showNodeDetails(targetNode);

                // Show success toast
                this.showToast(`Centered on ${constantName}`);
            } else {
                this.showToast(`Constant ${constantName} not found in network`);
            }
        }
    }

    // SECTION - Tab Management
    // ANCHOR - Tab Switch Handler
    switchTab(tab) {
        // NOTE - switchTab: Switches between functions and constants tabs.
        if (this.currentTab !== tab) {
            this.currentTab = tab;
            this.currentCategory = 'all'; // Reset category when switching tabs
            this.searchTerm = ''; // Clear search when switching tabs

            // Update search placeholder
            const searchInput = document.getElementById('searchInput');
            if (searchInput) {
                searchInput.value = '';
                searchInput.placeholder = tab === 'functions' ? 'Search functions...' : 'Search constants...';
            }

            this.renderSidebar();
            this.renderContent();
        }
    }

    // SECTION - Event Management
    // ANCHOR - Main Event Binding
    bindEvents() {
        // NOTE - bindEvents: Binds all UI events (theme, sidebar, search, etc).

        // ANCHOR - Theme Toggle Events
        // Theme toggle - optimized for instant response
        const themeToggle = document.getElementById('themeToggle');
        if (themeToggle) {
            // Use both click and touchstart for immediate response on mobile
            themeToggle.addEventListener('click', (e) => {
                e.preventDefault();
                this.toggleTheme();
            });

            // NOTE - Touch events for mobile responsiveness
            themeToggle.addEventListener('touchstart', (e) => {
                if (e.touches.length === 1) {
                    e.preventDefault();
                    this.toggleTheme();
                }
            }, { passive: false });
        }

        // ANCHOR - System Theme Detection
        // System theme change listener - optimized
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        // NOTE - handleSystemThemeChange: Handles automatic theme switching when system preference changes.
        const handleSystemThemeChange = (e) => {
            if (!localStorage.getItem('theme')) {
                this.setTheme(e.matches ? 'dark' : 'light', true);
            }
        };

        // ANCHOR - Media Query Listener Setup
        // Use the newer API if available
        if (mediaQuery.addEventListener) {
            mediaQuery.addEventListener('change', handleSystemThemeChange);
        } else {
            // NOTE - Fallback for older browsers
            mediaQuery.addListener(handleSystemThemeChange);
        }

        // ANCHOR - Mobile Menu Events
        // Mobile menu toggle
        const mobileMenuBtn = document.getElementById('mobileMenuBtn');
        const sidebar = document.getElementById('sidebar');
        const sidebarOverlay = document.getElementById('sidebarOverlay');

        if (mobileMenuBtn && sidebar && sidebarOverlay) {
            mobileMenuBtn.addEventListener('click', () => {
                sidebar.classList.toggle('-translate-x-full');
                if (sidebar.classList.contains('-translate-x-full')) {
                    sidebarOverlay.classList.add('opacity-0', 'pointer-events-none');
                } else {
                    sidebarOverlay.classList.remove('opacity-0', 'pointer-events-none');
                }
            });

            sidebarOverlay.addEventListener('click', () => {
                sidebar.classList.add('-translate-x-full');
                sidebarOverlay.classList.add('opacity-0', 'pointer-events-none');
            });
        }

        // ANCHOR - Search Functionality
        // Search functionality
        const searchInput = document.getElementById('searchInput');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                this.searchTerm = e.target.value.toLowerCase();

                // Update content based on current tab
                if (this.currentTab === 'functions') {
                    this.renderFunctions();
                } else if (this.currentTab === 'constants') {
                    this.renderSidebar(); // Re-render sidebar to show filtered constants
                }
            });
        }

        // ANCHOR - Global Click Handlers
        // Category sidebar events
        document.addEventListener('click', (e) => {
            // ANCHOR - Category Button Handling
            // Handle category buttons
            if (e.target.matches('.category-name-btn') || e.target.closest('.category-name-btn')) {
                const button = e.target.matches('.category-name-btn') ? e.target : e.target.closest('.category-name-btn');
                const category = button.dataset.category;

                if (category) {
                    this.currentCategory = category;
                    this.renderSidebar();
                    this.renderFunctions();
                }
            }

            // ANCHOR - Expand/Collapse Button Handling
            // Handle expand/collapse buttons
            if (e.target.matches('.category-expand-btn') || e.target.closest('.category-expand-btn')) {
                e.preventDefault();
                e.stopPropagation();

                const button = e.target.matches('.category-expand-btn') ? e.target : e.target.closest('.category-expand-btn');
                const category = button.dataset.category;
                if (category) {
                    const categoryItem = button.closest('.category-item');
                    const icon = button.querySelector('svg');
                    const content = categoryItem.querySelector('.category-content');
                    // Toggle collapsed state in memory
                    const isCollapsed = categoryItem.classList.toggle('collapsed');
                    this.sidebarCollapseState[category] = isCollapsed;
                    // Rotate arrow
                    if (icon) icon.classList.toggle('rotate-90', !isCollapsed);
                    // Show/hide content
                    if (content) content.style.display = isCollapsed ? 'none' : '';
                    // Update button title
                    button.title = `${isCollapsed ? 'Expand' : 'Collapse'} ${category} category`;
                }
            }

            // ANCHOR - Function Link Handling
            // Function link clicks
            else if (e.target.matches('.function-link')) {
                e.preventDefault();
                const functionName = e.target.dataset.function;
                this.scrollToFunction(functionName);
            }
        });

        // SECTION - UI Enhancement Features
        // ANCHOR - Scroll to Top Button
        function createScrollToTopButton() {
            // Avoid creating the button multiple times
            if (document.getElementById('scrollToTop')) return;

            // Create the scroll-to-top button
            const scrollBtn = document.createElement('button');
            scrollBtn.id = 'scrollToTop';
            scrollBtn.className =
                'fixed bottom-6 right-6 z-30 bg-yellow-400 hover:bg-yellow-500 text-gray-900 p-3 rounded-full shadow-lg opacity-0 pointer-events-none transition-all duration-300';
            scrollBtn.innerHTML = `
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18"></path>
        </svg>
    `;
            scrollBtn.title = 'Scroll to top';

            document.body.appendChild(scrollBtn);

            // Show/hide button based on scroll position
            const toggleScrollButton = () => {
                const isVisible = window.scrollY > 300;
                scrollBtn.classList.toggle('opacity-0', !isVisible);
                scrollBtn.classList.toggle('pointer-events-none', !isVisible);
            };

            // Smooth scroll to top on click
            scrollBtn.addEventListener('click', () => {
                window.scrollTo({ top: 0, behavior: 'smooth' });

                // Add a quick scale animation for feedback
                scrollBtn.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    scrollBtn.style.transform = 'scale(1)';
                }, 100);
            });

            // Attach scroll listener and run initial visibility check
            window.addEventListener('scroll', toggleScrollButton);
            toggleScrollButton();
        }

    }

    // SECTION - Navigation Utilities
    // ANCHOR - Function Scroll Navigation
    scrollToFunction(functionName) {
        // NOTE - scrollToFunction: Scrolls smoothly to a function card and highlights it.
        const element = document.querySelector(`[data-function-name="${functionName}"]`);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });

            // ANCHOR - Function Highlight Effect
            // Highlight the function card briefly
            element.classList.add('ring-2', 'ring-primary-500', 'ring-opacity-50');
            setTimeout(() => {
                element.classList.remove('ring-2', 'ring-primary-500', 'ring-opacity-50');
            }, 2000);
        }
    }

    // SECTION - Function Filtering
    // ANCHOR - Main Filter Logic
    filterFunctions() {
        // NOTE - filterFunctions: Filters functions by category and search term.
        let filtered = this.functions;

        // ANCHOR - Category Filtering
        // Filter by category - explicitly check for 'all' string
        if (this.currentCategory && this.currentCategory !== 'all') {
            filtered = filtered.filter(func => func.category === this.currentCategory);
        }

        // ANCHOR - Search Term Filtering
        // Filter by search term
        if (this.searchTerm) {
            filtered = filtered.filter(func =>
                func.name.toLowerCase().includes(this.searchTerm) ||
                func.description.toLowerCase().includes(this.searchTerm) ||
                func.category.toLowerCase().includes(this.searchTerm) ||
                (func.params && func.params.some(param =>
                    param.name.toLowerCase().includes(this.searchTerm) ||
                    param.description.toLowerCase().includes(this.searchTerm)
                ))
            );
        }

        return filtered;
    }

    // ANCHOR - Search Highlighting
    highlightSearchTerm(text) {
        // NOTE - highlightSearchTerm: Highlights the search term in displayed text.
        if (!this.searchTerm || !text) return text;

        const regex = new RegExp(`(${this.searchTerm.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
        return text.replace(regex, '<span class="search-highlight">$1</span>');
    }

    // SECTION - User Feedback
    // ANCHOR - Toast Notification System
    showToast(message) {
        // NOTE - showToast: Shows a toast notification with a message.
        const toast = document.getElementById('toast');
        if (toast) {
            toast.querySelector('span').textContent = message;
            toast.classList.remove('translate-y-full', 'opacity-0');

            setTimeout(() => {
                toast.classList.add('translate-y-full', 'opacity-0');
            }, 2000);
        }
    }

    // ANCHOR - Clipboard Functionality
    copyToClipboard(text, button) {
        // NOTE - copyToClipboard: Copies text to clipboard and shows feedback.
        navigator.clipboard.writeText(text).then(() => {
            this.showToast('Copied to clipboard!');

            // ANCHOR - Visual Copy Feedback
            // Visual feedback on button
            const originalContent = button.innerHTML;
            button.innerHTML = `
                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                </svg>
            `;
            button.classList.add('text-green-600', 'dark:text-green-400');

            setTimeout(() => {
                button.innerHTML = originalContent;
                button.classList.remove('text-green-600', 'dark:text-green-400');
            }, 1500);
        }).catch(() => {
            // REVIEW - Consider adding more specific error handling
            this.showToast('Failed to copy to clipboard');
        });
    }

    // SECTION - Function Card Creation
    // ANCHOR - Function Card Generator
    createFunctionCard(func) {
        // NOTE - createFunctionCard: Creates a DOM card for a function's documentation.
        const card = document.createElement('div');
        card.className = 'method-card bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm hover:shadow-md dark:shadow-gray-900/20 border border-gray-200 dark:border-gray-700 animate-fade-in';
        card.setAttribute('data-function-name', func.name);

        // ANCHOR - Example Code Cleaning
        // Clean up the example code
        const cleanExample = func.example ? func.example
            .replace(/^\s*```typescript\s*\n?/gm, '')
            .replace(/\n?\s*```\s*$/gm, '')
            .replace(/\\n/g, '\n')
            .replace(/\\r/g, '')
            .trim() : `${func.name}()`;

        // ANCHOR - Card HTML Template
        card.innerHTML = `
            <div class="flex items-start justify-between mb-4">
                <div>
                    <h3 class="text-xl font-semibold text-gray-900 dark:text-white font-mono mb-2">${this.highlightSearchTerm(func.name)}</h3>
                    <span class="text-xs bg-primary-100 dark:bg-primary-900/50 text-primary-700 dark:text-primary-300 px-2 py-1 rounded-full capitalize">
                        ${func.category}
                    </span>
                </div>
                <span class="text-xs text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
                    v${func.since}
                </span>
            </div>
            
            <p class="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">${this.highlightSearchTerm(func.description)}</p>
            
            <div class="space-y-4">
                <div>
                    <h4 class="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 flex items-center">
                        <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"></path>
                        </svg>
                        Syntax
                    </h4>
                    <code class="text-xs bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200 px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 block font-mono">
                        ${func.syntax}
                    </code>
                </div>
                
                <div>
                    <h4 class="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 flex items-center">
                        <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                        </svg>
                        Example
                    </h4>
                    <div class="code-block relative group">
                        <pre class="bg-gray-900 dark:bg-gray-950 text-gray-100 p-4 rounded-lg text-sm overflow-x-auto border border-gray-700"><code class="language-typescript">${cleanExample}</code></pre>
                        <button class="copy-btn absolute top-1 right-1 bg-gray-800/60 hover:bg-gray-700/80 text-gray-300 hover:text-white p-1.5 rounded text-xs transition-all opacity-40 group-hover:opacity-80 hover:opacity-100 backdrop-blur-sm border border-gray-600/30" 
                                title="Copy example">
                            <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <rect x="9" y="9" width="13" height="13" rx="2" ry="2" stroke="currentColor" stroke-width="2" fill="none"/>
                                <rect x="3" y="3" width="13" height="13" rx="2" ry="2" stroke="currentColor" stroke-width="2" fill="none"/>
                            </svg>
                        </button>
                    </div>
                </div>
                
                <div class="pt-2">
                    <button class="copy-import-btn text-xs bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 px-3 py-2 rounded-lg flex items-center space-x-1">
                        <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
                        </svg>
                        <span>Copy Import</span>
                    </button>
                </div>
            </div>
        `;

        // ANCHOR - Copy Button Event Binding
        // Add event listeners for copy buttons
        const copyBtn = card.querySelector('.copy-btn');
        const copyImportBtn = card.querySelector('.copy-import-btn');

        if (copyBtn) {
            copyBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.copyToClipboard(cleanExample, copyBtn);
            });
        }

        // ANCHOR - Import Statement Generation
        if (copyImportBtn) {
            copyImportBtn.addEventListener('click', (e) => {
                e.preventDefault();
                // Use package name from package info
                const packageName = this.packageInfo.name || 'generic-functions.mlai';
                const importStatement = `import { ${func.name} } from '${packageName}/core/${func.category}';`;
                this.copyToClipboard(importStatement, copyImportBtn);
            });
        }

        return card;
    }

    // SECTION - Constant Card Creation
    // ANCHOR - Constant Card Generator
    createConstantCard(constant) {
        const card = document.createElement('div');
        card.className = 'method-card bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm hover:shadow-md dark:shadow-gray-900/20 border border-gray-200 dark:border-gray-700 animate-fade-in';
        card.setAttribute('data-constant-name', constant.name);

        card.innerHTML = `
            <div class="flex items-start justify-between mb-4">
                <div>
                    <h3 class="text-xl font-semibold text-gray-900 dark:text-white font-mono mb-2">${this.highlightSearchTerm(constant.name)}</h3>
                    <span class="text-xs bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 px-2 py-1 rounded-full">
                        ${constant.type}
                    </span>
                </div>
                <span class="text-xs text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
                    v${constant.since}
                </span>
            </div>
            
            <p class="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">${this.highlightSearchTerm(constant.description)}</p>
            
            <div class="space-y-4">
                <div>
                    <h4 class="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 flex items-center">
                        <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h2v2H9v-2zm0-8h2v6H9V4zm1-4C4.477 0 0 4.477 0 10s4.477 10 10 10 10-4.477 10-10S15.523 0 10 0z"/>
                        </svg>
                        Structure
                    </h4>
                    <code class="text-xs bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200 px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 block font-mono">
                        ${constant.preview}
                    </code>
                </div>
                
                <div>
                    <h4 class="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 flex items-center">
                        <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                        </svg>
                        Usage Example
                    </h4>
                    <div class="code-block relative group">
                        <pre class="bg-gray-900 dark:bg-gray-950 text-gray-100 p-4 rounded-lg text-sm overflow-x-auto border border-gray-700"><code class="language-typescript">import { ${constant.name} } from '${this.packageInfo.name || 'generic-functions.mlai'}/constants';

console.log(${constant.name});</code></pre>
                        <button class="copy-btn absolute top-1 right-1 bg-gray-800/60 hover:bg-gray-700/80 text-gray-300 hover:text-white p-1.5 rounded text-xs transition-all opacity-40 group-hover:opacity-80 hover:opacity-100 backdrop-blur-sm border border-gray-600/30" 
                                title="Copy example">
                            <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <rect x="9" y="9" width="13" height="13" rx="2" ry="2" stroke="currentColor" stroke-width="2" fill="none"/>
                                <rect x="3" y="3" width="13" height="13" rx="2" ry="2" stroke="currentColor" stroke-width="2" fill="none"/>
                            </svg>
                        </button>
                    </div>
                </div>
                
                <div class="pt-2">
                    <button class="copy-import-btn text-xs bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 px-3 py-2 rounded-lg flex items-center space-x-1">
                        <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
                        </svg>
                        <span>Copy Import</span>
                    </button>
                </div>
            </div>
        `;

        // Add event listeners for copy buttons
        const copyBtn = card.querySelector('.copy-btn');
        const copyImportBtn = card.querySelector('.copy-import-btn');

        if (copyBtn) {
            copyBtn.addEventListener('click', (e) => {
                e.preventDefault();
                const example = `import { ${constant.name} } from '${this.packageInfo.name || 'generic-functions.mlai'}/constants';\n\nconsole.log(${constant.name});`;
                this.copyToClipboard(example, copyBtn);
            });
        }

        if (copyImportBtn) {
            copyImportBtn.addEventListener('click', (e) => {
                e.preventDefault();
                const importStatement = `import { ${constant.name} } from '${this.packageInfo.name || 'generic-functions.mlai'}/constants';`;
                this.copyToClipboard(importStatement, copyImportBtn);
            });
        }

        return card;
    }

    // SECTION - Function Grid Rendering
    // ANCHOR - Main Function Render
    renderFunctions() {
        // NOTE - renderFunctions: Renders all filtered function cards in the grid.
        const functionsGrid = document.getElementById('functionsGrid');
        const noResults = document.getElementById('noResults');

        if (!functionsGrid || !noResults) return;

        const filteredFunctions = this.filterFunctions();

        // ANCHOR - Grid Content Management
        // Clear existing content
        functionsGrid.innerHTML = '';

        // ANCHOR - No Results Handling
        if (filteredFunctions.length === 0) {
            functionsGrid.classList.add('hidden');
            noResults.classList.remove('hidden');
            noResults.innerHTML = `
                <div class="text-center py-16">
                    <div class="text-gray-400 dark:text-gray-500 mb-4">
                        <svg class="mx-auto h-12 w-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                        </svg>
                    </div>
                    <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-1">No functions found</h3>
                    <p class="text-gray-500 dark:text-gray-400">Try adjusting your search or category filter</p>
                </div>
            `;
        } else {
            // ANCHOR - Function Cards Rendering
            functionsGrid.classList.remove('hidden');
            noResults.classList.add('hidden');

            // Sort functions alphabetically
            filteredFunctions.sort((a, b) => a.name.localeCompare(b.name));

            // ANCHOR - Card Creation with Animation
            // Create and append function cards with staggered animation
            filteredFunctions.forEach((func, index) => {
                const card = this.createFunctionCard(func);
                card.style.animationDelay = `${index * 50}ms`;
                functionsGrid.appendChild(card);
            });
        }

        // ANCHOR - Syntax Highlighting
        // Re-run Prism syntax highlighting
        if (typeof Prism !== 'undefined') {
            Prism.highlightAll();
        }
    }

    // SECTION - Content Rendering
    // ANCHOR - Main Content Render
    renderContent() {
        if (this.currentTab === 'functions') {
            this.hideNeuronalNetwork();
            this.renderFunctions();
        } else if (this.currentTab === 'constants') {
            this.showNeuronalNetwork();
            this.renderNeuronalNetwork();
        }
    }

    // ANCHOR - Constants Rendering
    renderConstants() {
        // This method is now replaced by neuronal network for constants
        this.renderNeuronalNetwork();
    }

    // SECTION - Neuronal Network Visualization
    // ANCHOR - Show/Hide Network
    showNeuronalNetwork() {
        const functionsGrid = document.getElementById('functionsGrid');
        const neuronalNetwork = document.getElementById('neuronalNetwork');
        const noResults = document.getElementById('noResults');

        if (functionsGrid) functionsGrid.classList.add('hidden');
        if (noResults) noResults.classList.add('hidden');
        if (neuronalNetwork) neuronalNetwork.classList.remove('hidden');
    }

    hideNeuronalNetwork() {
        const functionsGrid = document.getElementById('functionsGrid');
        const neuronalNetwork = document.getElementById('neuronalNetwork');

        if (functionsGrid) functionsGrid.classList.remove('hidden');
        if (neuronalNetwork) neuronalNetwork.classList.add('hidden');
    }

    // ANCHOR - Network Data Processing
    processConstantsForNetwork() {
        const nodes = [];
        const links = [];
        const nodeMap = new Map();

        // Process each constant
        this.constants.forEach((constant, index) => {
            // Create main constant node
            const mainNode = {
                id: constant.name,
                name: constant.name,
                type: 'constant',
                description: constant.description,
                value: constant.value,
                preview: constant.preview,
                level: 0,
                color: '#3b82f6' // blue
            };

            nodes.push(mainNode);
            nodeMap.set(constant.name, mainNode);

            // Try to parse the constant structure to create nested nodes
            try {
                if (constant.name === 'REGEX') {
                    this.parseRegexConstant(constant, nodes, links, nodeMap);
                } else if (constant.name === 'DATE_FORMATS' || constant.name === 'COUNTRY_DATE_FORMATS') {
                    this.parseDateFormatsConstant(constant, nodes, links, nodeMap);
                } else if (constant.name === 'RESPONSE_CODES' || constant.name === 'STATUS_COLORS') {
                    this.parseObjectConstant(constant, nodes, links, nodeMap);
                }
            } catch (error) {
                console.warn(`Failed to parse constant ${constant.name}:`, error);
            }
        });

        return { nodes, links };
    }

    // ANCHOR - Parse Different Constant Types
    parseRegexConstant(constant, nodes, links, nodeMap) {
        // REGEX constant has multiple regex patterns
        const regexPatterns = [
            'htmlTag', 'inBrackets', 'inStrings', 'tagRegex', 'openParentheses',
            'allSpaces', 'datetime', 'email', 'url', 'number'
        ];

        regexPatterns.forEach((pattern, index) => {
            const nodeId = `${constant.name}.${pattern}`;
            const node = {
                id: nodeId,
                name: pattern,
                type: 'property',
                description: `Regular expression for ${pattern}`,
                value: 'RegExp',
                level: 1,
                parent: constant.name,
                color: '#f59e0b' // orange
            };

            nodes.push(node);
            nodeMap.set(nodeId, node);

            links.push({
                source: constant.name,
                target: nodeId,
                type: 'contains'
            });
        });
    }

    parseDateFormatsConstant(constant, nodes, links, nodeMap) {
        const formats = constant.name === 'DATE_FORMATS'
            ? ['DATE', 'TIME', 'DATE_TIME']
            : ['AD', 'AT', 'BE', 'BG', 'CH', 'CY', 'CZ', 'DE', 'DK', 'EE', 'ES', 'FI', 'FR', 'GB', 'GR', 'HR', 'HU', 'IE', 'IS', 'IT', 'LI', 'LT', 'LU', 'LV', 'MC', 'MT', 'NL', 'NO', 'PL', 'PT', 'RO', 'SE', 'SI', 'SK', 'SM', 'TR', 'US', 'CA', 'JP', 'CN', 'KR'];

        formats.forEach((format, index) => {
            const nodeId = `${constant.name}.${format}`;
            const node = {
                id: nodeId,
                name: format,
                type: 'property',
                description: constant.name === 'DATE_FORMATS' ? `Date format: ${format}` : `Country ${format} date format`,
                value: 'string',
                level: 1,
                parent: constant.name,
                color: '#10b981' // green
            };

            nodes.push(node);
            nodeMap.set(nodeId, node);

            links.push({
                source: constant.name,
                target: nodeId,
                type: 'contains'
            });
        });
    }

    parseObjectConstant(constant, nodes, links, nodeMap) {
        let properties = [];

        if (constant.name === 'RESPONSE_CODES') {
            properties = ['NOT_INIT', 'IS_INIT', 'NOT_FOUND_INIT', 'NOT_FOUND'];
        } else if (constant.name === 'STATUS_COLORS') {
            properties = ['ACTIVE', 'INACTIVE', 'PENDING', 'ERROR', 'WARNING', 'INFO'];
        }

        properties.forEach((prop, index) => {
            const nodeId = `${constant.name}.${prop}`;
            const node = {
                id: nodeId,
                name: prop,
                type: 'property',
                description: `${constant.name} property: ${prop}`,
                value: constant.name === 'RESPONSE_CODES' ? 'number' : 'string',
                level: 1,
                parent: constant.name,
                color: '#8b5cf6' // purple
            };

            nodes.push(node);
            nodeMap.set(nodeId, node);

            links.push({
                source: constant.name,
                target: nodeId,
                type: 'contains'
            });
        });
    }

    // ANCHOR - Network Rendering
    renderNeuronalNetwork() {
        const container = document.getElementById('neuronalNetwork');
        const svg = document.getElementById('networkSvg');

        if (!container || !svg || typeof d3 === 'undefined') {
            console.warn('D3.js not loaded or container not found');
            return;
        }

        // Clear existing content
        d3.select(svg).selectAll("*").remove();

        const { nodes, links } = this.processConstantsForNetwork();

        if (nodes.length === 0) {
            this.showEmptyNetworkMessage();
            return;
        }

        // Set up dimensions
        const containerRect = container.getBoundingClientRect();
        const width = containerRect.width;
        const height = containerRect.height;

        // Create SVG with better performance settings
        const svgElement = d3.select(svg)
            .attr('width', width)
            .attr('height', height)
            .style('cursor', 'grab');

        // Create zoom behavior with better performance
        const zoom = d3.zoom()
            .scaleExtent([0.1, 4])
            .on('zoom', (event) => {
                g.attr('transform', event.transform);
            });

        svgElement.call(zoom);

        // Create main group
        const g = svgElement.append('g');

        // Create force simulation with optimized settings
        const simulation = d3.forceSimulation(nodes)
            .force('link', d3.forceLink(links).id(d => d.id).distance(80).strength(0.8))
            .force('charge', d3.forceManyBody().strength(-400).distanceMax(300))
            .force('center', d3.forceCenter(width / 2, height / 2))
            .force('collision', d3.forceCollide().radius(35).strength(0.9))
            .alpha(1)
            .alphaDecay(0.02);

        // Create links with better styling
        const link = g.append('g')
            .attr('class', 'links')
            .selectAll('line')
            .data(links)
            .enter().append('line')
            .attr('class', 'network-link')
            .attr('stroke', '#94a3b8')
            .attr('stroke-opacity', 0.4)
            .attr('stroke-width', d => d.type === 'contains' ? 2 : 1)
            .style('transition', 'all 0.3s ease');

        // Create nodes with optimized performance
        const node = g.append('g')
            .attr('class', 'nodes')
            .selectAll('.network-node')
            .data(nodes)
            .enter().append('g')
            .attr('class', 'network-node')
            .style('cursor', 'pointer')
            .call(d3.drag()
                .on('start', (event, d) => this.dragStarted(simulation, event, d))
                .on('drag', (event, d) => this.dragged(event, d))
                .on('end', (event, d) => this.dragEnded(simulation, event, d))
            );

        // Add circles to nodes with better styling
        node.append('circle')
            .attr('r', d => d.level === 0 ? 25 : 18)
            .attr('fill', d => d.color)
            .attr('stroke', '#ffffff')
            .attr('stroke-width', 3)
            .style('filter', 'drop-shadow(0 3px 6px rgba(0,0,0,0.3))')
            .style('transition', 'all 0.2s ease');

        // Add labels to nodes with better readability
        node.append('text')
            .attr('dy', '.35em')
            .attr('text-anchor', 'middle')
            .style('fill', '#ffffff')
            .style('font-size', d => d.level === 0 ? '11px' : '9px')
            .style('font-weight', 'bold')
            .style('pointer-events', 'none')
            .style('text-shadow', '0 1px 3px rgba(0,0,0,0.5)')
            .text(d => {
                if (d.name.length > 10) {
                    return d.name.substring(0, 8) + '..';
                }
                return d.name;
            });

        // Add hover effects and click handlers with better performance
        node
            .on('mouseover', (event, d) => this.handleNodeHover(event, d))
            .on('mouseout', (event, d) => this.handleNodeOut(event, d))
            .on('click', (event, d) => this.handleNodeClick(event, d, svgElement, zoom, width, height));

        // Update positions on simulation tick with throttling
        let tickCount = 0;
        simulation.on('tick', () => {
            tickCount++;
            // Only update every 2 ticks for better performance
            if (tickCount % 2 === 0) {
                link
                    .attr('x1', d => d.source.x)
                    .attr('y1', d => d.source.y)
                    .attr('x2', d => d.target.x)
                    .attr('y2', d => d.target.y);

                node.attr('transform', d => `translate(${d.x},${d.y})`);
            }
        });

        // Store references for controls
        this.networkSimulation = simulation;
        this.networkZoom = zoom;
        this.networkSvg = svgElement;
        this.networkWidth = width;
        this.networkHeight = height;

        // Bind control events
        this.bindNetworkControls();

        // Auto-stabilize after initial render
        setTimeout(() => {
            simulation.alpha(0.3).restart();
        }, 1000);
    }

    // ANCHOR - Network Event Handlers
    dragStarted(simulation, event, d) {
        if (!event.active) simulation.alphaTarget(0.3).restart();
        d.fx = d.x;
        d.fy = d.y;

        // Change cursor
        d3.select('body').style('cursor', 'grabbing');
    }

    dragged(event, d) {
        d.fx = event.x;
        d.fy = event.y;
    }

    dragEnded(simulation, event, d) {
        if (!event.active) simulation.alphaTarget(0);
        d.fx = null;
        d.fy = null;

        // Reset cursor
        d3.select('body').style('cursor', 'default');
    }

    handleNodeHover(event, d) {
        // Highlight node and connections with better performance
        const node = d3.select(event.currentTarget);
        const circle = node.select('circle');

        // Smooth hover effect
        circle
            .transition()
            .duration(150)
            .attr('r', d => (d.level === 0 ? 30 : 22))
            .style('filter', 'drop-shadow(0 6px 12px rgba(0,0,0,0.4))')
            .attr('stroke-width', 4);

        // Highlight connected links
        d3.selectAll('.network-link')
            .filter(link => link.source.id === d.id || link.target.id === d.id)
            .transition()
            .duration(150)
            .attr('stroke-opacity', 0.8)
            .attr('stroke-width', 3);
    }

    handleNodeOut(event, d) {
        // Reset node appearance with smooth transition
        const node = d3.select(event.currentTarget);
        const circle = node.select('circle');

        circle
            .transition()
            .duration(150)
            .attr('r', d => d.level === 0 ? 25 : 18)
            .style('filter', 'drop-shadow(0 3px 6px rgba(0,0,0,0.3))')
            .attr('stroke-width', 3);

        // Reset all links
        d3.selectAll('.network-link')
            .transition()
            .duration(150)
            .attr('stroke-opacity', 0.4)
            .attr('stroke-width', d => d.type === 'contains' ? 2 : 1);
    }

    handleNodeClick(event, d, svgElement, zoom, width, height) {
        event.stopPropagation();

        // Show node details with complete information
        this.showNodeDetails(d);

        // Smooth center animation with proper coordinates
        const scale = 1.8;
        const centerX = width / 2;
        const centerY = height / 2;

        // Calculate transform to center the node
        const transform = d3.zoomIdentity
            .translate(centerX, centerY)
            .scale(scale)
            .translate(-d.x, -d.y);

        svgElement
            .transition()
            .duration(750)
            .ease(d3.easeCubicInOut)
            .call(zoom.transform, transform);

        // Add selection highlight
        d3.selectAll('.network-node circle').classed('selected', false);
        d3.select(event.currentTarget).select('circle').classed('selected', true);
    }

    // ANCHOR - Node Details Panel
    showNodeDetails(nodeData) {
        const detailsPanel = document.getElementById('nodeDetails');
        const detailsContent = document.getElementById('nodeDetailsContent');

        if (!detailsPanel || !detailsContent) return;

        // Build comprehensive content with all available data
        let content = `
            <div class="flex items-center gap-3 mb-3">
                <div class="w-5 h-5 rounded-full flex-shrink-0" style="background-color: ${nodeData.color}"></div>
                <h3 class="text-lg font-semibold text-gray-900 dark:text-white font-mono">${nodeData.name}</h3>
                <span class="text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 px-2 py-1 rounded-full">${nodeData.type}</span>
            </div>
            <p class="text-sm text-gray-600 dark:text-gray-400 mb-3">${nodeData.description}</p>
        `;

        // Add value information if available
        if (nodeData.value && nodeData.value !== 'Object') {
            content += `
                <div class="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg mb-3">
                    <h4 class="text-sm font-semibold text-blue-700 dark:text-blue-300 mb-2">Value Type</h4>
                    <code class="text-xs font-mono text-blue-800 dark:text-blue-200">${nodeData.value}</code>
                </div>
            `;
        }

        // Add preview/structure information
        if (nodeData.preview) {
            content += `
                <div class="bg-gray-50 dark:bg-gray-900/50 p-3 rounded-lg mb-3">
                    <h4 class="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">${nodeData.type === 'constant' ? 'Structure Preview' : 'Value'}</h4>
                    <pre class="text-xs font-mono text-gray-800 dark:text-gray-200 whitespace-pre-wrap overflow-x-auto">${nodeData.preview}</pre>
                </div>
            `;
        }

        // Add parent relationship
        if (nodeData.parent) {
            content += `
                <div class="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
                    <div class="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
                        </svg>
                        Part of: <strong class="text-gray-700 dark:text-gray-300">${nodeData.parent}</strong>
                    </div>
                </div>
            `;
        }

        // Add level information
        content += `
            <div class="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
                <div class="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                    <span>Level: ${nodeData.level}</span>
                    <span>ID: ${nodeData.id}</span>
                </div>
            </div>
        `;

        detailsContent.innerHTML = content;
        detailsPanel.classList.remove('hidden');

        // Auto-hide after 15 seconds with fade effect
        clearTimeout(this.detailsPanelTimeout);
        this.detailsPanelTimeout = setTimeout(() => {
            detailsPanel.style.opacity = '0.5';
            setTimeout(() => {
                if (detailsPanel.style.opacity === '0.5') {
                    detailsPanel.classList.add('hidden');
                    detailsPanel.style.opacity = '1';
                }
            }, 2000);
        }, 15000);

        // Click to keep panel open
        detailsPanel.onclick = () => {
            clearTimeout(this.detailsPanelTimeout);
            detailsPanel.style.opacity = '1';
        };
    }

    // ANCHOR - Network Controls
    bindNetworkControls() {
        const resetZoomBtn = document.getElementById('resetZoom');
        const centerViewBtn = document.getElementById('centerView');

        if (resetZoomBtn) {
            resetZoomBtn.addEventListener('click', () => {
                if (this.networkSvg && this.networkZoom) {
                    // Smooth reset with easing
                    this.networkSvg.transition()
                        .duration(750)
                        .ease(d3.easeCubicInOut)
                        .call(this.networkZoom.transform, d3.zoomIdentity);

                    // Remove selection highlights
                    d3.selectAll('.network-node circle').classed('selected', false);
                }
            });
        }

        if (centerViewBtn) {
            centerViewBtn.addEventListener('click', () => {
                if (this.networkSimulation) {
                    // Restart simulation with higher alpha for better re-centering
                    this.networkSimulation.alpha(0.5).restart();

                    // Also reset zoom
                    if (this.networkSvg && this.networkZoom) {
                        this.networkSvg.transition()
                            .duration(750)
                            .ease(d3.easeCubicInOut)
                            .call(this.networkZoom.transform, d3.zoomIdentity);
                    }
                }
            });
        }
    }

    showEmptyNetworkMessage() {
        const container = document.getElementById('neuronalNetwork');
        if (container) {
            container.innerHTML = `
                <div class="flex items-center justify-center h-full">
                    <div class="text-center">
                        <div class="text-gray-400 dark:text-gray-500 mb-4">
                            <svg class="mx-auto h-16 w-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                            </svg>
                        </div>
                        <h3 class="text-xl font-medium text-gray-900 dark:text-white mb-2">No Constants Found</h3>
                        <p class="text-gray-500 dark:text-gray-400">No constants available to visualize in the neuronal network.</p>
                    </div>
                </div>
            `;
        }
    }
}

// SECTION - Application Initialization
// ANCHOR - DOM Ready Handler
document.addEventListener('DOMContentLoaded', () => {
    // NOTE - DOMContentLoaded: Optimize initial load and initialize FunctionsDocs app.

    // ANCHOR - Theme Preload
    // Preload theme before initializing app
    const savedTheme = localStorage.getItem('theme');
    const systemPreference = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    const initialTheme = savedTheme || systemPreference;

    // Apply theme class immediately to prevent flash
    if (initialTheme === 'dark') {
        document.documentElement.classList.add('dark');
    }

    // ANCHOR - App Initialization
    // Initialize app
    if (typeof functionsData !== 'undefined' || typeof constantsData !== 'undefined') {
        new FunctionsDocs();
    } else {
        // ANCHOR - Fallback Data Handling
        // Fallback: create empty data and initialize
        window.functionsData = [];
        window.constantsData = [];
        window.packageInfo = {};
        new FunctionsDocs();

        // ANCHOR - Documentation Generation Message
        // Show message that docs need to be generated
        const functionsGrid = document.getElementById('functionsGrid');
        const noResults = document.getElementById('noResults');

        if (functionsGrid && noResults) {
            functionsGrid.classList.add('hidden');
            noResults.classList.remove('hidden');
            noResults.innerHTML = `
                    <div class="text-center py-16">
                        <div class="text-gray-400 dark:text-gray-500 mb-4">
                            <svg class="mx-auto h-12 w-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                            </svg>
                        </div>
                        <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-1">Documentation not generated</h3>
                        <p class="text-gray-500 dark:text-gray-400 mb-4">Run <code class="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">npm run docs:extract</code> to generate function documentation</p>
                    </div>
                `;
        }
    }

}, 0);

// SECTION - Early Theme Prevention
// ANCHOR - Flash Prevention
(function () {
    // NOTE - Prevent flash of unstyled content: Applies theme as early as possible.
    // Apply theme as early as possible
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initialTheme = savedTheme ? savedTheme : (prefersDark ? 'dark' : 'light');
    // ANCHOR - Remove Transition for Initial Load
    // Remove transition for initial load to prevent flash
    document.documentElement.classList.remove('transition-colors', 'duration-500');
    setTimeout(() => {
        document.documentElement.classList.add(initialTheme);
        if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
            document.documentElement.classList.add('dark');
        }
    });
})();
