module.exports = (req, res, next) => {  
  
  console.log('ROLE', req.userData.role)

  if (req.userData.role === 'teacher'){
    next();
  } else {
    return res.status(401).json({
      message: 'You are not TEACHER'
    })
  }  
     
}