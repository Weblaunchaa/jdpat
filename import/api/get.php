<html>
<head>
<title>test</title>
<link rel="stylesheet" href="http://static.paipaiimg.com/fd/paipai/base/css/gb.css?t=20140611133144" type="text/css" media="screen">
</head>
<body>
<?php
print_r($_FILES['input_uploadFile']);
$uploaddir = 'uploads/';
$uploadfile = $uploaddir . basename($_FILES['input_uploadFile']['name']);

echo '<pre>';
if (move_uploaded_file($_FILES['input_uploadFile']['tmp_name'], $uploadfile)) {
    echo "File is valid, and was successfully uploaded.\n";
} else {
    echo "Possible file upload attack!\n";
}

echo 'Here is some more debugging info:';
print_r($_FILES);

print "</pre>";
$zip = new ZipArchive;
$res = $zip->open('uploads/a.zip');
if($res === TRUE){
    echo 'zip ok';
    var_dump($zip->getNameIndex(0)); 
    $zip->extractTo('exzip');
    $zip->close();
} else {
    echo 'zip false:'.$res;
}

?>

</body>
</html>
