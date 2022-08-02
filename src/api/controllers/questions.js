const db = require('../models/')

exports.tempHome = (req, res, next) => {
  res.render('index', { pageTitle: 'Home' })
}

exports.getAllQuestions = async (req, res, next) => {
  try {
    const allQuestions = await db.Questions.findAll()
    const allChoices = await db.Choices.findAll()

    res.render('all-questions', { questions: allQuestions, choices: allChoices, pageTitle: 'All Questions' })
  } catch (err) {
    console.error(err)
  }
}

exports.getAddQuestion = async (req, res, next) => {
  res.render('add-question', { pageTitle: 'Add Question' })
}

exports.postAddQuestion = async (req, res, next) => {
  const {
    question, topic, section,
    choiceOne, correctOne, choiceTwo, correctTwo,
    choiceThree, correctThree, choiceFour, correctFour
  } = req.body

  try {
    const newQuestion = await db.Questions.create({ question, topic, section })
    const choices = await db.Choices.bulkCreate([
      { choice: choiceOne, correct: correctOne, questionId: newQuestion.id },
      { choice: choiceTwo, correct: correctTwo, questionId: newQuestion.id },
      { choice: choiceThree, correct: correctThree, questionId: newQuestion.id },
      { choice: choiceFour, correct: correctFour, questionId: newQuestion.id }
    ])
    res.redirect('/all-questions')
  } catch (err) {
    console.error(err)
  }
}

exports.getDeleteQuestion = async (req, res, next) => {
  try {
    const questionToDelete = await db.Questions.findByPk(req.params.id)
    const choicesToDelete = await db.Choices.findAll({
      where: {
        questionId: questionToDelete.id
      }
    })
    res.render('delete-question', { question: questionToDelete, choices: choicesToDelete, pageTitle: 'Delete Question' })
  } catch (err) {
    console.error(err)
  }
}

exports.postDeleteQuestion = async (req, res, next) => {
  try {
    const questionToDelete = await db.Questions.findByPk(req.params.id)
    const choicesToDelete = await db.Choices.findAll({
      where: {
        questionId: questionToDelete.id
      }
    })
    choicesToDelete.forEach(async (choice) => {
      await choice.destroy()
    })
    await questionToDelete.destroy()
    res.redirect('/all-questions')
  } catch (err) {
    console.error(err)
  }
}

exports.getUpdateQuestion = async (req, res, next) => {
  try {
    const questionToUpdate = await db.Questions.findByPk(req.params.id)
    const choicesToUpdate = await db.Choices.findAll({
      where: {
        questionId: questionToUpdate.id
      }
    })
    res.render('update-question', { question: questionToUpdate, choices: choicesToUpdate, pageTitle: 'Update Question' })
  } catch (err) {
    console.error(err)
  }
}

exports.postUpdateQuestion = async (req, res, next) => {
  const {
    question, topic, section,
    choice0, correct0, choiceId0, choice1, correct1, choiceId1,
    choice2, correct2, choiceId2, choice3, correct3, choiceId3
  } = req.body
  const choices = [[choice0, correct0, choiceId0], [choice1, correct1, choiceId1],
    [choice2, correct2, choiceId2], [choice3, correct3, choiceId3]]
  try {
    const questionToUpdate = await db.Questions.findByPk(req.params.id)
    questionToUpdate.set({ question, topic, section })
    await questionToUpdate.save()
    for (let i = 0; i < choices.length; i++) {
      const choiceToUpdate = await db.Choices.findByPk(choices[i][2])
      choiceToUpdate.set({ choice: choices[i][0], correct: choices[i][1] })
      choiceToUpdate.save()
    }
    res.redirect('/all-questions')
  } catch (err) {
    console.error(err)
  }
}

exports.getBySection = async (req, res, next) => {
  const { section } = req.params
  try {
    const sectionQuestions = await db.Questions.findAll({
      where: { section }
    })
    const choices = await db.Choices.findAll()
    res.render('section-questions', { questions: sectionQuestions, choices, pageTitle: `Section ${section}` })
  } catch (err) {
    console.error(err)
  }
}

exports.getAllChoices = async (req, res, next) => {
  try {
    const allChoices = await db.Choices.findAll()
    res.json(allChoices)
  } catch (err) {
    console.error(err)
  }
}
