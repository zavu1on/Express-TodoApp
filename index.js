import express from 'express'
import mongoose from 'mongoose'
import path from 'path'
import session from 'express-session'
import todoRouter from './routes/todos.js'
import authRouter from './routes/auth.js'


const app = express()


app.use(express.urlencoded({extended: false}))
app.use(session({
  secret: 'super secret key',
  key: 'sid',
  cookie: {
    path: '/',
    httpOnly: true,
    maxAge: null
  }
}))
app.use(todoRouter)
app.use('/auth', authRouter)
app.use(express.static(path.join(path.resolve(), 'static')))

app.set('view engine', 'ejs')
app.set('views', path.join(path.resolve(), 'views'))


const start = async () => {
  try {
    await mongoose.connect('mongodb+srv://Mikhail:1q2w3e4r@cluster0.aqr8q.mongodb.net/todos?retryWrites=true&w=majority', {
      useNewUrlParser: true,
      useFindAndModify: false
    })
    app.listen(3000, () => console.log('Server has been started...'))
  } catch (e) {
    console.error(e)
  }
}


start()