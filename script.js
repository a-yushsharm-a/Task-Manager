document.getElementById('nav1').addEventListener('click', function() {
  document.getElementById('item1').style.display = 'flex';
  document.getElementById('item2').style.display = 'none';
  document.getElementById('item3').style.display = 'none';
  document.getElementById('item4').style.display = 'none';
});

document.getElementById('nav2').addEventListener('click', function() {
  document.getElementById('item1').style.display = 'none';
  document.getElementById('item2').style.display = 'block';
  document.getElementById('item3').style.display = 'none';
  document.getElementById('item4').style.display = 'none';
});

document.getElementById('nav3').addEventListener('click', function() {
  document.getElementById('item1').style.display = 'none';
  document.getElementById('item2').style.display = 'none';
  document.getElementById('item3').style.display = 'block';
  document.getElementById('item4').style.display = 'none';
});

document.getElementById('nav4').addEventListener('click', function() {
  document.getElementById('item1').style.display = 'none';
  document.getElementById('item2').style.display = 'none';
  document.getElementById('item3').style.display = 'none';
  document.getElementById('item4').style.display = 'block';
});





document.addEventListener("DOMContentLoaded", function() {
  // Get all the circle tabs
  const circleTabs = document.querySelectorAll('.circle-tab');

  // Add click event listeners to each tab
  circleTabs.forEach((tab, index) => {
      tab.addEventListener('click', () => {
          // Remove any existing theme classes from the body
          document.body.className = '';
          
          // Add the new theme class based on the tab index
          document.body.classList.add(`theme-${index + 1}`);
      });
  });
});





// const username = localStorage.getItem('userName');
// const email = localStorage.getItem('userEmail');
// const profilePic = localStorage.getItem('userProfilePicture');

// // if (username && email && profilePic) {
// //   document.getElementById('userName').textContent = userName;
// //   // document.getElementById('j_usn').textContent = email;
// //   // document.getElementById('circle-txt').src = profilePic;
// // } else {
// //   // If no username, email, or profile picture is found, redirect to login page
// //   window.location.href = "/index.html";
// // }



// document.addEventListener("DOMContentLoaded", function() {
//   const userName = localStorage.getItem('userName');
//   const userEmail = localStorage.getItem('userEmail');
//   const userProfilePicture = localStorage.getItem('userProfilePicture');

//   if (userName && userEmail && userProfilePicture) {
//     document.getElementById("userName").textContent = userName;
//     document.getElementById("userEmail").textContent = userEmail;
//     document.getElementById("userProfilePicture").src = userProfilePicture;
//   } else {
//     // Redirect to login page if user details are not available
//     window.location.href = "/index.html";
//   }
// });
