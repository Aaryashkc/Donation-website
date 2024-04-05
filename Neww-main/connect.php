<?php
// Database connection parameters
$servername = "localhost";
$username = "root";
$password = ""; // Your MySQL password
$dbname = "donate_db";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Check if form is submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Prepare and bind
    $stmt = $conn->prepare("INSERT INTO donationtable (name, email, address, city, province, zipcode, month, year, amount) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)");
    $stmt->bind_param("sssssssss", $name, $email, $address, $city, $province, $zipcode, $month, $year, $amount);

    // Set parameters and execute
    $name = $_POST['name'];
    $email = $_POST['email'];
    $address = $_POST['address'];
    $city = $_POST['city'];
    $province = $_POST['province'];
    $zipcode = $_POST['zipcode'];
    $month = $_POST['month'];
    $year = $_POST['year'];
    $amount = $_POST['amount'];
    $stmt->execute();

    echo "New record created successfully";

    $stmt->close();
    $conn->close();
}
?>


