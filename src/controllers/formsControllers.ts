import { Request, Response } from "express"
import formsModel, { IForm } from "../models/formsModels"

class FormsControllers {
	create = async (req: Request, res: Response): Promise<void> => {
		try {
			const data: IForm = req.body
			const forms = await formsModel.create(data)
			res.status(201).json({
				status: "success",
				data: forms,
			})
		} catch (err) {
			res.status(500).json({
				status: "Error",
				message: "Ошибка работы сервера",
			})
		}
	}

	show = async (_: any, res: Response): Promise<void> => {
		try {
			const forms = await formsModel.find({}).exec()
			res.status(200).json({
				status: "success",
				data: forms,
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
			const data: IForm = req.body
			const forms = await formsModel
				.findOneAndUpdate({ _id: id }, data, { new: true })
				.exec()
			if (!forms) {
				res.status(404).json({
					status: "Error",
					message: "Данные О Нас отсутствуют",
				})
				return
			}
			res.status(200).json({
				status: "success",
				data: forms,
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
			const forms = await formsModel.findOneAndDelete({ _id: id }).exec()
			res.status(200).json({
				status: "success",
				data: forms,
			})
		} catch (err) {
			res.status(500).json({
				status: "Error",
				message: `Ошибка работы сервера. ${err}`,
			})
		}
	}
}

export const formsCtrl = new FormsControllers()
