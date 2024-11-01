import type { SnapConfig } from '@metamask/snaps-cli';
import * as dotenv from 'dotenv';
import { resolve } from 'path';

dotenv.config();

const config: SnapConfig = {
  bundler: 'webpack',
  input: resolve(__dirname, 'src/index.ts'),
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
