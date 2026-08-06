import { useState } from 'react'
import { cn } from '../../utils'

export default function Skeleton({ className }) {
  return <div className={cn('skeleton rounded-sm', className)} aria-hidden />
}

export function ImageWithSkeleton({
  src,
  alt,
  className,
  imgClassName,
  ...props
}) {
  const [loaded, setLoaded] = useState(false)

  return (
    <div className={cn('relative overflow-hidden', className)}>
      {!loaded && <Skeleton className="absolute inset-0 h-full w-full" />}
      <img
        src={src}
        alt={alt}
        loading="lazy"
        onLoad={() => setLoaded(true)}
        className={cn(
          'h-full w-full object-cover transition-opacity duration-500',
          loaded ? 'opacity-100' : 'opacity-0',
          imgClassName
        )}
        {...props}
      />
    </div>
  )
}
