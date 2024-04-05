document.addEventListener('DOMContentLoaded', function() {
  // Function to handle the donation process
  function handleDonation(event) {
      // Prevent form submission
      event.preventDefault();

      // Get donor details from the form
      var form = document.getElementById('donationForm');
      var formData = new FormData(form);
      var donorName = formData.get('name'); // Assuming the input field has the name attribute set to 'name'
      var donationAmount = formData.get('amount'); // Assuming the input field has the name attribute set to 'amount'
      var emailAddress = formData.get('email'); // Assuming the input field has the name attribute set to 'email'

      // Display confirmation dialog
      Swal.fire({
          title: 'Are you sure?',
          text: "This action cannot be undone.",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, proceed to checkout',
          cancelButtonText: 'No, cancel',
          customClass: {
              title: 'swal-title',
              content: 'swal-content',
              confirmButton: 'swal-confirm-button',
              cancelButton: 'swal-cancel-button',
          }
      }).then((result) => {
          if (result.isConfirmed) {
              // User confirmed, proceed with checkout

              // Send form data to the server
              var xhr = new XMLHttpRequest();
              xhr.open("POST", "connect.php", true);
              xhr.onreadystatechange = function() {
                  if (xhr.readyState === 4 && xhr.status === 200) {
                      // Process the response if needed
                      console.log(xhr.responseText);
                  }
              };
              xhr.send(formData);

              // Show thank you alert with dynamic content
              Swal.fire({
                  title: '<span class="thank-you-title">Thank You!</span>',
                  html: '<p class="thank-you-text">Dear <strong>' + donorName + '</strong>,</p><p class="thank-you-text">Your donation of <strong>NRs. ' + donationAmount + '</strong> has been received.</p><p class="thank-you-text">We appreciate your generosity!</p><p class="thank-you-details"><strong>Email Address:</strong> ' + emailAddress + '</p><p class="thank-you-details"><strong>Time of Donation:</strong> ' + new Date().toLocaleString() + '</p>',
                  icon: 'success',
                  confirmButtonText: 'OK',
                  customClass: {
                      title: 'thank-you-popup',
                      popup: 'thank-you-popup',
                      confirmButton: 'thank-you-confirm-button'
                  }
              });
          }
      });
  }

  // Attach the handleDonation function to the form submit event
  document.getElementById('donationForm').addEventListener('submit', handleDonation);
});

