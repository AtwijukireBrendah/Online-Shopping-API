//check for thr request headers
//if the authorization header exists
//   check for token in header
//else:
//   return response saying authorization header missing

const JWT = require('jsonwebtoken');

    const authenticate = (req,res,next)=>{
    const authHeader = req.headers['Authorization'];
    if(authHeader){
        //Bearer.vhskxlxlxkl
        if(authHeader.startsWith('Bearer')){
            const token = authHeader.split(' ')[1];
            JWT.verify(token,'open123',(err,decoded)=>{
                if(err){
                    res.status(400).json('Token is invalid');
                }else{
                    console.log(decoded);
                    next();
                }
            })
        }else{
            res.status(400).json('Authorization header is malformed.');
        }
        res.status(400).json('Authorization header is missing.');
    }

}



module.exports = authenticate;