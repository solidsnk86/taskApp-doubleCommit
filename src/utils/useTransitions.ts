export function useViewTransition() {
    const startTransition = (callback: () => void) => {
      if (!document.startViewTransition) {
        callback();
        return;
      }
  
      document.startViewTransition(() => {
        callback();
      });
    };
  
    return { startTransition };
  }
  