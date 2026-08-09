import {
  BarChart3,
  Bookmark,
  Heart,
  MessageCircle,
  Repeat2,
  Send,
  ThumbsUp,
} from 'lucide-react'
import type { PlatformSpec } from '../../types'
import { countChars } from '../../lib/text'
import { CharCounter } from './CharCounter'
import { useI18n } from '../../i18n/useI18n'

function Avatar({ label, from, to }: { label: string; from: string; to: string }) {
  return (
    <div
      className={`flex size-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br ${from} ${to} text-sm font-bold text-white`}
    >
      {label}
    </div>
  )
}

/** Renders the caption, injecting a "See more" divider at the fold point. */
function Caption({ text, foldAt, seeMore }: { text: string; foldAt: number | null; seeMore: string }) {
  if (foldAt === null || countChars(text) <= foldAt) {
    return (
      <p className="whitespace-pre-wrap break-words text-[15px] leading-relaxed">{text}</p>
    )
  }
  const pts = [...text]
  const above = pts.slice(0, foldAt).join('')
  const below = pts.slice(foldAt).join('')
  return (
    <div>
      <p className="whitespace-pre-wrap break-words text-[15px] leading-relaxed">{above}</p>
      <div className="my-2 flex items-center gap-2 text-[11px] font-medium uppercase tracking-wide text-slate-400 dark:text-slate-500">
        <span className="h-px flex-1 bg-slate-200 dark:bg-slate-700" />
        {seeMore}
        <span className="h-px flex-1 bg-slate-200 dark:bg-slate-700" />
      </div>
      <p className="whitespace-pre-wrap break-words text-[15px] leading-relaxed text-slate-500 dark:text-slate-400">
        {below}
      </p>
    </div>
  )
}

export function PlatformCard({ platform, text }: { platform: PlatformSpec; text: string }) {
  const { dict } = useI18n()
  const social = dict.ui.social
  const chars = countChars(text)

  return (
    <div>
      {platform.id === 'x' && (
        <>
          <div className="flex items-center gap-3">
            <Avatar label="Y" from="from-sky-400" to="to-blue-600" />
            <div className="min-w-0">
              <div className="flex items-center gap-1 text-sm">
                <span className="font-bold">Your Name</span>
                <span className="text-slate-500 dark:text-slate-400">@yourhandle</span>
                <span className="text-slate-500 dark:text-slate-400">· 2h</span>
              </div>
            </div>
          </div>
          <div className="mt-3">
            <Caption text={text} foldAt={platform.foldAt} seeMore={dict.ui.seeMore} />
          </div>
          <div className="mt-3 flex max-w-md items-center justify-between text-slate-500 dark:text-slate-400">
            <MessageCircle className="size-4.5" />
            <Repeat2 className="size-4.5" />
            <Heart className="size-4.5" />
            <div className="flex items-center gap-1">
              <BarChart3 className="size-4.5" />
              <span className="text-xs">1.2K</span>
            </div>
            <Bookmark className="size-4.5" />
          </div>
        </>
      )}

      {platform.id === 'instagram' && (
        <>
          <div className="flex items-center gap-3">
            <Avatar label="Y" from="from-fuchsia-500" to="to-orange-400" />
            <span className="text-sm font-semibold">your.handle</span>
          </div>
          <div className="mt-3">
            <Caption text={text} foldAt={platform.foldAt} seeMore={dict.ui.seeMore} />
          </div>
          <div className="mt-3 flex items-center gap-4 text-slate-700 dark:text-slate-300">
            <Heart className="size-5" />
            <MessageCircle className="size-5" />
            <Send className="size-5" />
            <Bookmark className="size-5 ml-auto" />
          </div>
          <p className="mt-2 text-xs font-semibold text-slate-500 dark:text-slate-400">
            {social.likes}
          </p>
        </>
      )}

      {platform.id === 'linkedin' && (
        <>
          <div className="flex items-center gap-3">
            <Avatar label="Y" from="from-blue-500" to="to-sky-600" />
            <div>
              <div className="text-sm font-semibold">You</div>
              <div className="text-xs text-slate-500 dark:text-slate-400">
                Your headline · 2nd+
              </div>
            </div>
          </div>
          <div className="mt-3">
            <Caption text={text} foldAt={platform.foldAt} seeMore={dict.ui.seeMore} />
          </div>
          <div className="mt-3 flex max-w-sm items-center justify-between border-t border-slate-200 pt-2 text-slate-500 dark:border-slate-700 dark:text-slate-400">
            <span className="flex items-center gap-1.5 text-xs font-medium">
              <ThumbsUp className="size-4" /> {social.like}
            </span>
            <span className="flex items-center gap-1.5 text-xs font-medium">
              <MessageCircle className="size-4" /> {social.comment}
            </span>
            <span className="flex items-center gap-1.5 text-xs font-medium">
              <Repeat2 className="size-4" /> {social.repost}
            </span>
            <span className="flex items-center gap-1.5 text-xs font-medium">
              <Send className="size-4" /> {social.send}
            </span>
          </div>
        </>
      )}

      <div className="mt-4 border-t border-slate-200 pt-3 dark:border-slate-800">
        <CharCounter chars={chars} limit={platform.charLimit} />
      </div>
    </div>
  )
}
