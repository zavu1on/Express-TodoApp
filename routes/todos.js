import { Router } from 'express'
import TodoModel from '../models/Todo.js'
import auth from '../middlewares/auth.js'
const router = Router()


router.get('/', async (req, res) => {
  const todos = await TodoModel.find({owner: req.session.auth})
  res.render('index', {
    title: 'Todos Page',
    active: 'home',
    todos,
    isAuth: !!req.session.auth
  })
})

router.get('/create', [auth], (req, res) => {
  res.render('create', {
    title: 'Create Page',
    active: 'create',
    isAuth: !!req.session.auth
  })
})

router.post('/create', [auth], async (req, res) => {
  const todo = await TodoModel.find({owner: req.session.auth})
  if (todo.title === req.body.title) return res.redirect('/')

  const newTodo = new TodoModel({owner: req.session.auth, ...req.body})
  await newTodo.save()
  res.redirect('/')
})

router.post('/completed', [auth], async (req, res) => {
  const todo = await TodoModel.findById(req.body.id)
  if (todo.owner.toString() !== req.session.auth) return res.redirect('/')
  todo.completed = !!req.body.completed
  await todo.save()
  res.redirect('/')
})

router.post('/delete', [auth], async (req, res) => {
  const todo = await TodoModel.findById(req.body.id)
  if (todo.owner.toString() !== req.session.auth) return res.redirect('/')
  await todo.remove()
  res.redirect('/')
})

export default router