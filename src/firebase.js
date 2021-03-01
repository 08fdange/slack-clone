import firebase from 'firebase'

const firebaseConfig = {
    apiKey: "AIzaSyDIPfXXWWkMBu7WFszauoTRewnbARTQ_RU",
    authDomain: "slack-clone-fd-edition.firebaseapp.com",
    projectId: "slack-clone-fd-edition",
    storageBucket: "slack-clone-fd-edition.appspot.com",
    messagingSenderId: "1001176926531",
    appId: "1:1001176926531:web:9336dbf220c2d7583987f6"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export {auth, provider}
export default db;

