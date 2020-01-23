const functions = require("firebase-functions");

const admin = require("firebase-admin");
admin.initializeApp();

exports.addRole = functions.https.onCall((data, context) => {
  // get user and add custom claim (volunteer)

  return admin
    .auth()
    .getUserByEmail(data.email)
    .then(user => {
      return admin.auth().setCustomUserClaims(user.uid, {
        role: data.role
      });
    })
    .then(() => {
      return {
        message: `Success! ${data.email} has been registered!`
      };
    })
    .catch(error => {
      return error;
    });
});
