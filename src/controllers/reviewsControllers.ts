import { Request, Response } from "express"
import reviewsModel, { IReviews } from "../models/reviewsModels"

class ReviewsControllers {
	create = async (req: Request, res: Response): Promise<void> => {
		try {
			const data: IReviews = req.body
			const reviews = await reviewsModel.create(data)
			res.status(201).json({
				status: "success",
				data: reviews,
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
			const reviews = await reviewsModel.find({}).exec()
			res.status(200).json({
				status: "success",
				data: reviews,
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
			const data: IReviews = req.body
			const reviews = await reviewsModel
				.findOneAndUpdate({ _id: id }, data, { new: true })
				.exec()
			if (!reviews) {
				res.status(404).json({
					status: "Error",
					message: "Данные О Нас отсутствуют",
				})
				return
			}
			res.status(200).json({
				status: "success",
				data: reviews,
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
			const reviews = await reviewsModel.findOneAndDelete({ _id: id }).exec()
			res.status(200).json({
				status: "success",
				data: reviews,
			})
		} catch (err) {
			res.status(500).json({
				status: "Error",
				message: `Ошибка работы сервера. ${err}`,
			})
		}
	}
}

export const reviewsCtrl = new ReviewsControllers()
