import { css } from '@emotion/react';

export const styles = {
  container: css`
  `,
  product: css`
    display: flex;
    align-items: flex-start;
    width: 100%;
    gap: 8px;
    margin-bottom: 8px;
  `,
  image: css`
    display: block;
    width: 100px;
    height: 100px;
  `,
  content: css`
    display: flex;
    flex-direction: column;
    gap: 8px;
  `,
  title: css`
    font-size: 18px;
    font-weight: 600;
    line-height: 22px;
  `,
  description: css`
    font-size: 14px;
    font-weight: 400;
  `,
  price: css`
    width: 50px;
    max-width: 50px;
    font-weight: 600;
  `,
  button: css`
    width: 100%;
    border-radius: 8px;
    color: #ffffff;
    height: 40px;
    font-weight: 600;
    background: #0098EA;
    font-size: 16px;

    &:disabled {
      background: #728a96;
      color: #f6f7f8;
    }
  `,
  quantity: (size: 'dense' | 'default' = 'default') => () => css`
    width: ${size === 'dense' ? '40px' : '100%'};
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 8px;
    background: #CBE4FF;
  `,
  quantityButton: css`
    background: #0098EA;
    color: #ffffff;
    height: 40px;
    min-width: 40px;
    font-size: 16px;
    font-weight: 600;
    border-radius: 8px;
    
    &:disabled {
      background: #728a96;
      color: #f6f7f8;
    }
  `,
  buttonGroup: css`
    display: flex;
    align-items: center;
    gap: 8px;
  `,
  total: css`
    
  `
}
