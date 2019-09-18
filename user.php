<?php
$fp = fopen("data/userschedule.json", "w+"); // overwrite file, or create if it does not exist
fwrite ($fp, $_POST["userdata"]); // write something to the file
?>