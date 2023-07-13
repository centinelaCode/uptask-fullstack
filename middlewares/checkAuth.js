
const checkAuth = (req, res, next) => {

   console.log('Desde chekAuth')
   next()
}

export default checkAuth;