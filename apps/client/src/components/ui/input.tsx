import { forwardRef, useState } from 'react'
import { cn } from '~/lib/utils'
import { Toggle } from './toggle'
import { EyeOffIcon, EyeIcon } from 'lucide-react'

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  inputClassName?: string
}

const Input = forwardRef<HTMLInputElement, InputProps>(({ className, style, type, inputClassName, ...props }, ref) => {
  const [passwordVisible, setPasswordVisible] = useState(false)

  return (
    <div
      className={cn(
        'flex h-9 w-full items-center overflow-hidden rounded-md border border-input bg-transparent focus-within:outline-none focus-within:ring-1 focus-within:ring-ring',
        className,
      )}
      style={style}
    >
      <input
        type={type === 'password' ? (passwordVisible ? 'text' : 'password') : type}
        className={cn(
          'size-full appearance-none bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0  file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-within:outline-none disabled:cursor-not-allowed disabled:opacity-50',
          inputClassName,
        )}
        ref={ref}
        {...props}
      />
      {type === 'password' ? (
        <Toggle size="sm" pressed={passwordVisible} onPressedChange={setPasswordVisible} disabled={props.disabled}>
          {passwordVisible ? (
            <EyeOffIcon className="h-4 w-4 text-muted-foreground" />
          ) : (
            <EyeIcon className="h-4 w-4 text-muted-foreground" />
          )}
        </Toggle>
      ) : null}
    </div>
  )
})
Input.displayName = 'Input'

export { Input }
