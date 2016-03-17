<?php
function getFromDir($image_dir){
	$images = [];
	if (is_dir($image_dir)){
		if ($dh = opendir($image_dir)){
			while (($file = readdir($dh)) !== false){
				if($file !== '.' && $file !== '..' && $file !== '.DS_Store') {
					array_push($images, $file); 
				}
	  		}//while
	      closedir($dh);
		}
	}
	return $images;
}//getFromDir
?>