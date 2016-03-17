var posTop = 0;
var posLeft = 0;
var img_name = '';

var watermark_w = 540;
var watermark_h = 182;

$(document).ready(function(){

	//Run
	$('#run_system').click(run);

	//Select Position
	$('.position-picker ul li').click(selectPosition);

	//Select Images
	$('.images ul li').click(selectImage);

});

/* Select Position
------------------------------------------*/
function selectPosition (){
	// console.log('%c----- %s -----', 'font-size: 14px', 'select position');

	$('.position-picker ul li.active').each(function(){
		$(this).removeClass('active');
	});

	$(this).addClass('active');

	var index = $(this).index();

	var img_w = 2048;
	var img_h = 1376;

	var unit_h = img_h/6;
	var unit_w = img_w/6;

	var perc_x = 0;
	var perc_y = 0;

	switch(index + 1){
		/* Row 1
		---------------------*/
		case 1: 
		case 2: 
		case 3: 
			posTop = unit_h;
			perc_y = 0;
			perc_y = 1/6;
			break;

		/* Row 2
		---------------------*/
		case 4: 
		case 5: 
		case 6: 
			posTop = unit_h*3;
			perc_y = 0.5;
			break;

		/* Row 3
		---------------------*/
		case 7: 
		case 8: 
		case 9: 
			posTop = unit_h*5;
			perc_y = 1;
			perc_y = 5/6;
			break;
	}//switch

	switch(index + 1){
		/* Column 1
		---------------------*/
		case 1: 
		case 4: 
		case 7: 
			posLeft = unit_w;
			break;
		/* Column 2
		---------------------*/
		case 2: 
		case 5: 
		case 8: 
			posLeft = unit_w*3;
			break;
		/* Column 3
		---------------------*/
		case 3: 
		case 6: 
		case 9: 
			posLeft = unit_w*5;
			break;
	}//switch

	posTop -= (watermark_h/2);
	posLeft -= (watermark_w/2);

}//selectPosition


function setPosByPerc(){
	posLeft = (img_w * perc_x) - (watermark_w*perc_x);
	posTop = (img_h * perc_y) - (watermark_h*perc_y);
}//setPosByPerc


/* Select Image
------------------------------------------*/
function selectImage(){
	// console.log('%c----- %s -----', 'font-size: 14px', 'select image');
	$('.images ul li.active').each(function(){
		$(this).removeClass('active');
	});

	$(this).addClass('active');

	var src = $(this).children('img').attr('src');
	src = src.split('?')[0];//remove query parameters added for time
	var a = src.split('/');
	img_name = a[a.length-1];
	// console.log('img_name: ' + img_name);
}//selectImage

/* Run
------------------------------------------*/
function run() {
	// console.log('%c----- %s -----', 'font-size: 14px', 'run');

	var data = {
		img_name: img_name,
		margin_top: posTop,
		margin_left: posLeft
	};

	var color = $('input[name=color]:checked').val();
	console.log('color: ' + color);
	if(color !== 'w'){
		data.color = color;
	}

	console.log('---------------');
	console.log('data');
	console.dir(data);

    $.ajax({
        url : 'run.php',
        data: data
    }).done(function(data) {
        $('.message').html(data);

		$('.position-picker ul li.active').each(function(){
			$(this).removeClass('active');
		});
		$('.images ul li.active').each(function(){
			$(this)
				.addClass('edited')
				.removeClass('active');
			var img = $(this).children('img');
			var src = img.attr('src');
			var d = new Date();
			src += "?"+d.getTime();
			src = src.split('src').join('dist');
			img.attr("src", src);
		});

    });
}//run












