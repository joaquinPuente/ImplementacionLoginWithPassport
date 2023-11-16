import { Router } from 'express';

const router = Router();

const privateRouter = (req,res,next)=>{
  if(!req.session.user){
    return res.redirect('/login')
  }
  next();
}

const publicRouter = (req,res,next)=>{
  if(req.session.user){
    return res.redirect('/profile')
  }
  next();
}

router.get('/profile', privateRouter ,(req, res) => {
  res.render('/api/products', {user: req.session.user})
});

router.get('/login', publicRouter, (req, res) => {
  res.render('login')
});

router.get('/register', publicRouter, (req, res) => {
  res.render('register')
});

export default router;