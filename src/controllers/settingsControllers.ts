import { Request, Response } from "express"
import settingsModel, { ISettings } from "../models/settingsModels"

class SettingsControllers {
	create = async (req: Request, res: Response): Promise<void> => {
		try {
			const data: ISettings = req.body
			const settings = await settingsModel.create(data)
			res.status(201).json({
				status: "success",
				data: settings,
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
			const settings = await settingsModel.find({}).exec()

			if (settings.length <= 0) {
				const data: ISettings = req.body
				const create = await settingsModel.create(data)
				res.status(200).json({
					status: "success",
					data: create,
				})
				return
			}
			res.status(200).json({
				status: "success",
				data: settings,
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
			const data: ISettings = req.body
			const settings = await settingsModel
				.findOneAndUpdate({ _id: id }, data, { new: true })
				.exec()
			if (!settings) {
				res.status(404).json({
					status: "Error",
					message: "Данные О Нас отсутствуют",
				})
				return
			}
			res.status(200).json({
				status: "success",
				data: settings,
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
			const settings = await settingsModel.findOneAndDelete({ _id: id }).exec()
			res.status(200).json({
				status: "success",
				data: settings,
			})
		} catch (err) {
			res.status(500).json({
				status: "Error",
				message: `Ошибка работы сервера. ${err}`,
			})
		}
	}
}

export const settingsCtrl = new SettingsControllers()
