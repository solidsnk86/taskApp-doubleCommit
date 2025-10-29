/* eslint-disable @typescript-eslint/no-explicit-any */
export {};

declare global {
  interface Document {
    startViewTransition?(callback: () => void): ViewTransition;
  }

  interface ViewTransition {
    finished: Promise<void>;
    updateCallbackDone: Promise<void>;
    ready: Promise<void>;
    skipTransition(): void;
  }

  interface AILanguageModel {
    create(options?: any): Promise<any>;
    availability(): Promise<"available" | "unavailable" | "no-model">;
  }

  interface AI {
    languageModel: AILanguageModel;
  }

  interface Window {
    ai?: AI;
    Summarizer?: any;
  }

  interface TranslatorInstance {
    translate(text: string): Promise<string>;
  }

  interface Translator {
    create(options: {
      sourceLanguage: "es" | "en";
      targetLanguage: "es" | "en";
    }): Promise<TranslatorInstance>;
  }

  const Translator: Translator;
}
