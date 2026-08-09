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
    hint: 'Over 280 characters? Split it into a thread.',
    accent: 'slate',
  },
  {
    id: 'instagram',
    label: 'Instagram',
    charLimit: 2200,
    foldAt: 125,
    hint: 'Only the first 125 characters show before "more".',
    accent: 'pink',
  },
  {
    id: 'linkedin',
    label: 'LinkedIn',
    charLimit: 3000,
    foldAt: 140,
    hint: 'Only the first 140 characters show before "see more".',
    accent: 'sky',
  },
] as const

export const DEFAULT_PLATFORM: PlatformId = 'x'

export function getPlatform(id: PlatformId): PlatformSpec {
  return PLATFORMS.find((p) => p.id === id) ?? PLATFORMS[0]
}
