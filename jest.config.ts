import type {Config} from 'jest';

const config: Config = {
  preset: 'ts-jest',
  rootDir: "./src",
  testEnvironment: "node",
  testMatch: ["**/*.test.ts"],
};

export default config;