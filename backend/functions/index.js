const functions = require("firebase-functions");
var admin = require("firebase-admin");
var serviceAccount = require("./serviceAcc.json");
var http = require("http");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://fon-hakaton21.firebaseio.com",
});
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.pushNotif = functions.https.onRequest((req, res) => {
  var registrationToken =
    "c-RNLLbmXVBw-vyoKqUyL1:APA91bED2x5HINK312kqYj34T6YpUGGAfv29C3F2RnHo3o-l5ASb76tD3vPnvFbDyG8EsryvWuYVqAgdWIiDBlk4n0Ugp682BqgoKMDGsARXvfJKxcdYx34f8jSnlQkeZiJUd6FF4Wpm";

  var message = {
    data: {
      score: "850",
      time: "2:45",
    },
    token: registrationToken,
  };

  // Send a message to the device corresponding to the provided
  // registration token.
  admin
    .messaging()
    .send(message)
    .then((response) => {
      // Response is a message ID string.
      console.log("Successfully sent message:", response);
      res.send("Hello from Firebase!");
    })
    .catch((error) => {
      console.log("Error sending message:", error);
    });
});

async function fetchByMunicipality(req, res) {
  try {
    const usersSnap = await db
      .collection("users")
      .where("municipalityID", "==", req.body.municipalityID)
      .get();
    const users = usersSnap.map((doc) => ({ ...doc.data(), id: doc.id }));
  } catch (error) {
    console.log(error);
  }
}

exports.createAdmin = functions.https.onRequest(async (req, res) => {
  try {
    const user = await admin.auth().createUser({
      email: req.body.email,
      phoneNumber: req.body.phoneNumber,
      password: req.body.password,
      displayName: req.body.name,
      disabled: false,
    });

    await admin.auth().setCustomUserClaims(user.uid, { admin: true });
    res.send(req.body);
  } catch (error) {
    res.send(error);
  }
});

exports.updateMunicipalities = functions.https.onRequest(async (req, res) => {
  try {
    http
      .get(
        "http://opendata.stat.gov.rs/data/WcfJsonRestService.Service1.svc/dataset/SIFOPS/2/json",
        (res) => {
          const { statusCode } = res;
          const contentType = res.headers["content-type"];

          let error;
          // Any 2xx status code signals a successful response but
          // here we're only checking for 200.
          if (statusCode !== 200) {
            error = new Error(
              "Request Failed.\n" + `Status Code: ${statusCode}`
            );
          } else if (!/^application\/json/.test(contentType)) {
            error = new Error(
              "Invalid content-type.\n" +
                `Expected application/json but received ${contentType}`
            );
          }
          if (error) {
            console.error(error.message);
            throw error;
          }

          res.setEncoding("utf8");
          let rawData = "";
          res.on("data", (chunk) => {
            rawData += chunk;
          });
          res.on("end", async () => {
            try {
              const municipalities = JSON.parse(rawData);
              let i = 0;
              for (let m of municipalities) {
                console.log(i, municipalities.length);
                await admin.firestore().doc(`municipalities/${m.MBOPS}`).set(m);
                i++;
              }
              res.send(req.body);
            } catch (e) {
              throw e;
            }
          });
        }
      )
      .on("error", (e) => {
        console.error(`Got error: ${e.message}`);
        throw e;
      });
  } catch (error) {
    res.send(error);
  }
});
