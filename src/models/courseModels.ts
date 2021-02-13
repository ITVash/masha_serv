import { model, Schema, Document } from "mongoose"

export interface ICourse {
	_id?: string
	title?: string
	desc?: string
}
export type ICourseModel = ICourse & Document

const courseSchema = new Schema<ICourse>(
	{
		title: { type: String, default: "Заголовок" },
		desc: { type: String, default: "Описание" },
	},
	{ versionKey: false, timestamps: true },
)

const courseModel = model<ICourseModel>("Course", courseSchema)
export default courseModel
