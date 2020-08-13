import firebase from 'firebase';

const config = {
  apiKey: "AIzaSyCQKzJH40-IopCp3Hd8ELtEFhwNh17KF3E",
  authDomain: "react-game-5b6af.firebaseapp.com",
  databaseURL: "https://react-game-5b6af.firebaseio.com",
  projectId: "react-game-5b6af",
  storageBucket: "react-game-5b6af.appspot.com",
  messagingSenderId: "126846160427",
  appId: "1:126846160427:web:477c197d277b765fd5246e"
};

firebase.initializeApp(config);

export default firebase;
