import type { NextConfig } from "next";
import type { Configuration } from "webpack";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Keep transpilation minimal to avoid pulling in react-native-web/tailwind on the server
  transpilePackages: [
    "@foclupus/utils",
  ],

  // Add webpack customization to allow importing .ts/.tsx from external packages
  webpack: (config: Configuration, { webpack, isServer }) => {
    // Ensure config.resolve exists
    config.resolve = config.resolve || {};
    config.resolve.extensions = [
      ".web.js",
      ".web.jsx",
      ".web.ts",
      ".web.tsx",
      ".js",
      ".jsx",
      ".ts",
      ".tsx",
    ];

    // Preserve any existing aliases and add react-native -> react-native-web
    const path = require('path');
    config.resolve.alias = {
      ...(config.resolve.alias as Record<string, string> | undefined),
      // Force single React/react-dom resolution from workspace to avoid duplicate bundles
        // Point aliases to the package root directories so subpath imports (e.g. react/jsx-runtime)
        // resolve correctly under pnpm/monorepo setups.
        'react': path.dirname(require.resolve('react/package.json')),
        'react-dom': path.dirname(require.resolve('react-dom/package.json')),
        'react/jsx-runtime': require.resolve('react/jsx-runtime'),
      // map react-native imports to a local shim that re-exports react-native-web
      // using a shim ensures resolution even when packages require('react-native') directly
      'react-native$': path.resolve(__dirname, 'react-native-shim.js'),
      'react-native': path.resolve(__dirname, 'react-native-shim.js'),
      // Ensure Next's client import resolves to the real react-dom client entry
      'react-dom/client': require.resolve('react-dom/client'),
      // Map native icon package to the web icon package to avoid RN SVG imports on server
      'lucide-react-native': require.resolve('lucide-react'),
      // avoid aliasing the main 'react-dom' so Next's own resolution remains intact
    };

    return config;
  },
};

export default nextConfig;
