import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';
import {
  getGalleryImageRecords,
  getVesselIconRecord,
  getImageById,
  upvoteRecord,
  createImageRecord
} from './_firestoreQueries';

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

  this._db = firebase.firestore();
  this._createImageRecord = createImageRecord;
  this._getGalleryImageRecords = getGalleryImageRecords;
  this._getImageById = getImageById;
  this._getVesselIconRecord = getVesselIconRecord;
  this.uploader = uploader;
  this.loadImagesFromDB = loadImagesFromDB;
  this.loadVesselIcon = loadVesselIcon;
  this.upvoteImage = upvoteImage;
}

function anonymousLogin() {
  firebase.auth().signInAnonymously()
    .then(() => {
      //console.log('anonymous user signed in ok')
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

function uploader({ newStorageRecord, newDbRecord }) {
  const { storagePath, userFile } = newStorageRecord;
  const storageRef = firebase.storage().ref(storagePath)
  const task = storageRef.put(userFile);

  task.on('state_changed',
    (snapshot) => {
      const percent = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log(percent)
    },

    (err) => {
      console.error(err)
    },

    () => {
      console.log('file uploaded!')
      task.snapshot.ref.getMetadata().then(({ timeCreated }) => {
        newDbRecord.dbFields.timeCreated = timeCreated;
        newDbRecord.dbFields.uploadedBy = window.user.uid;
        this._createImageRecord(newDbRecord)
       })
    }
  )
}

async function loadImagesFromDB({ gallery, domCallback }) {
  const imageRecords = await this._getGalleryImageRecords({ gallery })
  for (const [imgId, imgRecord] of Object.entries(imageRecords)) {
    loadImageElement({ imgId, imgRecord, domCallback })
  }

  function loadImageElement({ imgId, imgRecord, domCallback }) {
    const { imgPath, upvotes } = imgRecord;
    const storageRef = firebase.storage().ref(imgPath);
    storageRef.getDownloadURL()
      .then((url) => domCallback({ imgId, url, upvotes }))
      .catch((error) => console.log(`file does not exist at ${imgPath}`));
    }
}

function upvoteImage({ gallery, id }) {
  this._getImageById({ gallery, id })
    .then(({ docRef, imgData }) => upvoteRecord(docRef, imgData));
}

function loadVesselIcon(vessel, domCallback=null) {
  this._getVesselIconRecord({ vessel })
    .then((iconPath) => {
      const storageRef = firebase.storage().ref(iconPath);
      storageRef.getDownloadURL()
        .then((url) => domCallback(url))
    });
}
