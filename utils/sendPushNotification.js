const { default: axios } = require("axios")

const sendPushNotification = async (payload) => {
  var data = JSON.stringify({
    "to": "/topics/app",
    "notification": {
      "title": payload.title,
      "body": payload.text,
      "mutable_content": true,
      "sound": "Tri-tone"
    },
    "data": {
      "url": payload.image,
      "dl": "<deeplink action on tap of notification>"
    }
  });
  
  var config = {
    method: 'post',
    url: 'https://fcm.googleapis.com/fcm/send',
    headers: { 
      'Authorization': 'key=AAAA-VNtqso:APA91bFeYleVbX4x5MCG6UtIqzb8qiG5_YUm7yVYcckogIVf-UqSJfNyIUman9njcTNibMD9TzGTN7hBq3xU6aEssfULBKwtJ47IJ29M_Q9vBgps7aN5bzAcAcNojvHZHUisbnZAFkeF', 
      'Content-Type': 'application/json', 
      'project_id': '1070846552778'
    },
    data : data
  };
  
  await axios(config)
  .then(function (response) {
    console.log(JSON.stringify(response.data));
  })
  .catch(function (error) {
    console.log(error);
  });
  }

  module.exports.sendPushNotification = sendPushNotification;