import mongoose, { model, Schema, Document } from "mongoose"

export interface ISettings {
	_id?: string
	inst?: string
	fb?: string
}
export type ISettingsModel = ISettings & Document

const settingsSchema = new Schema<ISettings>(
	{
		inst: { type: String, default: "Ссылка на страницу инстаграмм" },
		fb: { type: String, default: "Ссылка на страницу Фейсбук" },
	},
	{ versionKey: false, timestamps: true },
)

const settingsModel = model<ISettingsModel>("Settings", settingsSchema)
export default settingsModel
