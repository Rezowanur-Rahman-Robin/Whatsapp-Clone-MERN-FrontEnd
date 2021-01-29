import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyBpXmccclF4SDLwleIOZHYd4oEHMsZv75Y",
    authDomain: "whatsapp-mern-6d28f.firebaseapp.com",
    projectId: "whatsapp-mern-6d28f",
    storageBucket: "whatsapp-mern-6d28f.appspot.com",
    messagingSenderId: "657228565298",
    appId: "1:657228565298:web:0291505ec1f82be40a252b"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig);

  const db = firebaseApp.firestore();
  const auth = firebase.auth();
  const provider = new firebase.auth.GoogleAuthProvider();

  export {auth,provider} ;
  export default db;