module.exports = {
  preset: 'ts-jest',  // Use ts-jest preset
  testEnvironment: 'node',  // Strapi runs in Node.js environment
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',  // Use ts-jest for transforming TypeScript files
  },
  testPathIgnorePatterns: [
    "/node_modules/",
    "/dist/",
    "/.tmp/",  // Ignore Strapi's temporary directories
  ],
  globals: {
    'ts-jest': {
      tsconfig: '<rootDir>/tsconfig.json',  // Ensure tsconfig.json is used by ts-jest
    },
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],  // Add TypeScript extensions
  collectCoverageFrom: [
    "src/**/*.{ts,tsx,js,jsx}",
    "config/**/*.{ts,tsx,js,jsx}",
  ],  // Collect coverage from your TypeScript and JavaScript files
};
