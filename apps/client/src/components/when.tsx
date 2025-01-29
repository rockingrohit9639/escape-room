type WhenProps<TCondition> = {
  condition: TCondition
  children: React.ReactNode
  fallback?: React.ReactNode
}

export default function When<TCondition>({ condition, children, fallback }: WhenProps<TCondition>) {
  return condition ? children : fallback ? fallback : null
}
