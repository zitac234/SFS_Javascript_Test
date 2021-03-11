const router = require('express').Router()
const axios = require('axios')
// protect api
router.get('/', async(req, res, next) => {
      try {
            let {data} = await axios.get('https://raw.githubusercontent.com/StrategicFS/Recruitment/master/data.json')
            
      } catch (error) {
            next(error)
      }
})


module.exports = router