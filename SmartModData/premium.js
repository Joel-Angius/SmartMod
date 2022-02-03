const m = require('mongoose');

module.exports = m.model(
    'SmartModerationPremium', 
    new m.Schema({
        User: String,
        PremiumUserName: String,
        GrantedFromID: String,
    })
)