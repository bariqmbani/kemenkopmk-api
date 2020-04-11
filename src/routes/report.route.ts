import { Router } from 'express'

import {
	getReports,
	downloadReport,
	uploadReport,
	updateReport,
	deleteReport,
} from '../controllers/report.controller'

import auth from '../middlewares/auth.middleware'

const router = Router()

/**
 * @route         GET /api/report
 * @description   View all reports
 * @access        Private (Super and Admin can only view report with same instance_id)
 */
router.get('/', auth, getReports)

/**
 * @route         GET /api/report/:id
 * @description   Download file report
 * @access        Private (can only download report with same instance_id)
 */
router.get('/:id', auth, downloadReport)

/**
 * @route         POST /api/report/
 * @description   Upload file report
 * @access        Private
 */
router.post('/', auth, uploadReport)

/**
 * @route         PUT /api/report/:id
 * @description   Update file report
 * @access        Private (can only update report with same instance_id)
 */
router.put('/:id', auth, updateReport)

/**
 * @route         DELETE /api/report/:id
 * @description   Delete file report
 * @access        Private (can only delete report with same instance_id)
 */
router.delete('/:id', auth, deleteReport)

export default router
