import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth"
import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, query, setDoc } from "firebase/firestore";
import { auth, database } from "../firebaseconfig"

export const registerUser = (email, password, username, onSuccess) => {
    createUserWithEmailAndPassword(auth, email, password).then((res) => {
        // TODO: Remove This
        console.log("Registration Successfull!");

        if (auth.currentUser != null) {
            updateProfile(auth.currentUser, {
                displayName: username
            });
            onSuccess();
        } else {
            console.error("User not found");
        }

    }).catch(e => {
        console.error(e.message)
    });
}

export const loginUser = (email, password, onSuccess) => {
    signInWithEmailAndPassword(auth, email, password).then(res => {
        onSuccess();
    }).catch(e => {
        console.error(e.message);
    })
}

export const getCurrentUser = () => {
    return auth.currentUser;
}

export const createData = (collectionName, data, onSuccess, onError) => {
    addDoc(collection(database, collectionName), data)
        .then((res) => {
            onSuccess();
        }).catch((e) => {
            console.error(e.message);
            onError();
        })
}

export const getDataFromCollection = async (collectionName) => {
    let dataList = [];

    const q = query(collection(database, collectionName));
    const documents = await getDocs(q);
    documents.forEach((doc) => {
        dataList.push({...doc.data(), id: doc.id})
    });

    return dataList;
}

export const getSingleDataFromCollection = async (collectionName, docId) => {
    const ref = doc(database, collectionName, docId);

    const document = await getDoc(ref);
     if (document.exists()) {
        return document.data()
     } else {
        return {error: "Document not found"}
     }
}

export const updateFromCollection = async (collectionName, updatedData, docId, onSuccess, onError) => {
    const ref = doc(database, collectionName, docId);

    await setDoc(ref, updatedData)
        .then((res) => {
            onSuccess();
        })
        .catch(e => {console.error(e); onError();})
}

export const deleteFromCollection = async (collectionName, docId, onSuccess, onError) => {
    await deleteDoc(doc(database, collectionName, docId))
        .then((res) => {
            onSuccess();
        })
        .catch((e) => {
            onError();
        })
}