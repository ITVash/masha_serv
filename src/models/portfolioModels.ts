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
		photo: [
			{
				ptoto1: { type: String, default: "" },
				ptoto2: { type: String, default: "" },
				ptoto3: { type: String, default: "" },
				ptoto4: { type: String, default: "" },
				ptoto5: { type: String, default: "" },
				ptoto6: { type: String, default: "" },
			},
		],
	},
	{ versionKey: false, timestamps: true },
)

const portfolioModel = model<IPortfolioModel>("Portfolio", portfolioSchema)
export default portfolioModel
