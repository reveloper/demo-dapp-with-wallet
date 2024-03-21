import { css } from '@emotion/react';
import { BoxProps } from './types';

export const useBox = ({
  display,
  alignItems,
  alignSelf,
  justifyContent,
  flexDirection,
  flexWrap,
  gap,

  top,
  right,
  bottom,
  left,

  width,
  height,
  maxWidth,
  maxHeight,
  minWidth,
  minHeight,
  aspectRatio,
  radius,
  boxShadow,
  position,
  background,

  p,
  px,
  py,
  pt,
  pr,
  pb,
  pl,

  m,
  mx,
  my,
  mt,
  mr,
  mb,
  ml,

  cursor,

  ...attributes
}: BoxProps) => {
  const boxStyle = css`
    ${display && `display: ${display};`}
    ${alignItems && `align-items: ${alignItems};`}
    ${alignSelf && `align-self: ${alignSelf};`}
    ${justifyContent && `justify-content: ${justifyContent};`}
    ${flexDirection && `flex-direction: ${flexDirection};`}
    ${flexWrap && `flex-wrap: ${flexWrap};`}
    ${gap && `gap: ${gap};`}
        
    ${top && `top: ${top};`}
    ${right && `right: ${right};`}
    ${bottom && `bottom: ${bottom};`}
    ${left && `left: ${left};`}
        
    ${width && `width: ${width};`}
    ${height && `height: ${height};`}
    ${maxWidth && `max-width: ${maxWidth};`}
    ${maxHeight && `max-height: ${maxHeight};`}
    ${minWidth && `min-width: ${minWidth};`}
    ${minHeight && `min-height: ${minHeight};`}
    ${aspectRatio && `aspect-ratio: ${aspectRatio};`}
    ${radius && `border-radius: ${radius};`}
    ${boxShadow && `box-shadow: ${boxShadow};`}
    ${position && `position: ${position};`}
    ${background && `background: ${background};`}
        
    ${(p || py || pt) && `padding-top: ${p || py || pt};`}
    ${(p || px || pr) && `padding-right: ${p || px || pr};`}
    ${(p || py || pb) && `padding-bottom: ${p || py || pb};`}
    ${(p || px || pl) && `padding-left: ${p || px || pl};`}
        
    ${(m || my || mt) && `margin-top: ${m || my || mt};`}
    ${(m || mx || mr) && `margin-right: ${m || mx || mr};`}
    ${(m || my || mb) && `margin-bottom: ${m || my || mb};`}
    ${(m || mx || ml) && `margin-left: ${m || mx || ml};`}
    
    ${cursor && `cursor: ${cursor};`}
  `;

  return { boxStyle, ...attributes };
};
