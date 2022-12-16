import { initializeApp  } from 'firebase/app';
import { getAuth,
     signInWithPopup, 
     GoogleAuthProvider, 
     createUserWithEmailAndPassword, 
     signInWithEmailAndPassword, 
     signOut,
    onAuthStateChanged}
 from 'firebase/auth';
import {getFirestore, 
    doc, 
    getDoc, 
    setDoc,
    collection,
    writeBatch,
    query,
    getDocs} 
    from 'firebase/firestore'



const firebaseConfig = {
    apiKey: "AIzaSyBtWTcXJkGNPI89GRA4l_gIsJcq4vEzjzc",
    authDomain: "clothing-store-db-9ece2.firebaseapp.com",
    projectId: "clothing-store-db-9ece2",
    storageBucket: "clothing-store-db-9ece2.appspot.com",
    messagingSenderId: "217972238369",
    appId: "1:217972238369:web:4376e9647182ff26afdb60"
  };
   
  const firebaseApp = initializeApp(firebaseConfig);

  const provider = new GoogleAuthProvider();
  provider.setCustomParameters({
    prompt:"select_account" //force the user to select the account 
  })

  export const auth =getAuth()
  export const signInWithGooglePopup = () => signInWithPopup (auth, provider)
  
  export const db = getFirestore()

  export const addCollectionAndDocuments = async (collectionKey, objectToAdd) =>{
    const collectionRef = collection(db, collectionKey)
    const batch = writeBatch(db)

    Object.values(objectToAdd).forEach((object) => {
        const docRef = doc(collectionRef, object.title.toLowerCase())
        batch.set(docRef, object)
    })
    await batch.commit()
    console.log('done')
  }

  export const getCategoriesAndDocuments = async () => {
    const collectionRef =  collection(db, 'categories')
    const q = query(collectionRef)  

    const querySnapshot = await getDocs(q)
    const categoryMap = querySnapshot.docs.reduce((acc, docSnapshot) =>{
        const {title, items} = docSnapshot.data()
        acc[title.toLowerCase()] = items
        return acc
    }, {})
    return categoryMap
  }
  
  export const createUserDocFromAuth = async (userAuth, additionInformation = {}) =>{
    if(!userAuth) return;

    const userDocRef = doc (db, 'users', userAuth.uid)

    const userSnapshot = await getDoc(userDocRef)

    if (!userSnapshot.exists()){
        const { displayName, email} = userAuth
        const createAt = new Date()

        try {
            await setDoc(userDocRef,{
                displayName,
                email,
                createAt,
                ...additionInformation,
            });
        } catch (error){
            alert('error creating the user', error.message);
            console.log(error.message)
        }
    }

    return userDocRef
};

export const createAuthUserWithEmailAndpassword = async (email, password) =>{
    if(!email || !password) return;
     createUserWithEmailAndPassword(auth, email, password);
}

export const signInAuthUserWithEmailAndpassword = async (email, password) =>{
    if(!email || !password) return;
    signInWithEmailAndPassword (auth, email, password);
}

export const signOutUser = async () => await signOut(auth)

export const onAuthStateChangedListener = (callback) => {

    onAuthStateChanged(auth, callback)
}
