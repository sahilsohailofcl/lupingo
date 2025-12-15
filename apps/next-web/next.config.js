// next.config.js
// 1. Removed: import type { NextConfig } from "next";
// 2. Removed: import type { Configuration } from "webpack";

const path = require('path');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // Keep transpilation minimal to avoid pulling in react-native-web/tailwind on the server
  // This array is fine in JS.
  transpilePackages: [
    "@foclupus/utils",
  ],

  // Add webpack customization to allow importing .ts/.tsx from external packages
  // 3. Changed: Removed TypeScript type annotations from the arguments
  webpack: (config, { isServer }) => {
    // Ensure config.resolve exists
    config.resolve = config.resolve || {};
    config.resolve.extensions = [
      ".web.js",
      ".web.jsx",
      ".web.ts",
      ".web.tsx",
      ".js",
      "jsx",
      ".ts",
      ".tsx",
    ];

    // Preserve any existing aliases and add react-native -> react-native-web
    // 4. Removed: const path = require('path'); (Moved to top)
    
    // 5. Changed: Removed the 'as Record<string, string> | undefined' type assertion
    config.resolve.alias = {
      ...(config.resolve.alias),
      // Force single React/react-dom resolution from workspace to avoid duplicate bundles
      'react': path.dirname(require.resolve('react/package.json')),
      'react-dom': path.dirname(require.resolve('react-dom/package.json')),
      'react/jsx-runtime': require.resolve('react/jsx-runtime'),
      // map react-native imports to a local shim that re-exports react-native-web
      'react-native$': path.resolve(__dirname, 'react-native-shim.js'),
      'react-native': path.resolve(__dirname, 'react-native-shim.js'),
      // Ensure Next's client import resolves to the real react-dom client entry
      'react-dom/client': require.resolve('react-dom/client'),
      // Map native icon package to the web icon package to avoid RN SVG imports on server
      'lucide-react-native': require.resolve('lucide-react'),
    };

    return config;
  },
};

// 6. Changed: Use CommonJS module.exports instead of 'export default'
module.exports = nextConfig;