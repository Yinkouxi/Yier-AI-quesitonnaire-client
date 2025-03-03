import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ThemeProvider, createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    background: #f5f5f5;
  }
`;

const theme = {
  colors: {
    primary: "#1677ff",
    success: "#52c41a",
    error: "#ff4d4f",
    text: {
      primary: "#262626",
      secondary: "#8c8c8c",
    },
  },
};

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Component {...pageProps} />
    </ThemeProvider>
  );
}
