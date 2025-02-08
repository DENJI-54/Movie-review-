
const basicAuth = (req,res,next) =>{
  const {username, password} =req.body
  console.log('from auth js')
  if (!username || !password) {
   return res.status(400).json({msg : "Username and password are required" });
    }  
  next()  
}


export default basicAuth;