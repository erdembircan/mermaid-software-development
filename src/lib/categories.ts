export type Category =
  | 'flow'
  | 'architecture'
  | 'behavior'
  | 'data'
  | 'planning'

export const CATEGORIES: Record<Category, { label: string; description: string }> = {
  flow: {
    label: 'Flow & Process',
    description: 'Visualize step-by-step processes, decision trees, and system flows.',
  },
  architecture: {
    label: 'Architecture & Structure',
    description: 'Model system components, class hierarchies, and architectural layers.',
  },
  behavior: {
    label: 'Behavior & State',
    description: 'Capture interactions, state machines, and runtime behavior.',
  },
  data: {
    label: 'Data & Analytics',
    description: 'Represent data distributions, relationships, and metrics.',
  },
  planning: {
    label: 'Planning & Project',
    description: 'Track timelines, milestones, roadmaps, and work items.',
  },
}
