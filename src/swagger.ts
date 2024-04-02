import swaggerJsdoc from "swagger-jsdoc";
import swaggerUiExpress from "swagger-ui-express";
import dotenv from "dotenv";
dotenv.config();
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
				url: `https://carboncell-backend-assignment.onrender.com/`, // Update this with your server URL
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

const specs = swaggerJsdoc(options);

export { specs, swaggerUiExpress };
