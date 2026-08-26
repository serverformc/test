export interface Step {
  n: number
  title: string
  body: string
  detail?: string
}

export const STEPS: Step[] = [
  {
    n: 1,
    title: 'Download & run',
    body: 'Grab the installer right here (Windows or Linux) and run it.',
    detail: 'Java and everything else is bundled — no extra installs needed.',
  },
  {
    n: 2,
    title: 'Log in',
    body: 'Sign in once with your Microsoft account — exactly like the official launcher.',
  },
  {
    n: 3,
    title: 'Play',
    body: 'Pick a version, add mods if you want, hit Play.',
    detail: 'Your Discord status updates itself.',
  },
]
