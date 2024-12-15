import type { SnapConfig } from '@metamask/snaps-cli';
import { resolve } from 'path';
require('dotenv').config();

const config: SnapConfig = {
  bundler: 'webpack',
  input: resolve(__dirname, 'src/index.tsx'),
  server: {
    port: 8080,
  },
  polyfills: {
    buffer: true,
  },
  environment: {
    ALCHEMY_PROVIDER_API_KEY: process.env.ALCHEMY_PROVIDER_API_KEY,
    CHAIN: process.env.CHAIN,
  },
};

export default config;
