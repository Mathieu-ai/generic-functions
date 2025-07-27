// Simple toast notification utility
// In production, you would use react-hot-toast or another toast library

import { DEFAULT_VALUES } from './constants';

interface ToastOptions {
  readonly duration?: number;
  readonly style?: React.CSSProperties;
}

class SimpleToast {
  private container: HTMLElement | null = null;

  private createContainer() {
    if (!this.container) {
      this.container = document.createElement('div');
      this.container.style.position = 'fixed';
      this.container.style.bottom = '20px';
      this.container.style.right = '20px';
      this.container.style.zIndex = '9999';
      this.container.style.display = 'flex';
      this.container.style.flexDirection = 'column';
      this.container.style.gap = '8px';
      document.body.appendChild(this.container);
    }
    return this.container;
  }

  private showToast(message: string, type: 'success' | 'error' = 'success', options: ToastOptions = {}) {
    const container = this.createContainer();
    
    const toast = document.createElement('div');
    toast.textContent = message;
    
    // Base styles
    Object.assign(toast.style, {
      padding: '12px 16px',
      borderRadius: '8px',
      color: 'white',
      fontSize: '14px',
      fontWeight: '500',
      maxWidth: '300px',
      wordWrap: 'break-word',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
      transform: 'translateX(100%)',
      opacity: '0',
      transition: 'all 0.3s ease',
      backgroundColor: type === 'success' ? '#10b981' : '#ef4444',
      ...options.style
    });

    container.appendChild(toast);

    // Animate in
    setTimeout(() => {
      toast.style.transform = 'translateX(0)';
      toast.style.opacity = '1';
    }, 10);

    // Remove after duration
    const duration = options.duration || DEFAULT_VALUES.TOAST_DURATION;
    setTimeout(() => {
      toast.style.transform = 'translateX(100%)';
      toast.style.opacity = '0';
      
      setTimeout(() => {
        if (container.contains(toast)) {
          container.removeChild(toast);
        }
        
        // Remove container if empty
        if (container.children.length === 0) {
          document.body.removeChild(container);
          this.container = null;
        }
      }, 300);
    }, duration);
  }

  success(message: string, options?: ToastOptions) {
    this.showToast(message, 'success', options);
  }

  error(message: string, options?: ToastOptions) {
    this.showToast(message, 'error', options);
  }
}

const toast = new SimpleToast();

export default toast;
