export { getGalleryImageRecords };

async function getGalleryImageRecords({ gallery, rootDB='wreckGalleries' }) {
  const dbRef = this.db.collection(rootDB).doc(gallery).collection('images');
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
