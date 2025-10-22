export default (err, req , res , next) =>{
    res.status(500).json({mgs: `Error ${err.message}`});
    next()
}