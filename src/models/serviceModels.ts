import mongoose, { model, Schema, Document } from "mongoose"

export interface IService {
	_id?: string
	title?: string
	workTime?: string
	photo?: string
}
export type IServiceModel = IService & Document

const serviceSchema = new Schema<IService>(
	{
		title: { type: String, default: "Заголовок" },
		workTime: { type: String, default: "Затраты времени" },
		photo: { type: String, default: "" },
	},
	{ versionKey: false, timestamps: true },
)

const serviceModel = model<IServiceModel>("Service", serviceSchema)
export default serviceModel
