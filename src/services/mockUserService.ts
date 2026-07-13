import type { UsageData, User } from '../types';

export const mockUser: User = {
  id: 'demo-user',
  name: 'Akhil Soni',
  email: 'akhil@example.com',
  plan: 'free',
};

export const mockUsage: UsageData = {
  demoQueriesUsed: 7,
  demoQueriesLimit: 20,
  sourceResponses: 28,
  synthesizedAnswers: 7,
};
