const functions = require("firebase-functions");

const admin = require("firebase-admin");
admin.initializeApp();

exports.addRole = functions.https.onCall((data, context) => {
  // get user and add custom claim (volunteer)

  return admin
    .auth()
    .getUserByEmail(data.email)
    .then(user => {
      if (data.role === "T") {
        return admin.auth().setCustomUserClaims(user.uid, {
          tourist: true
        });
      } else {
        return admin.auth().setCustomUserClaims(user.uid, {
          tourist: false
        });
      }
    })
    .then(() => {
      return {
        message: `Successfully registered!`
      };
    })
    .catch(error => {
      return error;
    });
});
