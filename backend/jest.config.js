module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  modulePathIgnorePatterns: ["<rootDir>/dist/"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },
  globals: {
    "ts-jest": {
      tsconfig: "tsconfig.json",
    },
  },
  coveragePathIgnorePatterns: [
    "<rootDir>/src/tests/",
  ],
};
