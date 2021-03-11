const router = require('express').Router()
// protect api
router.get('/', async(req, res, next) => {
      try {
            
      } catch (error) {
            next(error)
      }
})


module.exports = router