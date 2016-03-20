var img_name = '';

var watermark_w = 540;
var watermark_h = 182;

$(document).ready(function(){

	//Select Position
	$('.position-picker ul li').click(selectPosition);

	//Select Images
	$('.images ul li').click(selectImage);

	//Run
	$('#run_system').click(run);

	$('input[name=color]').change(changeColor);


	//Watermark Manipulation
    $('.images ul li img.watermark')
		.resizable({
			aspectRatio: 270 / 91
		})
		.parent()
		.draggable({ 
			containment: "parent",
			start: function() {
				dragStart();
			}
		});

	imagesLoaded(function(){
		var images = $('.images ul li img.image');
		images.each(function(){
			var w = $(this).width();
			var h = $(this).height();

			var ratio = 400 / w;

			$(this)
				.attr({
					'ratio': ratio
				})
				.css({
					opacity: 1,
					width: '100%'
				});

			$(this).parent('li').find('.ui-wrapper, .watermark')
				.css({
					'width': (watermark_w * ratio) + 'px',
					'height': (watermark_h * ratio) + 'px'
				});

		});				
	});
});

function changeColor(){
	var color = $('input[name=color]:checked').val();
	var src = 'images/watermark-'+color+'.png';
	$('.images ul li img.watermark').attr('src', src);
}//changeColor

function dragStart(){
	unselectPosSelector();
}//dragStart

/* Images Loaded
------------------------------------------*/
function imagesLoaded(callback){
	var images = jQuery('.images ul li img.image');
	var imageCount = images.length;

	images.each(function(){
        if( this.complete ) {
			imageCount--;
			if(imageCount === 0){
				callback();
			}
        }else{
		    jQuery(this).one('load',function() {
				imageCount--;
			});
		}
	});
}//imagesLoaded

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

	var posTop = 0;
	var posLeft = 0;

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

	/* Reposition Watermark
	---------------------*/
	$('.images ul li.active').each(function(){

		var theRatio = $(this).find('img.image').attr('ratio');

		$(this).find('.ui-wrapper')
			.css({
				'top': (posTop * theRatio) + 'px',
				'left': ((posLeft * theRatio) - 5) + 'px'
			});

	});
}//selectPosition

/* Select Image
------------------------------------------*/
function selectImage(){
	var img = $(this).children('img');

	if($(this).hasClass('active')){
		//Deselect Image
		$(this).removeClass('active');
		if($('.images ul li.active').length < 1){
			controlsHide();
		}
		changeToDistSrc(img);
	}else{
		//Select Image
		controlsShow();
		$('.images ul li.active').each(function(){
			$(this).removeClass('active');
		});
		$(this).addClass('active');

		var src = $(this).children('img').attr('src');
		src = src.split('?')[0];//remove query parameters added for time
		var a = src.split('/');
		img_name = a[a.length-1];
		// console.log('img_name: ' + img_name);

		changeToOrigSrc(img);
	}
}//selectImage

/* Run
------------------------------------------*/
function run() {
	$('.images ul li.active').each(function(){
		var theRatio = $(this).find('img.image').attr('ratio');

		//Top
		var t = $(this).find('.ui-wrapper').css('top');
		t = parseFloat(t);
		t = t / theRatio;
		t = Math.round(t);

		//Left		
		var l = $(this).find('.ui-wrapper').css('left');
		l = parseFloat(l);
		l += 5;
		l = l / theRatio;
		l = Math.round(l);

		var data = {
			img_name: img_name,
			margin_top: t,
			margin_left: l
		};

		var color = $('input[name=color]:checked').val();
		if(color !== 'w'){
			data.color = color;
		}

	    $.ajax({
	        url : 'run.php',
	        data: data
	    }).done(function(data) {
	        $('.message').html(data);
			unselectPosSelector();
			controlsHide();
			$('.images ul li.active').each(function(){
				$(this)
					.addClass('edited')
					.removeClass('active');

				var img = $(this).children('img');
				changeToDistSrc(img);
			});
	    });
	});
}//run

function unselectPosSelector(){
	$('.position-picker ul li.active').each(function(){
		$(this).removeClass('active');
	});
}//unselectPosSelector

function changeToDistSrc(img){
	var src = img.attr('src');
	var d = new Date();
	src += "?"+d.getTime();
	src = src.split('src').join('dist');
	img.attr("src", src);
}//changeToDistSrc

function changeToOrigSrc(img){
	var src = img.attr('src');
	var d = new Date();
	src += "?"+d.getTime();
	src = src.split('dist').join('src');
	img.attr("src", src);
}//changeToOrigSrc

function controlsHide(){
	$('.controls').hide();
}//controlsHide

function controlsShow(){
	$('.controls').show();
}//controlsShow




