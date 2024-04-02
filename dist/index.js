"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const dataRetrieveRoutes_1 = __importDefault(require("./routes/dataRetrieveRoutes"));
const balanceRetrieveRoutes_1 = __importDefault(require("./routes/balanceRetrieveRoutes"));
const auth_1 = require("./middlewares/auth");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const swagger_1 = require("./swagger");
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
app.use(express_1.default.json());
mongoose_1.default.connect(process.env.MONGO_URI || "", {}).then(() => {
    console.log("Connected to MongoDB");
});
app.get("/", (req, res) => {
    res.send("Hello World");
});
app.use((0, cookie_parser_1.default)());
app.use("/api-docs", swagger_1.swaggerUiExpress.serve, swagger_1.swaggerUiExpress.setup(swagger_1.specs));
app.use("/auth", authRoutes_1.default);
app.use("/", auth_1.verifyToken, dataRetrieveRoutes_1.default);
app.use("/balance", auth_1.verifyToken, balanceRetrieveRoutes_1.default);
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
