const functions = require('firebase-functions');
const OpenTok = require('opentok');

const apiKey = '46328822';
const apiSecret = '1031919db407a48f966d8a2e55bc09dce0f43d95';
const opentok = new OpenTok(apiKey, apiSecret);

exports.opentokSessionId = functions.https.onRequest((request, response) => {
  opentok.createSession({mediaMode:"routed"}, function(err, session) {
      if (err) {
        console.log(err);
        return;
      }

      //get token publisher
      var tokenPub = session.generateToken({
        role :                   'publisher',
        expireTime :             (new Date().getTime() / 1000)+(7 * 24 * 60 * 60), // in one week
        data :                   'name=SPR',
        initialLayoutClassList : ['focus']
      });

      //get token subscriber
      var tokenSub = session.generateToken({
        role :                   'subscriber',
        expireTime :             (new Date().getTime() / 1000)+(7 * 24 * 60 * 60), // in one week
        data :                   'name=SPR',
        initialLayoutClassList : ['focus']
      });
      
            //get token subscriber
      var tokenMod = session.generateToken({
        role :                   'moderator',
        expireTime :             (new Date().getTime() / 1000)+(7 * 24 * 60 * 60), // in one week
        data :                   'name=SPR',
        initialLayoutClassList : ['focus']
      });

      var data = {
        "apiKey": apiKey,
        "sessionId": session.sessionId,
        "tokenPublisher": tokenPub,
        "tokenSubscriber": tokenSub,
        "tokenModerator": tokenMod

      };

      console.log("data sent to http://localhost:%s", 5000)
      response.setHeader('content-type', 'application/json');
      response.end(JSON.stringify(data));
    })
  });
