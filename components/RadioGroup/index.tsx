import { useCallback, useState } from 'react';
import { Box } from '../Box';
import { css } from '@emotion/react';

type Option = {
  id: string;
  name: string;
}

type Props = {
  name: string;
  options: Option[];
  onChange?: (option: Option) => void;
}

const styles = {
  radioButton: css`
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    min-width: 20px;
    min-height: 20px;
    border: 1px solid #999;
    border-radius: 50%;
    outline: none;
    margin: 0;
    position: relative;
    
    &:checked {
      background-color: #0098EA;
      border-color: #0098EA;
    }
  `,
  label: css`
    font-size: 16px;
  `
}

export const RadioGroup = ({ name, onChange, options }: Props) => {
  const [activeOption, setActiveOption] = useState(options[0]);

  const handleChange = useCallback((option: Option) => () => {
    setActiveOption(option);

    if (onChange) {
      onChange(option)
    }
  }, [onChange])

  return (
    <Box display="flex" flexDirection="column" gap="8px">
      {options.map((option) => (
        <Box
          display="flex"
          alignItems="center"
          gap="8px"
          onClick={handleChange(option)}
          key={option.id}
        >
          <input
            defaultChecked={option.id === activeOption.id}
            type="radio"
            name={name}
            id={option.id}
            css={styles.radioButton}
          />

          <label css={styles.label} htmlFor={option.id}>
            {option.name}
          </label>
        </Box>
      ))}
    </Box>
  )
}
