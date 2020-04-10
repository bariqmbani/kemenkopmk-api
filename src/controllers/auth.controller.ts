import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

import users from '../dummy/user.json'

/**
 * @todo
 * - change to async function
 * - check username from database
 * - response if user not found
 * - response for wrong credential
 * - get jwt secret from .env (OK)
 * - change payload
 */
const login: FnController = (req, res) => {
	const { username, password } = req.body

	if (!username || !password) {
		return res.status(400).json({
			status: 'error',
			message: 'Data tidak lengkap',
		})
	}

	const { User } = users

	const user = User.filter((user) => user.username === username)

	if (user.length > 0) {
		const match = bcrypt.compareSync(password, user[0].password)

		if (match) {
			const payload: Object = user[0]

			return res.status(200).json({
				status: 'success',
				message: 'Login berhasil',
				token: jwt.sign(payload, process.env.JWT_SECRET as string, {
					expiresIn: '24h',
				}),
			})
		}
	}

	return res.status(400).json({
		status: 'error',
		message: 'Username atau password salah',
	})
}

const checkToken: FnController = (req, res) => {
	return res.status(200).json({
		status: 'success',
		message: 'Token valid',
		user: req.user,
	})
}

export { login, checkToken }
