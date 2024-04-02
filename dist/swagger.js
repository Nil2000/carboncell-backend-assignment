"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.swaggerUiExpress = exports.specs = void 0;
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
exports.swaggerUiExpress = swagger_ui_express_1.default;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const PORT = process.env.PORT || 3000;
const options = {
    swaggerDefinition: {
        openapi: "3.0.0",
        info: {
            title: "CarbonCell backend  API Documentation",
            version: "1.0.0",
            description: "Documentation for your API endpoints",
        },
        schemes: ["http", "https"],
        servers: [
            {
                url: `http://localhost:${PORT}`, // Update this with your server URL
                description: "Development server",
            },
        ],
        components: {
            schemas: {
                Entry: {
                    type: "object",
                    properties: {
                        API: { type: "string" },
                        Description: { type: "string" },
                        Auth: { type: "string" }, // assuming Auth can be a string
                        HTTPS: { type: "boolean" },
                        Cors: { type: "string" }, // assuming Cors can be a string
                        Link: { type: "string", format: "uri" }, // assuming Link is a URL
                        Category: { type: "string" },
                    },
                    required: ["API", "Description", "HTTPS", "Category"], // specify required properties
                },
            },
        },
    },
    apis: [
        `${__dirname}/routes/authRoutes.ts`,
        `${__dirname}/routes/dataRetrieveRoutes.ts`,
        `${__dirname}/routes/balanceRetrieveRoutes.ts`,
    ], // Update this with the path to your route files
};
const specs = (0, swagger_jsdoc_1.default)(options);
exports.specs = specs;
