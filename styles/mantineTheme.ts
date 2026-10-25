import { createTheme } from "@mantine/core";

/**
 * Mantine theme.
 * The brand scale is anchored on the #8bd7f8 accent from components/Meta.tsx;
 * keep the two in sync.
 */
export const theme = createTheme({
  primaryColor: "brand",
  primaryShade: 5,
  colors: {
    brand: [
      "#f0f9fe",
      "#ddf2fd",
      "#b8e5fb",
      "#8bd7f8",
      "#63c2f0",
      "#3dabe4",
      "#1d8fd0",
      "#1472ab",
      "#125787",
      "#104262"
    ]
  }
});
