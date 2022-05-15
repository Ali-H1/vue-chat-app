// Import the functions you need from the SDKs you need
//import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
//import { firebase } from 'firebase/app'
import { getAuth } from "firebase/auth";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import "firebase/auth";
import "firebase/firestore";
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import {
  doc,
  setDoc,
  getDoc,
  updateDoc,
  arrayUnion,
  onSnapshot,
} from "firebase/firestore";

import { ref, onUnmounted, computed } from "vue";
//import handler from "../functions/tocken/tocken.js"
//import {firebaseConfig} from "./config.js"
// Initialize Firebase
// var MY_SECRET_SAUCE = {
//   apiKey: process.env.apiKey ,
//   authDomain: process.env.authDomain,
//   projectId:  process.env.projectId,
//   storageBucket:  process.env.storageBucket ,
//   messagingSenderId:  process.env. messagingSenderId  ,
//   appId:  process.env.appId,
//   measurementId: process.env.measurementId     
// };
var app;
fetch("/.netlify/functions/tocken/tocken.js").then(res =>{
  console.log(res)
  app = res.body;
})
//const analytics = getAnalytics(app);

const db = getFirestore();
const auth = getAuth(app);
// export function githubsignin(){
//   const GithubProvider = new GithubAuthProvider();
//   signInWithPopup(auth, GithubProvider)
//   .then((result) => {
//     // This gives you a GitHub Access Token. You can use it to access the GitHub API.
//     const credential = GithubAuthProvider.credentialFromResult(result);
//     const token = credential.accessToken;

//     // The signed-in user info.
//     const user = result.user;
//     // ...
//     console.log(token)
//     console.log(user)
//   }).catch((error) => {
//     // Handle Errors here.
//     const errorCode = error.code;
//     const errorMessage = error.message;
//     // The email of the user's account used.
//     const email = error.email;
//     // The AuthCredential type that was used.
//     const credential = GithubAuthProvider.credentialFromError(error);
//     // ...
//     console.log("errorCode",errorCode)
//     console.log("errorMessage",errorMessage)
//     console.log("email",email)
//     console.log("credential",credential)
//   });
// }
export var allcontacts_global = ref(null);

export function useAuth() {
  let user = ref(null);
  let allcontacts = ref(null);
  const unsubscribe = auth.onAuthStateChanged((_user) => {
    user.value = _user
    if((sessionStorage.getItem("contacts"))!=null)
    {
      allcontacts.value = JSON.parse(sessionStorage.getItem("contacts"))
    }
  });
  onUnmounted(unsubscribe);
  const isLogin = computed(() => user.value !== null);
  const isProcesed = computed(() => allcontacts.value !== null);
  const signIn = async () => {
    const googleProvider = new GoogleAuthProvider();
    await signInWithPopup(auth, googleProvider)
      .then(async (result) => {
        let user = result.user;
        //console.log(token, "AA", user, "AA", credential);
        allcontacts.value = await adduser(user);
        allcontacts_global.value = allcontacts.value;
        sessionStorage.setItem("contacts",JSON.stringify(allcontacts.value))
        console.log(result);
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        //const email = error.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        console.log(
          error,
          "errorCode",
          errorCode,
          "errorMessage",
          errorMessage,
          "credential",
          credential
        );
      });
  };
  const signOut = () => {
    auth.signOut();
    sessionStorage.setItem("contacts", null );
  };
  console.log("contact:::", user, allcontacts.value);
  return { user, isLogin, signIn, signOut, allcontacts, isProcesed };
}

export const adduser = async (user) => {
  let allcontacts = [];
  const docRef = doc(db, "users", user.providerData[0].uid);
  try {
    await setDoc(
      docRef,
      {
        name: user.providerData[0].displayName,
        email: user.providerData[0].email,
        photo: user.providerData[0].photoURL,
        uid: user.providerData[0].uid,
        groups: [],
      },
      { merge: true }
    );
    console.log("Document written with ID: ", user.providerData[0].uid);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
  console.log("doneeeeee");
  await getDoc(docRef).then((docSnap) => {
    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
      user.providerData[0].contacts = docSnap.data().contacts;
      allcontacts = getcontacts(user.providerData[0].contacts);
    } else {
      console.log("No such document!");
    }
  });

  console.log("allcontacts value adduser : ", allcontacts[0]);
  sessionStorage.setItem("contacts",allcontacts)

  return allcontacts;
};
export const getdata = async (contact) => {
  const result = {};
  const docRef = doc(db, "users", contact);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    console.log("Document data contact:", docSnap.data());
    result.value = docSnap.data();
  } else {
    // doc.data() will be undefined in this case
    console.log("No such document!");
  }
  return result;
};
export const getcontacts = async (contacts) => {
  let allcontacts = [];
  for (let i = 0; i < contacts.length; i++) {
    allcontacts.push(await getdata(contacts[i]));
  }
  console.log("allcontacts value : ", allcontacts);
  return allcontacts;
};

export const import_chat_data = async (chat_uid) => {
  console.log(chat_uid.value);
  let result = ref(null);
  try {
    const docRef = doc(db, "messages", chat_uid.value);
    onSnapshot(docRef, (doc) => {
      try {
        if (doc.exists()) {
          console.log("Current data: ", doc.data());
          result.value = doc.data();
          return result;
        } else throw "not existing";
      } catch (err) {
        console.log("error import");
        if (err == "not existing") {
          console.log("error import in if");
          try {
            setDoc(
              docRef,
              {
                messages: [],
              },
              { merge: true }
            );
            console.log("Document written with ID: ", chat_uid.value);
            import_chat_data(chat_uid);
          } catch (e) {
            console.error("Error adding document: ", e);
          }
        }
      }
    });
  } catch (error) {
    console.log(error);
  }
  return result;
};
export const snapshot = async (chat_uid) => {
  if (chat_uid != null) {
    const messages = ref(null);
    onSnapshot(doc(db, "messages", chat_uid), (doc) => {
      console.log("Current data: ", doc.data());
      messages.value = doc.data();
    });
    return messages;
  }
};
export const sendMessage = async (txt, chat_uid, sender) => {
  // if (chat_uid!=null) return;
  var time = new Date();
  console.log(txt, chat_uid, sender);
  const docref = doc(db, "messages", chat_uid);
  const obj = {
    message: txt,
    sender_data: sender,
    time: time.getHours() + ":" + time.getMinutes(),
    date: {
      year: time.getFullYear(),
      mounth: time.getMonth() + 1,
      day: time.getDate(),
    },
  };
  console.log(obj);
  // Atomically add a new region to the "regions" array field.
  try {
    await updateDoc(docref, {
      messages: arrayUnion(obj),
    });
  } catch (err) {
    console.log(err);
  }
};
export const user_search = async (user, user_uid, contacts) => {
  let contacts_new = [];
  const docRef = query(
    collection(db, "users"),
    where("email", "==", user.toLowerCase())
  );
  const returned_data = await getDocs(docRef);
  returned_data.forEach((docSnap) => {
    if (docSnap.exists()) {
      console.log("Document data contact:", docSnap.data());
      const userref = doc(db, "users", user_uid);
      const contactref = doc(db, "users", docSnap.data().uid);

      updateDoc(userref, {
        contacts: arrayUnion(docSnap.data().uid),
      });
      if (!docSnap.data().contacts.find(user_uid)) {
        updateDoc(contactref, {
          contacts: arrayUnion(user_uid),
        });
      }
      console.log(contacts.push(docSnap.data().uid));
      contacts_new.value = getcontacts(contacts);
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
    }
  });
  console.log(contacts_new.value);
  console.log(contacts_new.value[0]);
  return contacts_new.value;
};
