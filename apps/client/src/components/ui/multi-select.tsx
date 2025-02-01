import AsyncSelect, { AsyncProps } from 'react-select/async'
import { cn } from '~/lib/utils'

export type Option = {
  id: string
  name: string
}

type MultiSelectProps = Omit<
  AsyncProps<Option, true, { options: Option[] }>,
  'isMulti' | 'getOptionLabel' | 'classNames'
> & {}

export default function MultiSelect(selectProps: MultiSelectProps) {
  return (
    <AsyncSelect
      {...selectProps}
      isMulti
      getOptionLabel={(option) => option.name}
      getOptionValue={(option) => option.id}
      classNames={{
        control: ({ isFocused }) =>
          cn(
            '!border-input !rounded-md !h-9 !bg-transparent text-sm shadow-sm !ring-offset-background !focus:outline-none !focus:ring-1 !focus:ring-ring',
            { '!outline-none !ring-1 !ring-ring': isFocused },
          ),
        placeholder: () => '!text-muted-foreground',
        indicatorSeparator: () => 'hidden',
        menu: () => '!p-1 !rounded-md !bg-background !text-foreground !border',
        menuList: () => '!p-0 !scrollbar !scrollbar-none',
        option: ({ isFocused }) => cn('!rounded-md !text-sm', { '!bg-muted': isFocused }),
        multiValue: () => '!rounded-md !text-sm',
        input: () => '!text-foreground',
        multiValueRemove: () => 'bg-red-500 !rounded-r-md !rounded-l-0',
      }}
    />
  )
}
