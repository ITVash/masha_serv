import express from "express"
import multer from "multer"
import webPush from "web-push"
import { aboutCtrl } from "../controllers/aboutControllers"
import { courseCtrl } from "../controllers/courseControllers"
import { formsCtrl } from "../controllers/formsControllers"
import { instCtrl } from "../controllers/instControllers"
import { notifyCtrl } from "../controllers/notifyControllers"
import { portfolioCtrl } from "../controllers/portfolioControllers"
import { reviewsCtrl } from "../controllers/reviewsControllers"
import { serviceCtrl } from "../controllers/serviceControllers"
import { settingsCtrl } from "../controllers/settingsControllers"
import { userCtrl } from "../controllers/userControllers"
import { sendEmail } from "../utils/sendEmail"
import { validRegist } from "../validators/validForm"
import { passport } from "./passport"
type TMess = {
	from?: string
	to?: string
	subject?: string
	html?: string
	text?: string
}
const createRoutes = (app: express.Express): void => {
	webPush.setVapidDetails(
		"mailto:vashdns@gmail.com",
		`${process.env.PUBLIC_KEY}`,
		`${process.env.PRIVATE_KEY}`,
	)
	/**
	 * Хранилища, для загружаемых файлов
	 */
	const storageFiles = multer.diskStorage({
		destination: (req, file, cb): void => {
			cb(null, "upload")
		},
		filename: (req, file, cb): void => {
			cb(null, `${Date.now()}_${file.originalname}`)
		},
	})
	let uploadFiles = multer({ storage: storageFiles })

	/**
	 * Роуты загрузки файлов
	 */
	app.post(
		"/api/attachments",
		//passport.authenticate("jwt", { session: false }),
		uploadFiles.single("file"),
		async (req: express.Request, res: express.Response): Promise<void> => {
			try {
				const file = req.file
				res.status(201).json({
					status: "success",
					data: file,
					path: file.path,
				})
			} catch (error) {
				res.status(500).json({
					status: "Error",
					message: `Ошибка загрузки файлов. ${error}`,
				})
			}
		},
	)
	app.post(
		"/api/attachmentsMany",
		//passport.authenticate("jwt", { session: false }),
		uploadFiles.array("file"),
		async (req: express.Request, res: express.Response): Promise<void> => {
			try {
				const file = req.files
				res.status(201).json({
					status: "success",
					data: file,
				})
			} catch (error) {
				res.status(500).json({
					status: "Error",
					message: `Ошибка загрузки файлов. ${error}`,
				})
			}
		},
	)

	/**
	 * Форма обратной связи
	 */
	app.post(
		"/api/forms",
		//passport.authenticate("jwt", { session: false }),
		formsCtrl.create,
	) //Добавление Форма обратной связи
	app.get("/api/forms", formsCtrl.show) //Показать Форма обратной связи
	app.put(
		"/api/forms/:id",
		//passport.authenticate("jwt", { session: false }),
		formsCtrl.update,
	) //Редактировать Форма обратной связи
	app.delete(
		"/api/forms/:id",
		//passport.authenticate("jwt", { session: false }),
		formsCtrl.delete,
	) //Удалить Форма обратной связи

	/**
	 * Инстаграмм
	 */
	app.post(
		"/api/inst",
		//passport.authenticate("jwt", { session: false }),
		instCtrl.create,
	) //Добавление Инстаграмм
	app.get("/api/inst", instCtrl.show) //Показать Инстаграмм
	app.put(
		"/api/inst/:id",
		//passport.authenticate("jwt", { session: false }),
		instCtrl.update,
	) //Редактировать Инстаграмм
	app.delete(
		"/api/inst/:id",
		//passport.authenticate("jwt", { session: false }),
		instCtrl.delete,
	) //Удалить Инстаграмм

	/**
	 * Отзывы
	 */
	app.post(
		"/api/reviews",
		//passport.authenticate("jwt", { session: false }),
		reviewsCtrl.create,
	) //Добавление Отзывы
	app.get("/api/reviews", reviewsCtrl.show) //Показать Отзывы
	app.put(
		"/api/reviews/:id",
		//passport.authenticate("jwt", { session: false }),
		reviewsCtrl.update,
	) //Редактировать Отзывы
	app.delete(
		"/api/reviews/:id",
		//passport.authenticate("jwt", { session: false }),
		reviewsCtrl.delete,
	) //Удалить Отзывы

	/**
	 * О Себе
	 */
	app.post(
		"/api/about",
		passport.authenticate("jwt", { session: false }),
		aboutCtrl.create,
	) //Добавление О Себе
	app.get("/api/about", aboutCtrl.show) //Показать О Себе
	app.put(
		"/api/about/:id",
		//passport.authenticate("jwt", { session: false }),
		aboutCtrl.update,
	) //Редактировать О Себе
	app.delete(
		"/api/about/:id",
		passport.authenticate("jwt", { session: false }),
		aboutCtrl.delete,
	) //Удалить О Себе

	/**
	 * Курсы
	 */
	app.post(
		"/api/course",
		passport.authenticate("jwt", { session: false }),
		courseCtrl.create,
	) //Добавление Курсы
	app.get("/api/course", courseCtrl.show) //Показать Курсы
	app.put(
		"/api/course/:id",
		//passport.authenticate("jwt", { session: false }),
		courseCtrl.update,
	) //Редактировать Курсы
	app.delete(
		"/api/course/:id",
		passport.authenticate("jwt", { session: false }),
		courseCtrl.delete,
	) //Удалить Курсы

	/**
	 * Портфолио
	 */
	app.post(
		"/api/portfolio",
		passport.authenticate("jwt", { session: false }),
		portfolioCtrl.create,
	) //Добавление Портфолио
	app.get("/api/portfolio", portfolioCtrl.show) //Показать Портфолио
	app.put(
		"/api/portfolio/:id",
		//passport.authenticate("jwt", { session: false }),
		portfolioCtrl.update,
	) //Редактировать Портфолио
	app.delete(
		"/api/portfolio/:id",
		passport.authenticate("jwt", { session: false }),
		portfolioCtrl.delete,
	) //Удалить Портфолио

	/**
	 * Услуги
	 */
	app.post(
		"/api/service",
		//passport.authenticate("jwt", { session: false }),
		serviceCtrl.create,
	) //Добавление Услуги
	app.get("/api/service", serviceCtrl.show) //Показать Услуги
	app.put(
		"/api/service/:id",
		//passport.authenticate("jwt", { session: false }),
		serviceCtrl.update,
	) //Редактировать Услуги
	app.delete(
		"/api/service/:id",
		//passport.authenticate("jwt", { session: false }),
		serviceCtrl.delete,
	) //Удалить Услуги

	/**
	 * Настройки
	 */
	app.post(
		"/api/settings",
		passport.authenticate("jwt", { session: false }),
		settingsCtrl.create,
	) //Добавление Настройки
	app.get("/api/settings", settingsCtrl.show) //Показать Настройки
	app.put(
		"/api/settings/:id",
		//passport.authenticate("jwt", { session: false }),
		settingsCtrl.update,
	) //Редактировать Настройки
	app.delete(
		"/api/settings/:id",
		passport.authenticate("jwt", { session: false }),
		settingsCtrl.delete,
	) //Удалить Настройки

	/**
	 * Пуш уведомления
	 */
	app.post("/api/notify/subscribe", notifyCtrl.create)
	app.post("/api/notify/send", notifyCtrl.send)
	app.post("/api/notify/", notifyCtrl.showPoint)
	app.patch("/api/notify/", notifyCtrl.delete)

	/**
	 * Send Mail
	 */
	app.post(
		"/api/sendclick",
		async (req: express.Request, res: express.Response) => {
			const data = req.body
			if (!data.forms[0] || !data.forms[1] || !data.forms[2] || !data.forms[3])
				return res
					.status(400)
					.json({ message: "Поля не могут быть пустыми", data })
			const mess: TMess = {
				from: "robot@itd.company",
				to: "itdwebcompany@gmail.com",
				subject: "Чеклист с сайта",
				text: `${data.forms[3]}`,
				html: `<p>Имя отправителя: ${data.forms[0]}</p>
			<p>Телефон отправителя: ${data.forms[1]}</p>
			<p>Почта отправителя: ${data.forms[2]}</p>
			<p>Сообщение: <br /> ${data.forms[3]}</p>
			<p>Данные чекбокса:</p>
			<p>Тип сайта: ${data.list1}</p>
			<p>Языки: ${data.list2}</p>
			<p>Сроки: ${data.list3}</p>
			<p>Наличие логотипа или фирменного стиля: ${data.list4}</p>`,
			}
			sendEmail(
				{ mailTo: mess.to!, subject: mess.subject!, html: mess.html! },
				(err: Error | null) => {
					if (err) {
						res.status(400).json({
							status: "Error",
							message: `Ошибка отправки чеклиста. ${err}`,
						})
					}
				},
			)
		},
	)

	/**
	 * Роуты профилей позьзователей
	 */
	app.get("/api/users", userCtrl.show) //Показ всех пользователей
	app.get("/api/users/:id", userCtrl.showUser) //Поиск пользователя по его ID
	app.get(
		"/api/auth/me",
		passport.authenticate("jwt", { session: false }),
		userCtrl.getMe,
	) //Информация о пользователе
	app.get("/api/auth/verify", userCtrl.verify) //Верификация пользователя
	app.post("/api/signup", validRegist, userCtrl.create) //Создание нового пользователя
	app.post("/api/signin", passport.authenticate("local"), userCtrl.signIn) //Авторизация пользователя с использованием паспорта
	app.get(
		"/api/auth/vk",
		passport.authenticate("vkontakte", { scope: ["email"], session: false }),
		async (req: express.Request, res: express.Response): Promise<void> => {
			try {
				res.json({
					status: "success",
					data: req.user,
				})
			} catch (error) {
				console.log(error)
			}
		},
	) //Авторизация пользователя с использованием паспорта в VK
	app.get(
		"/api/auth/vk/login",
		passport.authenticate("vkontakte", {
			scope: ["email"],
			session: true,
			//successRedirect: "/",
			failureRedirect: "/",
		}),
		userCtrl.signInSoc,
	) //Авторизация пользователя с использованием паспорта в VK
	app.get(
		"/api/auth/fb",
		passport.authenticate("facebook", { scope: ["email"], session: false }),
		async (req: express.Request, res: express.Response): Promise<void> => {
			try {
				res.json({
					status: "success",
					data: req.user,
				})
			} catch (error) {
				console.log(error)
			}
		},
	) //Авторизация пользователя с использованием паспорта в Facebook
	app.get(
		"/api/auth/fb/login",
		passport.authenticate("facebook", {
			scope: ["email"],
			session: true,
			//successRedirect: "/",
			failureRedirect: "/",
		}),
		userCtrl.signInSoc,
	) //Авторизация пользователя с использованием паспорта в Facebook
	app.get(
		"/api/auth/google",
		passport.authenticate("google", {
			scope: ["email"],
			session: false,
		}),
		async (req: express.Request, res: express.Response): Promise<void> => {
			try {
				res.json({
					status: "success",
					data: req.user,
				})
			} catch (error) {
				console.log(error)
			}
		},
	) //Авторизация пользователя с использованием паспорта в Google
	app.get(
		"/api/auth/google/login",
		passport.authenticate("google", {
			session: true,
			//successRedirect: "/",
			failureRedirect: "/",
		}),
		userCtrl.signInSoc,
	) //Авторизация пользователя с использованием паспорта в Google
	app.put(
		"/api/users/:id",
		passport.authenticate("jwt", { session: false }),
		userCtrl.editUser,
	) //Обновление данных пользователя
	app.delete(
		"/api/users/:id",
		passport.authenticate("jwt", { session: false }),
		userCtrl.deleteUser,
	) //Обновление данных пользователя
	app.post("/api/users/remember", userCtrl.remember) //Обновление данных пользователя
}

export default createRoutes
