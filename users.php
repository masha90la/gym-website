<?php
$fp = fopen("data/users.json", "w+"); // overwrite file, or create if it does not exist
fwrite ($fp, $_POST["myusers"]); // write something to the file
?>

