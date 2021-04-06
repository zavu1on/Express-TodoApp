export default function (req, res, next) {
  if (req.method === 'OPTIONS') {
    return next()
  }

  if (req.session.auth) {
    return next()
  }

  return res.redirect('/')
}