
module.exports = function(ziggy, settings) {

  var wolfram = require('wolfram').createClient(settings.apiKey)

  ziggy.on('message', function (user, channel, message) {
    if(message.slice(0, 4) === '!wf ') {

      wolfram.query(message.slice(4), function (err, result) {
        if(result[1]) {
          var output = err 
            ||result[1].subpods[0].value 
            || result[1].subpods[0].image
            || JSON.stringify(result[1].subpods[0])
            || 'Try again.'
        }

        ziggy.say(channel, output.split('\n').slice(0, 5).map(function(ln){ return user.nick + ': ' + ln }).join('\n') )

      })
    }
  })
}