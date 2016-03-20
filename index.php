<?php
/* Includes
------------------------------------------*/
include 'inc/functions.php';

/* Images
------------------------------------------*/
$dir_src = 'images/src/';
$dir_dist = 'images/dist/';
$imagesOriginal = getFromDir($dir_src);
$imagesEdited 	= getFromDir($dir_dist);
$images = Array();

foreach($imagesOriginal as $img) {
	$obj = [];
	if (in_array($img, $imagesEdited)) {
		$obj['url'] = $dir_dist.$img;
		$obj['edited'] = True;
	}else {
		$obj['url'] = $dir_src.$img;
		$obj['edited'] = False;
	}
	array_push($images, $obj);
}//foreach
?>
<!DOCTYPE html>
<html>
<head>
	<title>TLP Automation</title>

	<!-- Bootstrap CSS -->
	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css" integrity="sha384-1q8mTJOASx8j1Au+a5WDVnPi2lkFfwwEAa8hDDdjZlpLegxhjVME1fgjWPGmkzs7" crossorigin="anonymous">

	<!-- Custom CSS -->
	<link rel="stylesheet" href="style.css">

	<!-- jQuery UI CSS -->
	<link rel="stylesheet" href="//code.jquery.com/ui/1.11.4/themes/smoothness/jquery-ui.css">

</head>
<body>
	<div class="sidebar">
		<div class="sidebar-inner">
			<img src="images/watermark-w.png" class="watermark" width="220">

			<h1>TLP Automation</h1>

			<div class="radio-btns">
				<div class="radio-group">
					<label for="color-white">White</label>
					<input type="radio" id="color-white" name="color" value="w" checked/>
				</div>
				<div class="radio-group">
					<label for="color-black">Black</label>
					<input type="radio" id="color-black" name="color" value="b"/>
				</div>
			</div><!--radio-btns-->

			<div id="slider"></div>

			<div class="position-picker">
				<ul>
					<li></li>
					<li></li>
					<li></li>

					<li></li>
					<li></li>
					<li></li>

					<li></li>
					<li></li>
					<li></li>
				</ul>
			</div>

			<button id="run_system" class="btn btn-primary btn-lg">Run</button>

		</div><!--sidebar-inner-->
	</div><!--sidebar-->

	<div class="container">
		<div class="images">
			<ul>
				<?php foreach($images as $img):?>
					<?php
					$classes = '';
					if($img['edited']){
						$classes = 'edited';
					}
					?>
					<li class="<?php echo $classes;?>">			

						<img src="images/watermark-w.png" class="watermark">

						<img src="<?php echo $img['url'];?>" class="image">
					</li>
				<?php endforeach;?>
			</ul>
		</div><!--images-->

		<p class="message"></p>
	</div><!--container-->

	<!-- jQuery JS -->
	<script src="//code.jquery.com/jquery-1.12.0.min.js"></script>

	<!-- jQuery UI JS -->
	<script src="//code.jquery.com/jquery-1.10.2.js"></script>
	<script src="//code.jquery.com/ui/1.11.4/jquery-ui.js"></script>

	<!-- Custom JS -->
	<script src="script.js"></script>

</body>
</html>














