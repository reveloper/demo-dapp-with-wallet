import { css } from '@emotion/react';

export const styles = {
  header: css`
    font-size: 18px;
    font-weight: 600;
    text-align: center;
    margin-top: 16px;
  `,
  title: css`
    font-size: 16px;
    font-weight: 600;
  `,
  statusImage: css`
    width: 32px;
    height: 32px;
  `,
  status: css`
    display: flex;
    align-items: center;
    width: 50%;
    gap: 8px;
    
    span {
      font-size: 14px;
    }
  `
}
