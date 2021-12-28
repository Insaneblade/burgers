import Rebase from "re-base";
import firebase from "firebase/app";
require('firebase/database')

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyCHIK9KjCqlLQ-deEdeLejqDpJmpmyExd4",
    authDomain: "very-hot-burgers-997aa.firebaseapp.com",
    databaseURL: "https://very-hot-burgers-997aa-default-rtdb.firebaseio.com",
})

const base = Rebase.createClass(firebaseApp.database());

export {firebaseApp};
export default base;