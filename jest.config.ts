import type { Config } from 'jest';

const config: Config = {
    clearMocks: true,
    testEnvironment: 'jsdom',
    moduleDirectories: ['node_modules'],
    moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx'],
    testMatch: [
        '<rootDir>test/**/*(*.)@(spec|test).[tj]s?(x)',
    ],
    roots: ['<rootDir>/test'],
    moduleNameMapper: {
        '^__mocks__/(.*)$': '<rootDir>/__mocks__/$1',

        '\\.(jpg|jpeg|png|gif|eot|otf|webp|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
            '<rootDir>/__mocks__/fileMock.ts',
        '\\.css$': '<rootDir>/__mocks__/styleMock.ts',
        '\\.svg$': '<rootDir>/__mocks__/svgMock.tsx',
    },
    transform: {
        '^.+\\.(j|t)sx?$': ['ts-jest', {isolatedModules: true}],
    },
    setupFilesAfterEnv: ['<rootDir>/test/setup-test.ts']
};

export default config;
