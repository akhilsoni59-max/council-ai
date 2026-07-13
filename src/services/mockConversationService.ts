import type { Project } from '../types';

export type RecentConversation = { id: string; title: string; prompt: string };

export const recentConversations: Array<{ group: string; items: RecentConversation[] }> = [
  {
    group: 'Today',
    items: [
      { id: 'ki-school', title: 'Everything about KI School', prompt: 'Tell me everything about KI School.' },
      { id: 'launch', title: 'AI startup launch strategy', prompt: 'Build a launch strategy for my AI startup.' },
      { id: 'framework', title: 'Choose a frontend framework', prompt: 'Which frontend framework should I choose for a new SaaS platform?' },
    ],
  },
  {
    group: 'Yesterday',
    items: [
      { id: 'itinerary', title: 'Plan a Japan itinerary', prompt: 'Create a seven-day Japan itinerary for a first-time visitor.' },
      { id: 'risks', title: 'Review a business idea', prompt: 'Review this business idea and identify its biggest risks.' },
      { id: 'quantum', title: 'Explain quantum computing', prompt: 'Explain quantum computing in plain language.' },
    ],
  },
  {
    group: 'Previous 7 Days',
    items: [
      { id: 'laptop', title: 'Best laptop for design work', prompt: 'What is the best laptop for professional design work?' },
      { id: 'cloud', title: 'Compare cloud platforms', prompt: 'Compare AWS, Azure, and Google Cloud for a growing startup.' },
      { id: 'campaign', title: 'Review marketing campaign', prompt: 'Review a marketing campaign and suggest improvements.' },
      { id: 'onboarding', title: 'Improve product onboarding', prompt: 'How should I improve product onboarding?' },
      { id: 'pricing', title: 'Review SaaS pricing strategy', prompt: 'Review a SaaS pricing strategy.' },
    ],
  },
];

export const projects: Project[] = [
  { id: 'growth', name: 'Growth strategy', description: 'Positioning, launch planning, and acquisition research.', conversationCount: 12, updatedAt: '2 hours ago' },
  { id: 'product', name: 'Product decisions', description: 'Technical trade-offs and roadmap reviews.', conversationCount: 8, updatedAt: 'Yesterday' },
  { id: 'learning', name: 'Learning notes', description: 'Deep explanations and research summaries.', conversationCount: 5, updatedAt: '4 days ago' },
];

export async function saveMockConversation() {
  return { ok: true, savedAt: new Date().toISOString() };
}
