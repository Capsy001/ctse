import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";

export const uploadImage = async (image) => {

    const response = await fetch(image);
    const blob = await response.blob();
    const filename = image.substring(image.lastIndexOf('/')+1);

    const storage = getStorage()
    const storageRef = ref(storage, `images/${filename}`);
    console.log('Image uploaded to Firebase Storage successfully!');
    return await uploadBytes(storageRef, blob).then(item => getDownloadURL(item.ref));

}