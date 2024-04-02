import Web3 from "web3";
import dotenv from "dotenv";
import { Request, Response } from "express";
dotenv.config();
const endpointUrl = process.env.QUICKNODE_HTTP_ENDPOINT;
const httpProvider = new Web3.providers.HttpProvider(endpointUrl!);
const web3Client = new Web3(httpProvider);

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

export default async function getBalance(req: Request, res: Response) {
	const { tokenAdd, walletAdd } = req.query;

	if (!tokenAdd) {
		return res.status(400).json({ error: "tokenAddress is required" });
	}

	const contract = new web3Client.eth.Contract(minABI, tokenAdd?.toString());

	if (!walletAdd) {
		return res.status(400).json({ error: "walletAddress is required" });
	}
	try {
		const balance: string = await contract.methods.balanceOf(walletAdd).call();
		const balanceInEth = web3Client.utils.fromWei(balance, "ether");
		res
			.status(200)
			.json({ balanceInWei: balance.toString(), balanceInEth: balanceInEth });
	} catch (error) {
		console.log(error);
		res.status(400).json({ message: "Error fetching balance" });
	}
}
