import firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyD3nBNCiYGOnsGwueH8z9J8KQFyxWDM7zA",
  authDomain: "liesml-sneakers.firebaseapp.com",
  databaseURL: "https://liesml-sneakers-default-rtdb.firebaseio.com",
  projectId: "liesml-sneakers",
  storageBucket: "liesml-sneakers.appspot.com",
  messagingSenderId: "1033027144791",
  appId: "1:1033027144791:web:dfb9aeb66d917256892712",
  measurementId: "G-FRYCRVKWWB"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();

export { db };


