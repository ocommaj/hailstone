export default function FirestoreQueries(db) {
  const getImageRecords = (args) => _getImageRecords(db, args);
  const getImageById = (args) => _getImageById(db, args);
  const createImageRecord = (args) => _createImageRecord(db, args);
  const createUserRecord = (args) => _createUserRecord(db, args);
  const queryUserRecord = (uid) => _queryUserRecord(db, uid);
  const updateUserRecord = (args) => _updateUserRecord(db, args);
  const upvoteRecord = (args) => _upvoteRecord(args);

  return {
    createImageRecord,
    createUserRecord,
    getImageById,
    getImageRecords,
    queryUserRecord,
    updateUserRecord,
    upvoteRecord,
  }
}

async function _getImageRecords(db, {
  gallery,
  filterIDs=null,
  rootDB='wreckGalleries'
}) {
  const dbRef = db.collection(rootDB).doc(gallery).collection('images');
  const galleryRecords = await dbRef.get()
    .then(snapshot => {
      return snapshot.docs.reduce((accumulator, doc) => {
        const { id } = doc;
        const { upvotes, storagePath } = doc.data();
        if (storagePath) {
          if (!filterIDs) {
            accumulator[id] = { storagePath, upvotes }
          } else {
            if (filterIDs.includes(id)) {
              accumulator[id] = { storagePath, upvotes }
            }
          }
        }
        return accumulator;
      }, {})
    })

  return galleryRecords;
}

function _getImageById(db, { gallery, id, root='wreckGalleries' }) {
  return new Promise ((resolve) => {
    const dbRef = db.collection(root).doc(gallery).collection('images');
    const docRef = dbRef.doc(id)
    docRef.get()
      .then(imageDoc => {
        if (imageDoc.exists) {
          const docData = imageDoc.data()
          resolve({ docRef, docData })
        }
    })
  })
}

function _upvoteRecord({ docRef, docData }) {
  const { upvotes: prevCount } = docData;
  const updatedCount = prevCount+1;

  docRef.update({ upvotes: updatedCount }).catch((err) => console.error(err))
}

function _createImageRecord(db, { dbCollection, dbFields, arrayUnion }) {
  const { wreckId, uploadedBy: uid } = dbFields;
  return new Promise(resolve => {
    db.collection(dbCollection).add({ ...dbFields })
      .then((docRef) => {
        docRef.get().then(doc => {
          const imgId = docRef.id
          const imgRecord = doc.data()
          const userRef = db.collection('users').doc(uid);
          userRef.update({ uploadRecords: arrayUnion({ wreckId, imgId }) })
          resolve({ imgId, imgRecord })
        })
      }).catch(error => console.error(error))
  })
}

function _createUserRecord(db, userConfig) {
  return new Promise(resolve => {
    db.collection('users/').doc(userConfig.uid).set({ ...userConfig })
      .then(() => resolve())
  })
}

function _queryUserRecord(db, uid) {
  return new Promise(resolve => {
    db.collection('users/').doc(uid).get()
      .then(userDoc => {
        if (userDoc.exists) {
          resolve(userDoc.data())
        }
      })
  })
}

function _updateUserRecord(db, { uid, userData }) {
  return new Promise(resolve => {
    db.collection('users/').doc(uid).set({ ...userData }, { merge: true })
      .then(() => {
        _queryUserRecord(db, uid)
          .then((userData) => resolve(userData))
      })
  })
}
