const bcrypt = require('bcrypt')

const db = require('../models/')

exports.getLogin = async (req, res, next) => {
  try {
    res.render('login', { pageTitle: 'Login' })
  } catch (err) {
    console.error(err)
  }
}

exports.postLogin = async (req, res, next) => {
  try {
    const userInfo = await db.User.findOne({
      where: { username: req.body.user }
    })
    if (await bcrypt.compare(req.body.password, userInfo.password)) {
      res.redirect('/')
    } else {
      res.redirect('/login')
    }
  } catch (err) {
    console.log(err)
  }
}

exports.getSignUp = async (req, res, next) => {
  try {
    res.render('sign-up', { pageTitle: 'Sign Up' })
  } catch (err) {
    console.log(err)
  }
}

exports.postSignUp = async (req, res, next) => {
  try {
    // const userExist = await db.User.findOne({
    //   where: {username: user}
    // })
    // if(userExist){
    //   res.redirect('/login')
    // }
    const hashedPassword = await bcrypt.hash(req.body.password, 10)
    const createUser = await db.User.create({ username: req.body.user, password: hashedPassword })
    res.redirect('/login')
  } catch (err) {
    console.error(err)
  }
}

exports.getAllUsers = async (req, res, next) => {
  try {
    const allUsers = await db.User.findAll()
    res.json(allUsers)
  } catch (err) {
    console.error(err)
  }
}
