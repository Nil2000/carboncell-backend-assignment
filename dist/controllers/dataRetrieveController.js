"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFilteredData = exports.getAllData = void 0;
const axios_1 = __importDefault(require("axios"));
const getAllData = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield axios_1.default.get("https://api.publicapis.org/entries");
        res.status(200).json(response.data);
    }
    catch (error) {
        res.status(500).json({ error: "Failed to retrieve data" });
    }
});
exports.getAllData = getAllData;
const getFilteredData = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { category, count } = req.query;
        const response = yield axios_1.default.get("https://api.publicapis.org/entries");
        let filteredData = response.data.entries;
        if (category) {
            filteredData = filteredData.filter((data) => data.Category === category);
            if (filteredData.length === 0) {
                return res.status(404).json({ error: "No data found" });
            }
        }
        if (count) {
            if (parseInt(count.toString()) < 0 ||
                parseInt(count.toString()) > filteredData.length) {
                return res.status(400).json({ error: "Invalid count value" });
            }
            filteredData = filteredData.slice(0, parseInt(count.toString()));
        }
        res.status(200).json({
            count: filteredData.length,
            entries: filteredData,
        });
    }
    catch (error) {
        res.status(500).json({ error: "Failed to retrieve data" });
    }
});
exports.getFilteredData = getFilteredData;
