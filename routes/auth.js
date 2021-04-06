import { Router } from 'express'
import UserModel from '../models/User.js'
const router = Router()


router.get('/login', (req, res) => {
  res.render('login', {
    title: 'Login',
    isAuth: null,
    active: 'login'
  })
})

router.post('/login', async (req, res) => {
  const {email, password} = req.body
  const user = await UserModel.findOne({email, password})
  if (!user) {
    res.redirect('/auth/login')
  } else {
    req.session.auth = user.id
    res.redirect('/')
  }
})

router.get('/logout', (req, res) => {
  delete req.session.auth
  res.redirect('/')
})

router.get('/signup', (req, res) => {
  res.render('signup', {
    title: 'Sign Up',
    isAuth: null,
    active: 'signup'
  })
})

router.post('/signup', async (req, res) => {
  const {email, password, re_password} = req.body

  if (password !== re_password || !!await UserModel.findOne({email})) {
    return res.redirect('/auth/signup')
  }

  const user = new UserModel({email, password})
  await user.save()
  req.session.auth = user.id
  res.redirect('/')
})


export default router