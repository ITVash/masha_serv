import mongoose, { model, Schema, Document } from "mongoose"

export interface IAbout {
	_id?: string
	quote?: string
	desc?: string
	photo1?: string
	photo2?: string
}
export type IAboutModel = IAbout & Document

const aboutSchema = new Schema<IAbout>(
	{
		quote: { type: String, default: "Цитата" },
		desc: { type: String, default: "О Себе" },
		photo1: { type: String, default: "" },
		photo2: { type: String, default: "" },
	},
	{ versionKey: false, timestamps: true },
)

const aboutModel = model<IAboutModel>("About", aboutSchema)
export default aboutModel
