import { Request, Response } from "express"
import instModel, { IInst } from "../models/instModels"

class InstControllers {
	create = async (req: Request, res: Response): Promise<void> => {
		try {
			const data: IInst = req.body
			const inst = await instModel.create(data)
			res.status(201).json({
				status: "success",
				data: inst,
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
			const inst = await instModel.find({}).exec()
			res.status(200).json({
				status: "success",
				data: inst,
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
			const data: IInst = req.body
			const inst = await instModel
				.findOneAndUpdate({ _id: id }, data, { new: true })
				.exec()
			if (!inst) {
				res.status(404).json({
					status: "Error",
					message: "Данные О Нас отсутствуют",
				})
				return
			}
			res.status(200).json({
				status: "success",
				data: inst,
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
			const inst = await instModel.findOneAndDelete({ _id: id }).exec()
			res.status(200).json({
				status: "success",
				data: inst,
			})
		} catch (err) {
			res.status(500).json({
				status: "Error",
				message: `Ошибка работы сервера. ${err}`,
			})
		}
	}
}

export const instCtrl = new InstControllers()
