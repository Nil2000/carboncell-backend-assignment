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
const web3_1 = __importDefault(require("web3"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const endpointUrl = process.env.QUICKNODE_HTTP_ENDPOINT;
const httpProvider = new web3_1.default.providers.HttpProvider(endpointUrl);
const web3Client = new web3_1.default(httpProvider);
const minABI = [
    //balanceOf
    {
        constant: true,
        inputs: [{ name: "_owner", type: "address" }],
        name: "balanceOf",
        outputs: [{ name: "balance", type: "uint256" }],
        type: "function",
    },
];
function getBalance(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { tokenAdd, walletAdd } = req.query;
        if (!tokenAdd) {
            return res.status(400).json({ error: "tokenAddress is required" });
        }
        const contract = new web3Client.eth.Contract(minABI, tokenAdd === null || tokenAdd === void 0 ? void 0 : tokenAdd.toString());
        if (!walletAdd) {
            return res.status(400).json({ error: "walletAddress is required" });
        }
        try {
            const balance = yield contract.methods.balanceOf(walletAdd).call();
            const balanceInEth = web3Client.utils.fromWei(balance, "ether");
            res
                .status(200)
                .json({ balanceInWei: balance.toString(), balanceInEth: balanceInEth });
        }
        catch (error) {
            console.log(error);
            res.status(400).json({ message: "Error fetching balance" });
        }
    });
}
exports.default = getBalance;
