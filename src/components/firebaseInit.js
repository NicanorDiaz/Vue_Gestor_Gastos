import firebase from 'firebase/app';
import 'firebase/firestore';
import firebaseConfig from './firebaseConfig';
const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const fieldValue = firebase.firestore.FieldValue;


export{db, fieldValue}