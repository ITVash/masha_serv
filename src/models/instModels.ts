import mongoose, { model, Schema, Document } from "mongoose"

export interface IInst {
	_id?: string
	link?: string
	photo?: string
}

export type IInstModel = IInst & Document

const instSchema = new Schema<IInst>(
	{
		link: { type: String, default: "Ссылка на фотку в инстаграмме" },
		photo: { type: String, default: "" },
	},
	{ versionKey: false, timestamps: true },
)

const instModel = model<IInstModel>("Inst", instSchema)
export default instModel
