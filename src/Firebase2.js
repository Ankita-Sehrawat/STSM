
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyBs2Qq2Z0yFGSAI3wSzeQI3xg45jU1oduw",
    authDomain: "dashboarddata-9514f.firebaseapp.com",
    projectId: "dashboarddata-9514f",
    storageBucket: "dashboarddata-9514f.appspot.com",
    messagingSenderId: "428615448325",
    appId: "1:428615448325:web:a5e45ef12f0f84438ee96c",
    measurementId: "G-4LNMMTE7LG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);
export const storage = getStorage(app);








// // firebaseConfig.js
// import { initializeApp } from "firebase/app";
// import { getFirestore } from "firebase/firestore";

// const firebaseConfig = {
//     apiKey: "AIzaSyBs2Qq2Z0yFGSAI3wSzeQI3xg45jU1oduw",
//     authDomain: "dashboarddata-9514f.firebaseapp.com",
//     projectId: "dashboarddata-9514f",
//     storageBucket: "dashboarddata-9514f.appspot.com",
//     messagingSenderId: "428615448325",
//     appId: "1:428615448325:web:a5e45ef12f0f84438ee96c",
//     measurementId: "G-4LNMMTE7LG"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// export const db = getFirestore(app);
