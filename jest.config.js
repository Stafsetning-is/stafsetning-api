module.exports = {
    globals: {
        "ts-jest": {
            tsConfig: "tsconfig.json"
        }
    },
    moduleFileExtensions: ["ts", "js"],
    modulePathIgnorePatterns: ["dist"],
    transform: {
        "^.+\\.(ts|tsx)$": "ts-jest"
    },
    testEnvironment: "node",
    setupFilesAfterEnv: ["./__test__/setup.ts"]
};
