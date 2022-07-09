const express = require('express')

const questionController = require('../controllers/questions')

const router = express.Router()

router.get('/', questionController.tempHome)
router.get('/add-question', questionController.getAddQuestion)
router.get('/all-questions', questionController.getAllQuestions)
router.get('/delete-question/:id', questionController.getDeleteQuestion)
router.get('/update-question/:id', questionController.getUpdateQuestion)
router.get('/all-choices', questionController.getAllChoices)
router.get('/section/:section', questionController.getBySection)

router.post('/add-question', questionController.postAddQuestion)
router.post('/delete-question/:id', questionController.postDeleteQuestion)
router.post('/update-question/:id', questionController.postUpdateQuestion)


module.exports = router