import { Request, Response } from "express"
import aboutModel, { IAbout } from "../models/aboutModels"

class AboutControllers {
	create = async (req: Request, res: Response): Promise<void> => {
		try {
			const data: IAbout = req.body
			const about = await aboutModel.create(data)
			res.status(201).json({
				status: "success",
				data: about,
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
			const about = await aboutModel.find({}).exec()

			if (about.length <= 0) {
				const data: IAbout = req.body
				const create = await aboutModel.create(data)
				res.status(200).json({
					status: "success",
					data: create,
				})
				return
			}
			res.status(200).json({
				status: "success",
				data: about,
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
			const data: IAbout = req.body
			const about = await aboutModel
				.findOneAndUpdate({ _id: id }, data, { new: true })
				.exec()
			if (!about) {
				res.status(404).json({
					status: "Error",
					message: "Данные О Нас отсутствуют",
				})
				return
			}
			res.status(200).json({
				status: "success",
				data: about,
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
			const about = await aboutModel.findOneAndDelete({ _id: id }).exec()
			res.status(200).json({
				status: "success",
				data: about,
			})
		} catch (err) {
			res.status(500).json({
				status: "Error",
				message: `Ошибка работы сервера. ${err}`,
			})
		}
	}
}

export const aboutCtrl = new AboutControllers()
