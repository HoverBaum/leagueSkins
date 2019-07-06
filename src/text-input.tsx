/** @jsx jsx */
import { jsx, css, SerializedStyles } from '@emotion/core'
import TextField, { Input } from '@material/react-text-field'
import MaterialIcon from '@material/react-material-icon'
import '@material/react-material-icon/dist/material-icon.css'

import '@material/react-text-field/dist/text-field.css'
import { FormEvent } from 'react'

const TextInput = ({
  onChange,
  value,
  styles,
  label,
}: {
  onChange: Function
  value: string
  styles: SerializedStyles
  label: string
}) => (
  <div
    css={[
      styles,
      css`
        & .mdc-text-field--focused .mdc-floating-label {
          color: var(--mdc-theme-primary);
        }
        & .delete-icon:hover {
          color: var(--theme-alert);
        }
      `,
    ]}
  >
    <TextField
      label={label}
      onTrailingIconSelect={() => onChange('')}
      trailingIcon={
        <MaterialIcon className="delete-icon" role="button" icon="delete" />
      }
      css={css`
        width: 100%;
      `}
      outlined
    >
      <Input
        value={value}
        onChange={(e: FormEvent<HTMLInputElement>) => {
          onChange(e.currentTarget.value)
        }}
      />
    </TextField>
  </div>
)

export default TextInput
