// Function to toggle the modal
function toggleSignUp() {
    var modal = document.getElementById('signUpModal');
    modal.style.display = 'block';
}

// Function to close the modal
function closeModal() {
    var modal = document.getElementById('signUpModal');
    modal.style.display = 'none';
}

// Function to handle sign-in process
function signIn() {
    // Code to handle sign-up process, validate user, etc.

    // Hide Sign Up button and show Sign Out button
    var signBtn = document.getElementById('signBtn');
    var signOutBtn = document.getElementById('signOutBtn');

    signBtn.style.display = 'none';
    signOutBtn.parentNode.style.display = 'block'; // Making its parent <li> visible

    // Close the modal after signing up
    closeModal();
}

// Function to handle sign-out process
function signOut() {
    // Code to handle sign-out process
    
    // Hide Sign Out button and show Sign Up button
    var signBtn = document.getElementById('signBtn');
    var signOutBtn = document.getElementById('signOutBtn');

    signOutBtn.parentNode.style.display = 'none'; // Making its parent <li> invisible
    signBtn.style.display = 'block';
}
