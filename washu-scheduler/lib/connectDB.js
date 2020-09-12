// import admin from "firebase-admin";
// import serviceAccount from "../washu-scrape-firebase-adminsdk-3gwdq-c0bc283f47.json";

// export function loadDB() {
//   admin.initializeApp({
//     credential: admin.credential.cert(serviceAccount),
//     databaseURL: "https://washu-scraper.firebaseio.com",
//   });
//   var db = admin.database();
//   return db;
// }

// import firebase from "firebase-admin";
// const serviceAccount = require("../washu-scrape-firebase-adminsdk-3gwdq-c0bc283f47.json");

// if (!firebase.apps.length) {
//   firebase.initializeApp(
//     {
//       credential: firebase.credential.cert(serviceAccount),
//       databaseURL: "https://washu-scraper.firebaseio.com",
//     },
//     "DB"
//   );
// }

// export default firebase;

// import firebase from "firebase/app";

// const firebaseConfig = {
//   apiKey: "AIzaSyCzsc6Eaq3m2IE1nAf8x5KkHGnx4X-DA6k",
//   databaseURL: "https://washu-scrape.firebaseio.com/",
//   projectId: "washu-scrape",
// };

// if (!firebase.apps.length) {
//   firebase.initializeApp(config);
// }

// export default { firebase };

// export default function connectDB() {
//   const firebaseConfig = {
//     apiKey: "AIzaSyCzsc6Eaq3m2IE1nAf8x5KkHGnx4X-DA6k",
//     // authDomain: process.env.authDomain,
//     databaseURL: "https://washu-scrape.firebaseio.com/",
//     projectId: "washu-scrape",
//     // storageBucket: process.env.storageBucket,
//     // messagingSenderId: process.env.messagingSenderId,
//     // appId: process.env.appId,
//   };

//   if (!firebase.apps.length) {
//     firebase.initializeApp(firebaseConfig);
//   }

//   return firebase;
// }
