// const { createDefaultPreset } = require("ts-jest");

// const tsJestTransformCfg = createDefaultPreset().transform;

// /** @type {import("jest").Config} */
// module.exports = {
//   testEnvironment: "jsdom",
//   moduleNameMapper: {
//     "\\.(css|less)$": "identity-obj-proxy",
//     "\\.(svg|png|jpg|jpeg|gif)$": "<rootDir>/__mocks__/fileMock.js"
//   },
//   setupFilesAfterEnv: ["./jest.setup.js"]
// };


const config = {
  "roots": [
    "<rootDir>/src"
  ],
  "testMatch": [
    "**/__tests__/**/*.+(ts|tsx|js)",
    "**/?(*.)+(spec|test).+(ts|tsx|js)"
  ],
  "transform": {
    "^.+\\.(ts|tsx)$": "ts-jest"
  },
};

export default config;
