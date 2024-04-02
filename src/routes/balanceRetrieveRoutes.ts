import express from "express";
import getBalance from "../controllers/balanceRetrieveController";
const router = express.Router();
/**
 * @swagger
 * /getBalance:
 *   get:
 *     summary: Get balance of a wallet for a specific token
 *     description: Retrieve the balance of a wallet for a specific token address.
 *     parameters:
 *       - in: query
 *         name: tokenAdd
 *         description: The address of the token.
 *         required: true
 *         schema:
 *           type: string
 *       - in: query
 *         name: walletAdd
 *         description: The wallet address to check the balance.
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 balanceInWei:
 *                   type: string
 *                   description: Balance in wei.
 *                 balanceInEth:
 *                   type: string
 *                   description: Balance in ether.
 *       '400':
 *         description: Bad request, missing required parameters.
 *       '500':
 *         description: Error fetching balance.
 */
router.get("/", getBalance);

export default router;
