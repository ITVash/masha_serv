import mongoose, { model, Schema, Document } from "mongoose"

export interface IReviews {
	_id?: string
	type?: number
	file?: string
	filetype?: string
}

export type IReviewsModel = IReviews & Document

const reviewsSchema = new Schema<IReviews>(
	{
		type: { type: Number, default: 0 },
		file: { type: String, default: "" },
		filetype: { type: String, default: "" },
	},
	{ versionKey: false, timestamps: true },
)

const reviewsModel = model<IReviewsModel>("Reviews", reviewsSchema)
export default reviewsModel
