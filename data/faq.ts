export interface FaqItem {
  q: string
  a: string
  detail?: string
}

export const FAQ: FaqItem[] = [
  {
    q: 'Is Nova Client free?',
    a: 'Yes — completely free, no ads, no premium tier.',
  },
  {
    q: 'Is it safe for my Microsoft account?',
    a: 'Nova uses the official Microsoft login flow.',
    detail: 'Your password never touches us — authentication happens directly with Microsoft.',
  },
  {
    q: 'Which platforms are supported?',
    a: 'Windows 10/11, Linux, and an Android app (install from Chrome) today.',
    detail: 'macOS and a full Play Store launcher are in development.',
  },
  {
    q: 'Can my friends see my Discord status?',
    a: 'Yes — that’s the fun part.',
    detail:
      'Nova shows your instance name while playing and your server name while hosting, so friends can hop in.',
  },
  {
    q: 'How do I get help?',
    a: 'Join our Discord — the community and frogg are there daily.',
  },
]
