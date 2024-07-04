import {basenameTest} from "./test/unit/mock/ReduxWrapper";

export default {
    gridUrl: "http://localhost:4444/wd/hub",
    baseUrl: `http://localhost:3003/hw/store`,
    pageLoadTimeout: 0,
    httpTimeout: 60000,
    testTimeout: 90000,
    resetCursor: false,
    sets: {
        desktop: {
            files: [
                "test/testplane/**/*.testplane.(t|j)s"
            ],
            browsers: [
                "chrome"
            ]
        }
    },
    browsers: {
        chrome: {
            automationProtocol: "devtools",
            headless: true,
            desiredCapabilities: {
                browserName: "chrome"
            }
        }
    },
    plugins: {
        "html-reporter/testplane": {
            // https://github.com/gemini-testing/html-reporter
            enabled: true,
            path: "test/testplane/report",
            defaultView: "all",
            diffMode: "3-up-scaled"
        }
    }
};
