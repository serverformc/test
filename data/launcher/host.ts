export type ServerEdition = 'java' | 'bedrock'

export const DEFAULT_PORT: Record<ServerEdition, number> = {
  java: 25565,
  bedrock: 19132,
}

/* Boot sequence for the mock server console. `{port}` and `{edition}` are
   substituted at runtime. */
export const HOST_BOOT_LINES: string[] = [
  'Starting Nova host runtime…',
  'Allocating {ram} MB to the server JVM',
  'Loading properties for {edition} edition',
  'Preparing level "world"',
  'Preparing spawn area: 42%',
  'Preparing spawn area: 88%',
  'UPnP: forwarded external port {port} → {port}/TCP',
  'Done! Server listening on port {port}',
  'For help, type "help"',
]

export const HOST_IDLE_LINES: string[] = [
  '{player} joined the game',
  '{player} has made the advancement [Stone Age]',
  'Saved the game',
  '{player} left the game',
  'Autosave complete (14ms)',
]

export const MOCK_PLAYERS: string[] = [
  'Froggy_Live',
  'PixelPine',
  'obsidian_owl',
  'Mira_Builds',
  'ChunkGoblin',
  'lantern_fox',
]
