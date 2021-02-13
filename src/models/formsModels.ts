import { model, Schema, Document } from "mongoose"

export interface IForm {
	_id?: string
	name?: string
	phone?: string
	data?: string
	type?: string
	completed?: boolean
}
export type IFormModel = IForm & Document

const formsSchema = new Schema<IForm>(
	{
		name: { type: String, default: "ФИО" },
		phone: { type: String, default: "Номер телефона" },
		data: { type: String, default: "Дата" },
		type: { type: String, default: "Тип" },
		completed: { type: Boolean, default: false },
	},
	{ versionKey: false, timestamps: true },
)

const formsModel = model<IFormModel>("Form", formsSchema)
export default formsModel
