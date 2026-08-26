export interface Account {
  username: string
  uuid: string
  online: boolean
  /** Data URL, painted at runtime by utils/novaSkin.ts. */
  skinUrl: string | null
}

/* Matches the account shown in the live site's launcher mockup. */
export const SEED_ACCOUNT: Account = {
  username: 'Froggy_Live',
  uuid: '8f3c1d2e-4b5a-4c6d-9e7f-0a1b2c3d4e5f',
  online: true,
  skinUrl: null,
}
