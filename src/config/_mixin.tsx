// these sizes are arbitrary and you can set them to whatever you wish
import { css } from "styled-components";

export const sizes = {
  giant: 1170,
  desktop: 992,
  tablet: 768,
  phone: 376
};

export const fontSize = {
  smallFontSize: "9px",
  normalFontSize: "12px",
  largeFontSize: "15px"
};

export const color = { bgColor: "#141414" };

// iterate through the sizes and create a media template
export const media = Object.keys(sizes).reduce((accumulator, label): any => {
  // use em in breakpoints to work properly cross-browser and support users
  // changing their browsers font-size: https://zellwk.com/blog/media-query-units/
  const emSize = sizes[label] / 16;
  accumulator[label] = (...args: any[]) => css`
    @media (max-width: ${emSize}em) {
      ${css.call(undefined, ...args)};
    }
  `;
  return accumulator;
}, {});
