import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyA_vhU_bemNijqra4N-IqdkGFmvV08UXHc",
    authDomain: "psychic-fortnight.firebaseapp.com",
    projectId: "psychic-fortnight",
    storageBucket: "psychic-fortnight.appspot.com",
    messagingSenderId: "71553698503",
    appId: "1:71553698503:web:b704e2eb8461d7651e8ce2",
    measurementId: "G-E5W3YWMTMV"
  };

  try {
    firebase.initializeApp(firebaseConfig);
  } catch (err) {
    if (!/already exists/.test(err.message)) {
      console.error('Firebase initialization error', err.stack);
    }
  }

  const fire = firebase;
  export default fire;