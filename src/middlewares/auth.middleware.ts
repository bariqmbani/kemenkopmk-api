const jwt = require('jsonwebtoken')

const auth: FnController = (req, res, next) => {
	const tokenHeader = req.header('x-auth-token')

	if (!tokenHeader)
		return res.status(401).json({
			status: 'error',
			message: 'Tidak ada token, autentikasi ditolak',
		})

	if (tokenHeader.split(' ')[0] !== 'aweuaweu') {
		return res.status(401).json({
			status: 'error',
			message: 'Token identifier tidak valid',
		})
	}

	try {
		const token = tokenHeader.split(' ')[1]
		const decoded = jwt.verify(token, process.env.JWT_SECRET)
		req.user = decoded
		next()
	} catch (err) {
		return res.status(401).json({
			status: 'error',
			message: 'Token tidak valid atau sudah kadaluarsa, silakan login kembali',
		})
	}
}

export default auth
