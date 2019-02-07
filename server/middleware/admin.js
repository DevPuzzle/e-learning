module.exports = (req, res, next) => {  
  
  console.log('STATUS', req.userData.status)

  if (req.userData.status === 'admin'){
    next();
  } else {
    return res.status(401).json({
      message: 'You are not ADMIN'
    })
  }  
     
}
