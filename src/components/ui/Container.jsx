import { cn } from '../../utils'

export default function Container({ children, className, as: Tag = 'div' }) {
  return <Tag className={cn('container-premium', className)}>{children}</Tag>
}
