import firebase from 'firebase/app'
import 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyAzHZjfcoyFHNtts6p62zH0CUwu232HZPA",
  authDomain: "hackaton8-71a11.firebaseapp.com",
  databaseURL: "https://hackaton8-71a11.firebaseio.com",
  projectId: "hackaton8-71a11",
  storageBucket: "hackaton8-71a11.appspot.com",
  messagingSenderId: "348404511976",
  appId: "1:348404511976:web:2d34d1eaa876051682855d"
};

firebase.initializeApp(firebaseConfig)
const storage = firebase.storage()

export { storage, firebase as default }