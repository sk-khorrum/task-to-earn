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

// Google Sheets API configuration
const sheetId = "1qm13QhkAqzyVC4YgiDdd3JBkDZ6Edc-El00HW1BK50k"; // আপনার Google Sheet ID
const apiKey = "AIzaSyBAjhPAxgevZguOiT5O04oT-T_x_tTVrRw"; // আপনার Google API Key

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

      // Google Sheets API থেকে ডেটা রিড করার ফাংশন কল
      readSheetData(); // এই ফাংশনটি কল করবে শীটের ডেটা রিড করতে
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

      // Google Sheets API থেকে ডেটা রিড করার ফাংশন কল
      readSheetData(); // শীটের ডেটা রিড করার জন্য ফাংশন কল হবে
    })
    .catch((error) => {
      console.error("Error signing in:", error);
    });
});

// Google Sheets API থেকে ডেটা রিড করার ফাংশন
function readSheetData() {
  const range = "Sheet1!A2:B10";  // শীটের রেঞ্জ (আপনি রেঞ্জটি আপনার শীট অনুযায়ী কাস্টমাইজ করতে পারেন)
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${range}?key=${apiKey}`;
  
  fetch(url)
    .then(response => response.json())
    .then(data => {
      console.log("Sheet Data:", data.values);
      // এখানে টাস্ক প্রসেস করা যাবে
      // আপনি ডেটার ভিত্তিতে টাস্ক ইউজারকে দেখাতে পারেন
    })
    .catch(error => {
      console.error("Error reading sheet:", error);
    });
}
