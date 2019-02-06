module.exports = (req, res, next) => {  
    
  if (req.body.status === 'admin'){
    next();
  } else {
    return res.status(401).json({
      message: 'You are not ADMIN'
    })
  }    
     
}