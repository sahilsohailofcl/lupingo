// apps/next-web/babel.config.js

module.exports = {
  // Use the standard Next.js preset for all core React/TS features
  presets: ["next/babel"],
  plugins: [
    // ⬅️ ADD THIS LINE 
    "@babel/plugin-transform-private-methods",
    // Optional: Include other standard modern JS syntax transforms if needed
    // "@babel/plugin-transform-class-properties",
    // "@babel/plugin-transform-nullish-coalescing-operator",
    // "@babel/plugin-transform-optional-chaining",
    // Keep any other existing custom plugins here
  ].filter(Boolean),
};