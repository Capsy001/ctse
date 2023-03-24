import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { db ,firebase } from "../../firebaseconfig";
import { collection, doc, setDoc } from "firebase/firestore"; 

const collectionrRef = firebase.firestore().collection('store');

export const uploadImage = async (image) => {

    const response = await fetch(image);
    const blob = await response.blob();
    const filename = image.substring(image.lastIndexOf('/')+1);

    const storage = getStorage()
    const storageRef = ref(storage, `images/${filename}`);
    console.log('Image uploaded to Firebase Storage successfully!');

        // Add a new document in collection "cities"
await setDoc(doc(collection(db, "store")), {
    itemName: "Carrot",
    itemCategory: "Vegetables",
    quantity: "10Kg"
  });

    return await uploadBytes(storageRef, blob).then(item => getDownloadURL(item.ref));
}

export const addStoreItem = async (data) => {

  return collectionrRef.add(data).then(res => res).catch(e => console.log('Error ',e))

}

export const getItem = async () => {
  return collectionrRef.get().then((docs) => {
    const data = []
    docs.forEach(doc => {
      data.push({id: doc.id , ...doc.data()});
      console.log("data ",doc.data());
      console.log("data id ",doc.id);
    });
    console.log("data final ",data);
    return data;
  }).then(docs => docs).catch(e => console.log(e));
}

export const deleteItem = async (id) => {
  return collectionrRef.doc(id).delete().then(() => true).catch(e=> console.log('Delete error ',e));
}

// export const editItem=(id,data)=>{

//   console.log(data)

//   return collectionrRef.doc(id).update(data).then(()=>{
//     console.log("Item Updated!")
//     return true;
//   }).catch((e)=>console.log("Error ",e))

// }