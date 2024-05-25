// import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.1/firebase-app.js";
// import { getAuth ,GoogleAuthProvider ,signInWithPopup} from "https://www.gstatic.com/firebasejs/10.12.1/firebase-auth.js";

// const firebaseConfig = {
//   apiKey: "AIzaSyAU64moLr2fk7x0CsuiymzIdKqLzg2lnZ4",
//   authDomain: "login-1bb28.firebaseapp.com",
//   projectId: "login-1bb28",
//   storageBucket: "login-1bb28.appspot.com",
//   messagingSenderId: "468393681511",
//   appId: "1:468393681511:web:49ba66e00d1fb445b2eac2"
// };

// const app = initializeApp(firebaseConfig);
// const auth=getAuth(app);
// auth.languageCode='en'
// const provider=new GoogleAuthProvider();


// const googleLogin= document.getElementById("google-login-btn");
// googleLogin.addEventListener("click",function(){
//     signInWithPopup(auth, provider)
//     .then((result) => {
//     const credential = GoogleAuthProvider.credentialFromResult(result);
//       const user = result.user;
//       console.log(user);
//       window.location.href="/index.html#item1"

//     }).catch((error) => {
//       const errorCode = error.code;
//       const errorMessage = error.message;
    
//     });
// })


// function updateUserProfile(user){
//     const userName =user.displayName;
//     const userEmail = user.email;
//     const userProfilePicture=user.photoURL;

//     document.getElementById("userName").textContent = userName;
//     document.getElementById("userEmail").textContent = userEmail;
//     document.getElementById("userProfilePicture").src = userProfilePicture;

// }

// updateUserProfile();



import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.1/firebase-app.js";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "https://www.gstatic.com/firebasejs/10.12.1/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyAU64moLr2fk7x0CsuiymzIdKqLzg2lnZ4",
  authDomain: "login-1bb28.firebaseapp.com",
  projectId: "login-1bb28",
  storageBucket: "login-1bb28.appspot.com",
  messagingSenderId: "468393681511",
  appId: "1:468393681511:web:49ba66e00d1fb445b2eac2"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
auth.languageCode = 'en';
const provider = new GoogleAuthProvider();

document.getElementById("google-login-btn").addEventListener("click", function() {
  signInWithPopup(auth, provider)
    .then((result) => {
      const user = result.user;
      console.log(user);

      // Store user details in localStorage
      localStorage.setItem('userName', user.displayName);
      localStorage.setItem('userEmail', user.email);
      localStorage.setItem('userProfilePicture', user.photoURL);

      window.location.href = "/index.html";
    })
    .catch((error) => {
      console.error("Error during sign in:", error);
    });
});
