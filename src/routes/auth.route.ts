import { Router } from 'express'

// importing middleware
import auth from '../middlewares/auth.middleware'

// importing controller
import { login, checkToken } from '../controllers/auth.controller'

const router: Router = Router()

/**
 * @route         POST /api/auth
 * @description   Authenticate user and get new token
 * @access        Public
 */
router.post('/', login)

/**
 * @route         GET /api/auth
 * @description   Check token for logged in user
 * @access        Private
 */
router.get('/', auth, checkToken)

export default router
