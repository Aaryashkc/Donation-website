document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission

    // Collect form data
    var name = document.querySelector('input[name="name"]').value;
    var email = document.querySelector('input[name="email"]').value;
    var subject = document.querySelector('input[name="subject"]').value;
    var message = document.querySelector('textarea[name="message"]').value;

    // Prepare the email data
    var emailData = {
        SecureToken : "bdb17717-1b1d-459b-a117-b4fe970aee26",
        To : 'p31451415@gmail.com',
        From:'p31451415@gmail.com' ,
        Subject: subject,
        Body: "From: " + name + "<br>Email: " + email + "<br>Message: " + message
    };

    // Send the email
    Email.send(emailData).then(
        message => Swal.fire({
            title: 'Success!',
            text: 'Your message has been sent successfully.',
            icon: 'success',
            confirmButtonText: 'OK'
        })
    );
});


// review
document.getElementById("submitReview").addEventListener("click", function() {
    var name = document.getElementById("reviewName").value;
    var date = new Date().toLocaleDateString();
    var rating = document.getElementById("reviewRating").value;
    var comment = document.getElementById("reviewComment").value;
  
    var reviewHtml = '<div class="review">' +
                       '<h3>' + name + '</h3>' +
                       '<p class="date">' + date + '</p>' +
                       '<div class="rating">' +
                         generateStars(rating) +
                       '</div>' +
                       '<p class="comment">' + comment + '</p>' +
                     '</div>';
  
    document.querySelector(".reviews-section").insertAdjacentHTML('beforeend', reviewHtml);



  

    
    // Reset the form fields
    document.getElementById("reviewName").value = "";
    document.getElementById("reviewRating").value = "";
    document.getElementById("reviewComment").value = "";
  });




  
  // Function to generate star icons based on the rating
  function generateStars(rating) {
    var starsHtml = '';
    for (var i = 0; i < 5; i++) {
      if (i < rating) {
        starsHtml += '<span class="fa fa-star checked"></span>';
      } else {
        starsHtml += '<span class="fa fa-star"></span>';
      }
    }
    return starsHtml;
  }
  

  document.getElementById("submitReview").addEventListener("click", function() {
    var name = document.getElementById("reviewName").value;
    var rating = document.getElementById("reviewRating").value;
    var comment = document.getElementById("reviewComment").value;

    var xhr = new XMLHttpRequest();
    xhr.open("POST", "connect.php", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            console.log(xhr.responseText);
            // You can handle the response here if needed
        }
    };
    xhr.send("name=" + name + "&rating=" + rating + "&comment=" + comment);
});

//reply
document.getElementById('submitReview').addEventListener('click', function() {
  // Validate form fields
  let name = document.getElementById('reviewName').value.trim();
  let rating = document.getElementById('reviewRating').value;
  let comment = document.getElementById('reviewComment').value.trim();

  if (name === '' || rating === '' || comment === '') {
      alert('Please fill in all required fields.');
      return;
  }

  // AJAX request to submit the form data
  let formData = new FormData();
  formData.append('name', name);
  formData.append('rating', rating);
  formData.append('comment', comment);

  fetch('submit_review.php', {
      method: 'POST',
      body: formData
  })
  .then(response => response.json())
  .then(data => {
      // Handle response (e.g., display success message, refresh page, etc.)
      alert(data.message);
      location.reload(); // Refresh the page after submission (optional)
  })
  .catch(error => {
      console.error('Error:', error);
      alert('An error occurred. Please try again.');
  });
});

// Admin reply functionality
function replyToReview(reviewId) {
  let reply = prompt('Enter your reply:');
  if (reply !== null && reply.trim() !== '') {
      // Send the reply to the server (you'll need to implement backend logic)
      let formData = new FormData();
      formData.append('reviewId', reviewId);
      formData.append('reply', reply);

      fetch('reply_review.php', {
          method: 'POST',
          body: formData
      })
      .then(response => response.json())
      .then(data => {
          alert(data.message);
          // Reload the page or update the UI as needed
      })
      .catch(error => {
          console.error('Error:', error);
          alert('An error occurred while replying. Please try again.');
      });
  }
}