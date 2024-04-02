import mongoose from "mongoose";

export interface IUser extends mongoose.Document {
	name: string;
	email: string;
	password: string;
}

const userSchema = new mongoose.Schema({
	name: String,
	email: { type: String, unique: true },
	password: String,
});

export default mongoose.model<IUser>("User", userSchema);
