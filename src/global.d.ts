interface Document {
    startViewTransition?(callback: () => void): ViewTransition;
  }
  
  interface ViewTransition {
    finished: Promise<void>;
    updateCallbackDone: Promise<void>;
    ready: Promise<void>;
    skipTransition(): void;
  }
  