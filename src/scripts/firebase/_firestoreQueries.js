export default function FirestoreQueries(db) {
  const upvoteRecord = _upvoteRecord;
  const getImageRecords = (args) => _getImageRecords(db, args);
  const getImageById = (args) => _getImageById(db, args);
  const createImageRecord = (args) => _createImageRecord(db, args);

  return {
    upvoteRecord,
    getImageRecords,
    getImageById,
    createImageRecord
  }
}

async function _getImageRecords(db, { gallery, rootDB='wreckGalleries' }) {
  const dbRef = db.collection(rootDB).doc(gallery).collection('images');
  const galleryRecords = await dbRef.get()
    .then(snapshot => {
      return snapshot.docs.reduce((accumulator, doc) => {
        const { id } = doc;
        const { upvotes, storagePath } = doc.data();
        if (storagePath) {
          accumulator[id] = { storagePath, upvotes }
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
          const imgData = imageDoc.data()
          resolve({ docRef, imgData })
        }
    })
  })
}

function _upvoteRecord(docRef, docData) {
  const { upvotes: prevCount } = docData;
  const updatedCount = prevCount+1;
  docRef.update({ upvotes: updatedCount })
    .then(() => console.log('successful update!'))
    .catch((error) => console.error(error))
}

function _createImageRecord(db, { dbCollection, dbFields }) {
  return new Promise(resolve => {
    db.collection(dbCollection).add({ ...dbFields })
      .then((docRef) => {
        console.log(`doc written with id: ${docRef.id}`)
        docRef.get().then(doc => {
          const imgId = docRef.id
          const imgRecord = doc.data()
          resolve({ imgId, imgRecord })
        })
      })
      .catch(error => console.error(error))
  })
}
