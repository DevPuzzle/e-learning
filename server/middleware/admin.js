module.exports = (req, res, next) => {  
    
  if (req.body.username === 'admin' && req.body.email === 'admin@gmail.com'){
    next();
  } else {
    return res.status(401).json({
      message: 'You are not ADMIN'
    })
  }    
     
}