<?php
// Contact form handler. Stores submissions in the `contact_db.contacts` table.
// NOTE: for production, move DB credentials to environment variables / a config
// file outside the web root, and create a least-privilege DB user (not root).

// Only accept POST submissions.
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    header('Location: index.htm');
    exit();
}

// --- Collect & validate input -------------------------------------------------
$name    = trim($_POST['name']    ?? '');
$phone   = trim($_POST['phone']   ?? '');
$email   = trim($_POST['email']   ?? '');
$subject = trim($_POST['subject'] ?? '');
$message = trim($_POST['message'] ?? '');

$errors = [];
if ($name === '')    { $errors[] = 'name'; }
if ($phone === '')   { $errors[] = 'phone'; }
if ($message === '') { $errors[] = 'message'; }
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) { $errors[] = 'email'; }

if ($errors) {
    header('Location: index.htm?error=1');
    exit();
}

// --- Persist ------------------------------------------------------------------
$conn = @new mysqli('localhost', 'root', '', 'contact_db');
if ($conn->connect_error) {
    error_log('Contact form DB connection failed: ' . $conn->connect_error);
    header('Location: index.htm?error=1');
    exit();
}

$stmt = $conn->prepare(
    'INSERT INTO contacts (name, phone, email, subject, message) VALUES (?, ?, ?, ?, ?)'
);

$ok = false;
if ($stmt) {
    $stmt->bind_param('sssss', $name, $phone, $email, $subject, $message);
    $ok = $stmt->execute();
    if (!$ok) {
        error_log('Contact form insert failed: ' . $stmt->error);
    }
    $stmt->close();
} else {
    error_log('Contact form prepare failed: ' . $conn->error);
}

$conn->close();

header('Location: index.htm?' . ($ok ? 'success=1' : 'error=1'));
exit();
?>
