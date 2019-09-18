<?php
$fp = fopen("data/gymclass.json", "w+"); // overwrite file, or create if it does not exist
fwrite ($fp, $_POST["mydata"]); // write something to the file
?>