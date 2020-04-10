import { Router } from 'express'

// importing middleware
import auth from '../middlewares/auth.middleware'

// importing controller
// import {} from '../controllers/user.controller'

/**
 * @todo
 *  - Check profile
 */

const router: Router = Router()

/**
 * @route         POST /api/user
 * @description   Register user
 * @access        Private
 */

/**
 * @route         PUT /api/user/:id
 * @description   Update user data
 * @access        Private (including reset password)
 */

/**
 * @route         GET /api/user
 * @description   View all user
 * @access        Private (Owner and Super)
 */

/**
 * @route         GET /api/user/:id
 * @description   View user detail
 * @access        Private (Admin can only view their account detail, Super can only view their account detail and Admin detail)
 */

export default router
