/* The seven feature cards. `span` is a column count out of the 6-track bento
   grid in Features.module.css — the deliberately uneven spans are what stop
   this reading as a stock 3x2 card wall. */

export type FeatureVisual = 'mods' | 'uptime' | 'none'

export interface Feature {
  id: string
  icon: string
  title: string
  body: string
  detail?: string
  span: 2 | 3 | 4
  accent: 'em' | 'cy'
  visual: FeatureVisual
}

export const FEATURES: Feature[] = [
  {
    id: 'mods',
    icon: '🧩',
    title: 'One-click mods',
    body: 'Browse and install Fabric & Forge mods straight from Modrinth, inside the launcher.',
    detail: 'Corrupt downloads are detected and healed automatically.',
    span: 4,
    accent: 'em',
    visual: 'mods',
  },
  {
    id: 'keep-playing',
    icon: '🛡️',
    title: '24/7 Keep Playing',
    body: 'No more mid-game crashes — Nova keeps your session alive so you can just keep playing.',
    span: 2,
    accent: 'cy',
    visual: 'uptime',
  },
  {
    id: 'hosting',
    icon: '🖥️',
    title: 'Free server hosting',
    body: 'Spin up your own Minecraft server from the Host tab in seconds — Java and Bedrock supported.',
    detail: 'RAM is picked automatically based on your PC.',
    span: 2,
    accent: 'cy',
    visual: 'none',
  },
  {
    id: 'fps',
    icon: '⚡',
    title: 'FPS boost built-in',
    body: 'Sensible performance flags applied automatically, with an optional aggressive mode.',
    detail: 'More frames without touching a single config file.',
    span: 2,
    accent: 'em',
    visual: 'none',
  },
  {
    id: 'skins',
    icon: '🎨',
    title: 'Skins in 3D',
    body: 'Upload your skin and see it rotating live in 3D before you launch. Drag, zoom, admire.',
    span: 2,
    accent: 'cy',
    visual: 'none',
  },
  {
    id: 'art',
    icon: '🖼️',
    title: 'Your art, in-game',
    body: 'Turn any image into Minecraft paintings or a custom Totem of Undying texture.',
    detail: 'One click builds and enables the resource pack for you.',
    span: 3,
    accent: 'em',
    visual: 'none',
  },
  {
    id: 'discord',
    icon: '💬',
    title: 'Discord Rich Presence',
    body: 'Shows “Playing Minecraft — Nova Client” on your profile, with what you’re playing or hosting.',
    detail: 'Plus a Join our Discord button for anyone watching.',
    span: 3,
    accent: 'cy',
    visual: 'none',
  },
]
