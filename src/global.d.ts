/* eslint-disable @typescript-eslint/no-explicit-any */
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
  Translator?: any;
  Summarizer?: any;
}
