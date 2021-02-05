export {
  getGalleryImageRecords,
  getImageById,
  getVesselIconRecord,
  upvoteRecord,
  createImageRecord,
};

async function getGalleryImageRecords({ gallery, rootDB='wreckGalleries' }) {
  const dbRef = this._db
    .collection(rootDB).doc(gallery).collection('images');
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

function getImageById({ gallery, id, rootDB='wreckGalleries' }, resolve) {
  return new Promise ((resolve) => {
    const dbRef = this._db
      .collection(rootDB).doc(gallery).collection('images');
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

async function getVesselIconRecord({ vessel }) {
  return new Promise((resolve) => {
    const docRef = this._db.collection('wreckGalleries').doc(vessel)
    docRef.get().then(doc => {
      const { iconPath } = doc.data()
      resolve(iconPath)
    })
  })
}

function upvoteRecord(docRef, docData) {
  const { upvotes: prevCount } = docData;
  const updatedCount = prevCount+1;
  docRef.update({ upvotes: updatedCount })
    .then(() => console.log('successful update!'))
    .catch((error) => console.error(error))
}

function createImageRecord({ dbCollection, dbFields }, resolve) {
  return new Promise(resolve => {
    this._db.collection(dbCollection).add({ ...dbFields })
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
