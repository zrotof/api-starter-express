const router = require('express').Router();
const uploadOptions = require('../../middlewares/multer-config')

const { getOptionList, createOption } = require('../../controllers/options/options.controller')

/**
 * @openapi
 * '/flights/popular':
 *  get:
 *      summary: Get all popular flights
 *      description: Retrieve a list of common flights from the database.
 *      responses:
 *          200:
 *              description: Users Fetched Successfully.
 */
router.get('', getOptionList);

router.post('', createOption);

module.exports = router;