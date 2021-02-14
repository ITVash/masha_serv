import mongoose, { model, Schema, Document } from "mongoose"

export type TPortfolio = {
	_id?: string
	photo1?: string
	photo2?: string
	photo3?: string
	photo4?: string
	photo5?: string
	photo6?: string
}

export interface IPortfolio {
	_id?: string
	title?: string
	photos?: TPortfolio[]
}

export type IPortfolioModel = IPortfolio & Document

const portfolioSchema = new Schema<IPortfolio>(
	{
		title: { type: String, default: "Заголовок" },
		photos: [
			{
				photo1: { type: String, default: "" },
				photo2: { type: String, default: "" },
				photo3: { type: String, default: "" },
				photo4: { type: String, default: "" },
				photo5: { type: String, default: "" },
				photo6: { type: String, default: "" },
			},
		],
	},
	{ versionKey: false, timestamps: true },
)

const portfolioModel = model<IPortfolioModel>("Portfolio", portfolioSchema)
export default portfolioModel
