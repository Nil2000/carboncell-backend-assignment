import { Request, Response } from "express";
import axios from "axios";
export const getAllData = async (req: Request, res: Response) => {
	try {
		const response = await axios.get("https://api.publicapis.org/entries");
		res.status(200).json(response.data);
	} catch (error) {
		res.status(500).json({ error: "Failed to retrieve data" });
	}
};

export const getFilteredData = async (req: Request, res: Response) => {
	try {
		const { category, count } = req.query;
		const response = await axios.get("https://api.publicapis.org/entries");

		let filteredData = response.data.entries;

		if (category) {
			filteredData = filteredData.filter(
				(data: any) => data.Category === category
			);

			if (filteredData.length === 0) {
				return res.status(404).json({ error: "No data found" });
			}
		}

		if (count) {
			if (
				parseInt(count.toString()) < 0 ||
				parseInt(count.toString()) > filteredData.length
			) {
				return res.status(400).json({ error: "Invalid count value" });
			}
			filteredData = filteredData.slice(0, parseInt(count.toString()));
		}

		res.status(200).json({
			count: filteredData.length,
			entries: filteredData,
		});
	} catch (error) {
		res.status(500).json({ error: "Failed to retrieve data" });
	}
};
