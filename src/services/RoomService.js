import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { db } from "../../firebaseconfig";
import { collection, doc, setDoc } from "firebase/firestore"; 


export const uploadImage = async (image) => {

    const response = await fetch(image);
    const blob = await response.blob();
    const filename = image.substring(image.lastIndexOf('/')+1);

    const storage = getStorage()
    const storageRef = ref(storage, `images/${filename}`);
    console.log('Image uploaded to Firebase Storage successfully!');

        // Add a new document in collection "cities"
await setDoc(doc(collection(db, "city")), {
    name: "Los Angeles",
    state: "CA",
    country: "USA"
  });

    return await uploadBytes(storageRef, blob).then(item => getDownloadURL(item.ref));



}