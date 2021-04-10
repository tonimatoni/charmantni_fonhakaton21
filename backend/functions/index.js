const functions = require("firebase-functions");
var admin = require('firebase-admin');
var serviceAccount = require("./serviceAcc.json");



admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://fon-hakaton21.firebaseio.com'
});
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.pushNotif = functions.https.onRequest((req, res) => {
    var registrationToken = 'c-RNLLbmXVBw-vyoKqUyL1:APA91bED2x5HINK312kqYj34T6YpUGGAfv29C3F2RnHo3o-l5ASb76tD3vPnvFbDyG8EsryvWuYVqAgdWIiDBlk4n0Ugp682BqgoKMDGsARXvfJKxcdYx34f8jSnlQkeZiJUd6FF4Wpm';

    var message = {
        data: {
            score: '850',
            time: '2:45'
        },
        token: registrationToken
    };

    // Send a message to the device corresponding to the provided
    // registration token.
    admin.messaging().send(message)
        .then((response) => {
            // Response is a message ID string.
            console.log('Successfully sent message:', response);
            res.send("Hello from Firebase!");
        })
        .catch((error) => {
            console.log('Error sending message:', error);
        });
});

async function fetchByMunicipality(req, res) {
    try {
        const usersSnap = await db.collection('users').where('municipalityID', '==', req.body.municipalityID).get();
        const users = usersSnap.map(doc => ({ ...doc.data(), id: doc.id }))

    } catch (error) {
        console.log(error);
    }
}


exports.createAdmin = functions.https.onRequest(async (req, res) => {
    try {
        const user = await admin
            .auth()
            .createUser({
                email: req.body.email,
                phoneNumber: req.body.phoneNumber,
                password: req.body.password,
                displayName: req.body.name,
                disabled: false,
            })

        await admin
            .auth()
            .setCustomUserClaims(user.uid, { admin: true })
        res.send(req.body)
    } catch (error) {
        res.send(error)
    }
});

