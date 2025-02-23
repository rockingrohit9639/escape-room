type WhenProps = {
  condition: boolean
  children: React.ReactNode
  fallback?: React.ReactNode
}

export default function When({ condition, children, fallback }: WhenProps) {
  return condition ? children : (fallback ?? null)
}
