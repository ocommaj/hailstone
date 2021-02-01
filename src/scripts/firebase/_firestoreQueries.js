export { getGalleryImageRecords, getImageById, upvoteRecord };

async function getGalleryImageRecords({ gallery, rootDB='wreckGalleries' }) {
  const dbRef = this._db
    .collection(rootDB).doc(gallery).collection('images');
  const galleryRecords = await dbRef.get()
    .then(snapshot => {
      return snapshot.docs.reduce((accumulator, doc) => {
        const { id } = doc;
        const { upvotes, fullPath: imgPath } = doc.data();
        if (imgPath) {
          accumulator[id] = { imgPath, upvotes }
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

function upvoteRecord(docRef, docData) {
  const { upvotes: prevCount } = docData;
  const updatedCount = prevCount+1;
  docRef.update({ upvotes: updatedCount })
    .then(() => console.log('successful update!'))
    .catch((error) => console.error(error))
}
