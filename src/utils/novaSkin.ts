/* Paints a valid 64x64 Minecraft skin at runtime.

   Why generate instead of shipping a PNG: it keeps the demo self-contained
   with no binary asset and no external skin-API call that could fail offline,
   and it lets the default skin sit in Nova's own palette. Region coordinates
   follow the 1.8+ 64x64 layout. */

const REGIONS = {
  head: [0, 0, 32, 16],
  headOverlay: [32, 0, 32, 16],
  body: [16, 16, 24, 16],
  rightArm: [40, 16, 16, 16],
  leftArm: [32, 48, 16, 16],
  rightLeg: [0, 16, 16, 16],
  leftLeg: [16, 48, 16, 16],
} as const

const PALETTE = {
  skin: '#c98f63',
  skinShade: '#b57c53',
  hair: '#1b2530',
  shirt: '#0f1620',
  shirtAccent: '#14cf76',
  sleeve: '#c98f63',
  pants: '#141d29',
  shoe: '#080c12',
  eye: '#17c8dc',
  mouth: '#7a4a33',
}

function fill(ctx: CanvasRenderingContext2D, region: readonly number[], color: string) {
  ctx.fillStyle = color
  ctx.fillRect(region[0], region[1], region[2], region[3])
}

export function makeNovaSkin(): string {
  const canvas = document.createElement('canvas')
  canvas.width = 64
  canvas.height = 64
  const ctx = canvas.getContext('2d')
  if (!ctx) return ''

  ctx.imageSmoothingEnabled = false
  ctx.clearRect(0, 0, 64, 64)

  // Base body parts.
  fill(ctx, REGIONS.head, PALETTE.skin)
  fill(ctx, REGIONS.body, PALETTE.shirt)
  fill(ctx, REGIONS.rightArm, PALETTE.sleeve)
  fill(ctx, REGIONS.leftArm, PALETTE.sleeve)
  fill(ctx, REGIONS.rightLeg, PALETTE.pants)
  fill(ctx, REGIONS.leftLeg, PALETTE.pants)

  // Hair: top face of the head plus a fringe on the front face.
  ctx.fillStyle = PALETTE.hair
  ctx.fillRect(8, 0, 8, 8) // top
  ctx.fillRect(24, 8, 8, 3) // back
  ctx.fillRect(8, 8, 8, 2) // front fringe
  ctx.fillRect(0, 8, 8, 2) // right side
  ctx.fillRect(16, 8, 8, 2) // left side

  // Face lives on the front head face: x 8-16, y 8-16.
  ctx.fillStyle = PALETTE.eye
  ctx.fillRect(10, 12, 2, 1)
  ctx.fillRect(13, 12, 2, 1)
  ctx.fillStyle = PALETTE.mouth
  ctx.fillRect(11, 14, 3, 1)
  ctx.fillStyle = PALETTE.skinShade
  ctx.fillRect(8, 15, 8, 1) // jawline

  // Emerald chest stripe on the body's front face: x 20-28, y 20-32.
  ctx.fillStyle = PALETTE.shirtAccent
  ctx.fillRect(20, 22, 8, 2)
  ctx.fillRect(23, 24, 2, 6)

  // Shoes at the bottom of each leg's front face.
  ctx.fillStyle = PALETTE.shoe
  ctx.fillRect(4, 28, 8, 4)
  ctx.fillRect(20, 60, 8, 4)

  return canvas.toDataURL('image/png')
}

/* Memoised so the canvas work happens once per page load, not per render. */
let cached: string | null = null

export function defaultNovaSkin(): string {
  if (cached === null) cached = makeNovaSkin()
  return cached
}
