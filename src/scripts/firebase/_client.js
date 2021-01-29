import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/storage';

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
  measurementId: process.env.FIREBASE_MEASUREMENT_ID
}

export default function FirebaseClient() {
  firebase.initializeApp(firebaseConfig);
  anonymousLogin();
  listenForUser();

  this.uploader = uploader;
  this.loadGallery = loadGallery;
}

function anonymousLogin() {
  firebase.auth().signInAnonymously()
    .then(() => {
      console.log('anonymous user signed in ok')
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(`Error ${errorCode}:\n${errorMessage}`)
    })
}

function listenForUser() {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      const uid = user.uid;
      window.user = user;
    } else {
      window.user = null;
    }
  })
}

function uploader(e) {
  const file = e.target.files[0];
  const storageRef = firebase.storage().ref(`publicAssets/tests/${file.name}`);
  const task = storageRef.put(file);
  // update progress bar
  task.on('state_changed',
    function progress(snapshot) {
      const percent = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log(percent)
    },

    function error(err) {
      console.error(err)
    },

    function complete() {
      console.log('file uploaded!')
    }
  )
}

function loadGallery({ directoryName, domCallback, refRoot='publicAssets' }) {
  const storageRef = firebase.storage().ref(refRoot)
  const listRef = storageRef.child(directoryName)
  listRef.list()
    .then((res) => {
      res.items.forEach((itemRef) => {
        itemRef.getDownloadURL().then((url) => {
          console.log(url)
          domCallback(url) 
        })
      })
    }).catch((error) => console.error(error))
}
