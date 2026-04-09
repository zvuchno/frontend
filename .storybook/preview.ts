import type { Preview } from "@storybook/nextjs-vite";

import "../src/app/globals.scss";

const style = document.createElement("style");
style.textContent = `
  @font-face {
    font-family: 'BetterVCR';
    src: url('/fonts/BetterVCR.woff2') format('woff2');
    font-weight: 400;
    font-style: normal;
    font-display: swap;
  }

  @font-face {
    font-family: 'Feature Mono';
    src: url('/fonts/FeatureMono-Regular.ttf') format('truetype');
    font-weight: 400;
    font-style: normal;
    font-display: swap;
  }

  @font-face {
    font-family: 'Feature Mono';
    src: url('/fonts/FeatureMono-Medium.ttf') format('truetype');
    font-weight: 500;
    font-style: normal;
    font-display: swap;
  }

  @font-face {
    font-family: 'Feature Mono';
    src: url('/fonts/FeatureMono-Bold.ttf') format('truetype');
    font-weight: 700;
    font-style: normal;
    font-display: swap;
  }

  :root {
    --font-better-vcr: 'BetterVCR', monospace;
    --font-feature-mono: 'Feature Mono', monospace;
  }
`;

document.head.appendChild(style);

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    a11y: {
      test: "todo",
    },
  },
};

export default preview;
