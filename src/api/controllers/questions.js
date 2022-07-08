const db = require('../models/')

exports.tempHome = (req, res, next) => {
  res.render('index', {pageTitle: 'Home'})
}

exports.getAllQuestions = async (req, res, next) => {
  try {
    const allQuestions = await db.Questions.findAll()

    res.render('all-questions', {questions: allQuestions, pageTitle: 'All Questions'})
  }catch(err){
    console.error(err)
  }
}

exports.getAddQuestion = async (req, res, next) => {
  res.render('add-question', {pageTitle: 'Add Question'})
}

exports.postAddQuestion = async (req, res, next) => {
  const {question, topic, section} = req.body

  try {
    const newQuestion = await db.Questions.create({question, topic, section})
    res.redirect('/all-questions')
  }catch(err){
    console.error(err)
  }
}

exports.getDeleteQuestion = async (req, res, next) => {
  try {
    const questionToDelete = await db.Questions.findByPk(req.params.id)
    res.render('delete-question', {question: questionToDelete, pageTitle: 'Delete Question'})
  }catch(err){
    console.error(err)
  }
}

exports.postDeleteQuestion = async (req, res, next) => {
  try {
    const questionToDelete = await db.Questions.findByPk(req.params.id)
    await questionToDelete.destroy()
    res.redirect('/all-questions')
    }catch(err){
    console.error(err)
  }
}

exports.getUpdateQuestion = async (req, res, next) => {
  try {
    const questionToUpdate = await db.Questions.findByPk(req.params.id)
    res.render('update-question', {question: questionToUpdate, pageTitle: 'Update Question'})
  }catch(err){
    console.error(err)
  }
}

exports.postUpdateQuestion = async (req, res, next) => {
  const {question, topic, section} = req.body
  try {
    const questionToUpdate = await db.Questions.findByPk(req.params.id)
    questionToUpdate.set({question, topic, section})
    await questionToUpdate.save()
    res.redirect('/all-questions')
  }catch(err){
    console.error(err)
  }
}
