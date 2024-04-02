import express from "express";
import {
	getAllData,
	getFilteredData,
} from "../controllers/dataRetrieveController";

const router = express.Router();
/**
 * @swagger
 * /data:
 *   get:
 *     summary: Get filtered data from public APIs
 *     description: Retrieves filtered data from a public API based on category and count parameters.
 *     parameters:
 *       - in: query
 *         name: category
 *         description: Filter data by category
 *         schema:
 *           type: string
 *       - in: query
 *         name: count
 *         description: Limit the number of entries returned
 *         schema:
 *           type: integer
 *           format: int32
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 count:
 *                   type: integer
 *                   description: Number of entries returned
 *                 entries:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Entry'
 *       '400':
 *         description: Bad request, invalid count value provided
 *       '404':
 *         description: No data found for the provided category
 *       '500':
 *         description: Failed to retrieve data from the API
 */
router.get("/data", getFilteredData);

export default router;
