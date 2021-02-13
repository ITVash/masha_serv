import { Request, Response } from "express"
import courseModel, { ICourse } from "../models/courseModels"

class CourseControllers {
	create = async (req: Request, res: Response): Promise<void> => {
		try {
			const data: ICourse = req.body
			const course = await courseModel.create(data)
			res.status(201).json({
				status: "success",
				data: course,
			})
		} catch (err) {
			res.status(500).json({
				status: "Error",
				message: "Ошибка работы сервера",
			})
		}
	}

	show = async (req: Request, res: Response): Promise<void> => {
		try {
			const course = await courseModel.find({}).exec()
			if (course.length <= 0) {
				const obj: ICourse[] = [
					{
						title: "Первый пункт",
						desc: "Описание",
					},
					{
						title: "Второй пункт",
						desc: "Описание",
					},
				]
				const create = await courseModel.insertMany(obj)
				res.status(200).json({
					status: "success",
					data: create,
				})
				return
			}
			res.status(200).json({
				status: "success",
				data: course,
			})
		} catch (err) {
			res.status(500).json({
				status: "Error",
				message: "Ошибка работы сервера",
			})
		}
	}

	update = async (req: Request, res: Response): Promise<void> => {
		try {
			const id = req.params.id
			const data: ICourse = req.body
			const course = await courseModel
				.findOneAndUpdate({ _id: id }, data, { new: true })
				.exec()
			if (!course) {
				res.status(404).json({
					status: "Error",
					message: "Данные О Нас отсутствуют",
				})
				return
			}
			res.status(200).json({
				status: "success",
				data: course,
			})
		} catch (err) {
			res.status(500).json({
				status: "Error",
				message: `Ошибка работы сервера. ${err}`,
			})
		}
	}
	delete = async (req: Request, res: Response): Promise<void> => {
		try {
			const id = req.params.id
			const course = await courseModel.findOneAndDelete({ _id: id }).exec()
			res.status(200).json({
				status: "success",
				data: course,
			})
		} catch (err) {
			res.status(500).json({
				status: "Error",
				message: `Ошибка работы сервера. ${err}`,
			})
		}
	}
}

export const courseCtrl = new CourseControllers()
