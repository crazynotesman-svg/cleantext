interface CharCounterProps {
  chars: number
  limit: number
}

export function CharCounter({ chars, limit }: CharCounterProps) {
  const pct = Math.min(100, (chars / limit) * 100)
  const exceeded = chars > limit
  const near = !exceeded && chars / limit >= 0.8
  const barColor = exceeded
    ? 'bg-rose-500'
    : near
      ? 'bg-amber-500'
      : 'bg-brand-500'
  const textColor = exceeded
    ? 'text-rose-600 dark:text-rose-400'
    : near
      ? 'text-amber-600 dark:text-amber-400'
      : 'text-slate-500 dark:text-slate-400'

  return (
    <div>
      <div className="flex items-baseline justify-between text-xs">
        <span className={`font-semibold tabular-nums ${textColor}`}>
          {chars.toLocaleString('en-US')}
          <span className="font-normal text-slate-400 dark:text-slate-500">
            {' '}/ {limit.toLocaleString('en-US')}
          </span>
        </span>
        {exceeded ? (
          <span className="font-medium text-rose-600 dark:text-rose-400">
            Exceeded by {(chars - limit).toLocaleString('en-US')} chars
          </span>
        ) : near ? (
          <span className="font-medium text-amber-600 dark:text-amber-400">Almost full</span>
        ) : (
          <span className="text-slate-400 dark:text-slate-500">
            {(limit - chars).toLocaleString('en-US')} left
          </span>
        )}
      </div>
      <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">
        <div
          className={`h-full rounded-full transition-all duration-300 ${barColor}`}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  )
}
