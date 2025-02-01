import { apiClient } from '~/lib/client'
import MultiSelect, { Option } from './ui/multi-select'
import { useCallback } from 'react'
import { MultiValue } from 'react-select/dist/declarations/src'

type TagsSelectorProps = {
  className?: string
  value?: Option[]
  onChange?: (value: MultiValue<Option>) => void
}

export default function TagsSelector({ className, value, onChange }: TagsSelectorProps) {
  const loadMoreTags = useCallback(async (inputValue: string) => {
    const response = await apiClient.escapeRoomTag.findAll.query({ query: { query: inputValue } })
    if (response.status !== 200) {
      return []
    }

    return response.body
  }, [])

  return (
    <MultiSelect
      className={className}
      placeholder="Select tags"
      value={value}
      onChange={onChange}
      loadOptions={loadMoreTags}
      defaultOptions
      cacheOptions
    />
  )
}
