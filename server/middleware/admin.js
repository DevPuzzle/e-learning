module.exports = (req, res, next) => {  
    
<<<<<<< HEAD
  if (req.body.email === 'admin@gmail.com'){
=======
  if (req.body.status === 'admin'){
>>>>>>> 0a1dd4adc91713b7242a0c3cedfc389c66ca1500
    next();
  } else {
    return res.status(401).json({
      message: 'You are not ADMIN'
    })
  }    
     
}