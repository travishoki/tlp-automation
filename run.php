<?php
if(	isset($_REQUEST['img_name']) && 
	isset($_REQUEST['margin_top']) && 
	isset($_REQUEST['margin_left'])	){

	$img_name = $_REQUEST['img_name'];
	$img_dir = 'images/src/';
	$img_dist = 'images/dist/';

	if(isset($_REQUEST['color']) && $_REQUEST['color'] == 'b'){
		$color = 'b';
	}else{
		$color = 'w';
	}

	$watermark_url = 'images/watermark-'.$color.'.png';

	// Load the watermark and the photo to apply the watermark to
	$watermark = imagecreatefrompng($watermark_url);
	$im = imagecreatefromjpeg($img_dir.$img_name);

	// Set the margins for the watermark and get the height/width of the watermark image
	$sx = imagesx($watermark);
	$sy = imagesy($watermark);

	$margin_top = $_REQUEST['margin_top'];
	$margin_left = $_REQUEST['margin_left'];

	// Copy the watermark image onto our photo using the margin offsets and the photo 
	// width to calculate positioning of the watermark. 
	imagecopy($im, $watermark, $margin_left, $margin_top, 0, 0, imagesx($watermark), imagesy($watermark));
	imagepng($im, $img_dist.$img_name);
	imagedestroy($im);
}
?>
