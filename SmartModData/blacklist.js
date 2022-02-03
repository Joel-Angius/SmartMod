const mongosse = require('mongoose')

let Schema = new mongosse.Schema({
    id : String
})

module.exports = mongosse.model('SmartModerationBlacklists', Schema)