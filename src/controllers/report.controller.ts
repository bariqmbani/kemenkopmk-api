import multer from 'multer'
import { v4 as uuid } from 'uuid'
import fs from 'fs'

import reports from '../dummy/report.json'

const { Report } = reports

const getReports: FnController = (req, res) => {
	const { role, instance_id } = req.user

	switch (role) {
		case 'owner':
			return res.status(200).json({
				status: 'success',
				message: 'Berhasil menampilkan laporan',
				report: Report,
			})

		case 'super':
		case 'admin':
			const report = Report.filter(
				(report) => report.instance_id === instance_id
			)
			return res.status(200).json({
				status: 'success',
				message: 'Berhasil menampilkan laporan',
				report,
			})

		default:
			return res.status(400).json({
				status: 'error',
				message: 'Payload tidak valid',
			})
	}
}

const downloadReport: FnController = (req, res) => {
	const id = req.params.id
	const report = Report.filter((report) => report._id === id)

	// req.user = {
	// 	_id: '507f191e810c19729de86022',
	// 	instance_id: '507f191e810c197239d34vdd',
	// 	role: 'owner',
	// 	username: 'admin123',
	// 	password: '$2b$10$vjlZO.i1Q.Qpb5sebduQ0uIzKJxMsTYsFM0ZJbEZ1ckwI7M2IRbYG',
	// 	email: 'admin@email.test',
	// 	contact: '08123123123',
	// }

	switch (req.user.role) {
		case 'owner':
			if (report.length > 0) {
				const file = `${__dirname}/../../public/upload/report/${id}.pdf`
				return res.download(file)
			}
			break
		case 'super':
		case 'admin':
			if (report.length > 0 && req.user.instance_id === report[0].instance_id) {
				const file = `${__dirname}/../../public/upload/report/${id}.pdf`
				return res.download(file)
			}

		default:
			break
	}

	return res.status(400).json({
		type: 'error',
		message: 'File tidak ditemukan',
	})
}

const uploadReport: FnController = (req, res) => {
	const id = uuid()
	const storage = multer.diskStorage({
		destination: `${__dirname}/../../public/upload/report`,
		filename: (req, file, cb) => {
			cb(null, `${id}.${file.mimetype.split('/')[1]}`)
		},
	})

	const fileFilter = (req: any, file: any, cb: any) => {
		if (file.mimetype === 'application/pdf') {
			cb(null, true)
		} else {
			return res.status(400).json({
				status: 'error',
				message: 'File tidak valid',
			})
		}
	}

	const upload = multer({ storage, fileFilter }).single('report')

	upload(req, res, (err) => {
		if (err) {
			return res.status(400).json({
				status: 'error',
				message: 'File tidak valid',
				error: err,
			})
		}
		const reportDummy = { Report: [...Report] }

		const newReport: any = {
			_id: id,
			instance_id: req.user.instance_id,
			uploader_id: req.user._id,
			date: Date.now(),
			update: Date.now(),
		}

		reportDummy.Report.push(newReport)

		const data = JSON.stringify(reportDummy)
		fs.writeFileSync(`${__dirname}/../dummy/report.json`, data)

		return res.json({
			status: 'success',
			message: 'Berhasil mengunggah dokumen laporan',
			document_id: newReport._id,
		})
	})
}

const updateReport: FnController = (req, res) => {
	const id = req.params.id

	const report = Report.filter((report) => report._id === id)

	if (report.length < 1) {
		return res.status(400).json({
			status: 'error',
			message: 'File tidak ditemukan',
		})
	}

	const storage = multer.diskStorage({
		destination: `${__dirname}/../../public/upload/report`,
		filename: (req, file, cb) => {
			cb(null, `${id}.${file.mimetype.split('/')[1]}`)
		},
	})

	const fileFilter = (req: any, file: any, cb: any) => {
		if (file.mimetype === 'application/pdf') {
			cb(null, true)
		} else {
			return res.status(400).json({
				status: 'error',
				message: 'File tidak valid',
			})
		}
	}

	const upload = multer({ storage, fileFilter }).single('report')

	upload(req, res, (err) => {
		if (err) {
			return res.status(400).json({
				status: 'error',
				message: 'File tidak valid',
				error: err,
			})
		}

		const updatedReport: [] | any = []
		Report.forEach((report) => {
			if (report._id === id) {
				report.update = Date.now()
			}
			return updatedReport.push(report)
		})

		const data = JSON.stringify({ Report: [...updatedReport] })
		fs.writeFileSync(`${__dirname}/../dummy/report.json`, data)

		return res.json({
			status: 'success',
			message: 'Berhasil memperbarui dokumen laporan',
			document_id: id,
		})
	})
}

const deleteReport: FnController = (req, res) => {
	const id = req.params.id

	const report = Report.filter((report) => report._id === id)

	if (report.length < 1) {
		return res.status(400).json({
			status: 'error',
			message: 'File tidak ditemukan',
		})
	}

	const updatedReport: [] | any = []
	Report.forEach((report) => {
		if (report._id !== id) {
			return updatedReport.push(report)
		}
	})

	const data = JSON.stringify({ Report: [...updatedReport] })
	fs.writeFileSync(`${__dirname}/../dummy/report.json`, data)

	const file = `${__dirname}/../../public/upload/report/${id}.pdf`
	fs.unlinkSync(file)

	return res.json({
		status: 'success',
		message: 'Berhasil menghapus dokumen laporan',
		document_id: id,
	})
}

export { getReports, downloadReport, uploadReport, updateReport, deleteReport }
