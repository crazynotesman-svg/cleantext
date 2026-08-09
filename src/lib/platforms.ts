import type { PlatformId, PlatformSpec } from '../types'

/**
 * Platform limits sourced from each network's public posting rules.
 * `foldAt` marks where the mobile feed truncates a caption behind "See more".
 */
export const PLATFORMS: readonly PlatformSpec[] = [
  {
    id: 'x',
    label: 'X / Twitter',
    charLimit: 280,
    foldAt: null,
    accent: 'slate',
  },
  {
    id: 'instagram',
    label: 'Instagram',
    charLimit: 2200,
    foldAt: 125,
    accent: 'pink',
  },
  {
    id: 'linkedin',
    label: 'LinkedIn',
    charLimit: 3000,
    foldAt: 140,
    accent: 'sky',
  },
] as const

export const DEFAULT_PLATFORM: PlatformId = 'x'

export function getPlatform(id: PlatformId): PlatformSpec {
  return PLATFORMS.find((p) => p.id === id) ?? PLATFORMS[0]
}
