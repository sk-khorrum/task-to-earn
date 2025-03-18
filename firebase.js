// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDidQCzhG0gMHhsfQllhf-ZlT49mG65kgI",
  authDomain: "task-to-earn-c3fee.firebaseapp.com",
  projectId: "task-to-earn-c3fee",
  storageBucket: "task-to-earn-c3fee.firebasestorage.app",
  messagingSenderId: "794725938677",
  appId: "1:794725938677:web:543b0f933e49ef1a479cbc",
  measurementId: "G-MJM49Y1HQ1"
};

// Firebase Initialization
const app = firebase.initializeApp(firebaseConfig);

// Firestore and Authentication initialization
const auth = firebase.auth();
const db = firebase.firestore();

// User sign-up function
document.getElementById("signUpForm").addEventListener("submit", function (e) {
  e.preventDefault();
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  
  auth.createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log("User signed up:", user);
      db.collection("users").doc(user.uid).set({
        coins: 0  // Initialize user with 0 coins
      })
      .then(() => {
        console.log("User data saved to Firestore");
      })
      .catch((error) => {
        console.error("Error adding user to Firestore:", error);
      });
    })
    .catch((error) => {
      console.error("Error signing up:", error);
    });
});

// User sign-in function
document.getElementById("signInForm").addEventListener("submit", function (e) {
  e.preventDefault();
  const email = document.getElementById("signInEmail").value;
  const password = document.getElementById("signInPassword").value;
  
  auth.signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log("User signed in:", user);
      db.collection("users").doc(user.uid).get()
        .then((doc) => {
          if (doc.exists) {
            console.log("User data:", doc.data());
          } else {
            console.log("No such document!");
          }
        })
        .catch((error) => {
          console.log("Error getting document:", error);
        });
    })
    .catch((error) => {
      console.error("Error signing in:", error);
    });
});
