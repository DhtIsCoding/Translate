import CopyWebpackPlugin from 'copy-webpack-plugin';
import type { NextConfig } from 'next';
import path from 'node:path';

const pdfjsDistPath = path.dirname(require.resolve('pdfjs-dist/package.json'));
const cMapsDir = path.join(pdfjsDistPath, 'cmaps');

const nextConfig: NextConfig = {
  /* config options here */
  webpack: (config) => {
    config.resolve.alias.canvas = false;

    config.plugins.push(
      new CopyWebpackPlugin({
        patterns: [
          {
            from: cMapsDir,
            to: 'cmaps/',
          },
        ],
      }),
    );

    return config;
  },
};

export default nextConfig;
