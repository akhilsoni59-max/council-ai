export type Provider = 'chatgpt' | 'grok' | 'gemini' | 'glm';
export type ModelStatus = 'waiting' | 'thinking' | 'streaming' | 'completed' | 'failed';
export type SynthesisStatus = 'waiting' | 'synthesizing' | 'completed' | 'failed';

export type User = {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  plan: 'free' | 'pro' | 'team';
};

export type ModelResponse = {
  id: string;
  provider: Provider;
  content: string;
  status: ModelStatus;
  responseTime?: number;
  error?: string;
};

export type SynthesizedResponse = {
  id: string;
  provider: 'claude';
  finalAnswer: string;
  consensusSummary: string;
  conflictsResolved: string[];
  remainingUncertainties: string[];
  status: SynthesisStatus;
};

export type Message = {
  id: string;
  role: 'user' | 'council';
  content: string;
  createdAt: string;
  modelResponses?: ModelResponse[];
  synthesis?: SynthesizedResponse;
};

export type Conversation = {
  id: string;
  title: string;
  messages: Message[];
  createdAt: string;
  updatedAt: string;
  projectId?: string;
  saved?: boolean;
};

export type Project = {
  id: string;
  name: string;
  description: string;
  conversationCount: number;
  updatedAt: string;
};

export type UsageData = {
  demoQueriesUsed: number;
  demoQueriesLimit: number;
  sourceResponses: number;
  synthesizedAnswers: number;
};

export type Scenario = {
  id: string;
  prompt: string;
  title: string;
  category: string;
  sources: Record<Provider, string>;
  finalIntro: string;
  finalSections: Array<{ heading: string; body: string | string[] }>;
  agreement: {
    headline: string;
    mainAgreement: string;
    uniqueInsights: number;
    uncertainty: string;
    conflicts: string[];
  };
  timings: Record<Provider, number>;
};

export type SimulationMode = 'success' | 'one-failure' | 'slow' | 'claude-failure' | 'all-failure';
