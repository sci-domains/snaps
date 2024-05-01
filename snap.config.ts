import type { SnapConfig } from '@metamask/snaps-cli';
import { resolve } from 'path';
import * as dotenv from "dotenv";
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
  },
};

export default config;
