import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';
import FirestoreQueries from './_firestoreQueries';
import UserManager from './_userManager';

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
  measurementId: process.env.FIREBASE_MEASUREMENT_ID
}

const authProviders = {
  google: firebase.auth.GoogleAuthProvider.PROVIDER_ID,
  twitter: firebase.auth.TwitterAuthProvider.PROVIDER_ID,
  facebook: firebase.auth.FacebookAuthProvider.PROVIDER_ID,
  email: firebase.auth.EmailAuthProvider.PROVIDER_ID,
}


export default function FirebaseClient() {
  firebase.initializeApp(firebaseConfig);

  const db = firebase.firestore();
  const queries = FirestoreQueries(db);
  const authenticator = firebase.auth();
  const userManager = UserManager(authenticator, authProviders);
  const loginUI = userManager.loginUI();
  const { createUserRecord, queryUserRecord, updateUserRecord } = queries;

  userManager.listenForUserChange();

  if (!authenticator.currentUser) {
    userManager.anonymousLogin();
  }

  return {
    loginUI,
    createUserRecord,
    queryUserRecord,
    updateUserRecord,
    uploadProfileImage,
    signOut: userManager.signOut,
    loadImagesFromDB: (args) => loadImagesFromDB(queries, args),
    uploader: (args) => uploader(queries, args),
    upvoteImage: (args) => upvoteImage(queries, args)
  }
}

function uploader(
  { createImageRecord },
  { storageRecord, dbRecord, progressBar, onComplete }
) {

  const { storagePath, userFile } = storageRecord;
  const storageRef = firebase.storage().ref(storagePath)
  const task = storageRef.put(userFile);

  task.on('state_changed',
    (snapshot) => {
      const percent = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      progressBar.value = percent;
    },

    (err) => {
      console.error(err)
    },

    () => {
      task.snapshot.ref.getMetadata().then(({ timeCreated }) => {
        dbRecord.dbFields.timeCreated = timeCreated;
        dbRecord.dbFields.uploadedBy = window.user.uid;
        dbRecord.arrayUnion = arrayUnion;

        createImageRecord(dbRecord)
          .then(({ imgId, imgRecord }) => {
            loadImageElement({ imgId, imgRecord, domCallback: onComplete })
          })
       })

       function arrayUnion(appendId) {
         return firebase.firestore.FieldValue.arrayUnion(appendId)
       }
    }
  )
}

function uploadProfileImage({ storagePath, userFile }) {
  return new Promise((resolve) => {
    const storageRef = firebase.storage().ref(storagePath)
    storageRef.put(userFile).then((snapshot) => {
      resolve()
    })
  })
}

async function loadImagesFromDB({ getImageRecords }, args) {
  const { gallery, domCallback, filterIDs } = args;
  const imageRecords = await getImageRecords({ gallery, filterIDs })
  for (const [imgId, imgRecord] of Object.entries(imageRecords)) {
    loadImageElement({ imgId, imgRecord, domCallback })
  }
}

function loadImageElement({ imgId, imgRecord, domCallback }) {
  const { storagePath, upvotes } = imgRecord;
  const storageRef = firebase.storage().ref(storagePath);
  storageRef.getDownloadURL()
    .then((url) => domCallback({ imgId, url, upvotes }))
    .catch((error) => console.error(error));
  }

function upvoteImage({ getImageById, upvoteRecord }, { gallery, id }) {
  getImageById({ gallery, id }).then((docRecord) => upvoteRecord(docRecord));
}
