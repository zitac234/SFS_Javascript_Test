const router = require('express').Router()
const axios = require('axios')
// protect api
router.get('/', async(req, res, next) => {
      try {
            let {data} = await axios.get()
      } catch (error) {
            next(error)
      }
})


module.exports = router