var colors = ['#FF5722','#039BE5','#009688','#E91E63','#9C27B0','#D84315'];

$.ajax({
	url:'content/content.json',
	dataType: 'json',
    success: function(data) {
    	initGrid(data);
    }
});

hover = false;

function initGrid(data){

	generateGrid(data);
	generateButtons(data);
	var $grid;
	$('.container').imagesLoaded(function(){

		$grid =  $('#grid').isotope({
		  // options
		  itemSelector: '.grid-item',
		  layoutMode: 'fitRows',
		  masonry: {
      		columnWidth: '.grid-item'
    	  }
		});		
	});


	$('.filter-button-group').on( 'click', 'button', function() {
		$('.filterbutton').removeClass('highlight');
	    var filterValue = $(this).attr('data-filter');
	    $grid.isotope({ filter: filterValue });
	    $(this).addClass('highlight');
	});

	$('.filter-button-group-comp').on( 'click', 'button', function() {
		$('.filterbutton').removeClass('highlight');
	    var filterValue = $(this).attr('data-filter');
	    $grid.isotope({ filter: filterValue });
	    $(this).addClass('highlight');
	});

}

function generateGrid(data){
	data.forEach(function(d,i){
		var classes = 'col-md-4 col-sm-6 grid-item';
		let tags = [d.Composition1,d.Composition2,d.Composition3,d['Colour brackets']];
		tags.forEach(function(tag){
			classes += ' '+tag.replace(' ','_').toLowerCase();
		});
		var html = '<div id="grid'+i+'" class="'+classes+'"><div class="inner"><img id="image'+i+'" src="/images/'+d['Photo name']+'" /><div id="overlay'+i+'" class="overlay">';
		html+='<h3 class="grid-title">'+d['Material Name']+'</h3><p class="overlaydesc">'+d['Supplier']+'</p>';
		html+='<p class="overlaydesc">Laser Etch: S'+d['Laser etch power']+' '+d['Laser etch speed']+'F</p>';
		html+='<p class="overlaydesc">Laser Etch: S'+d['Laser cut power']+' '+d['Laser cut speed']+'F</p>';
		html +='</div></div></div>';

		$('#grid').append(html);

		$('#image'+i).css({"max-width": "100%", "max-height": "auto"});

		$('#overlay'+i).css({'background-color':'#0000FF'});

		$('#overlay'+i).on('click',function(){
			if($('#overlay'+i).css('opacity')>0.5){
				showModal(d);
			}
		});

		$('#grid'+i).on("mouseenter", function(){						
        	$('#overlay'+i).fadeIn(400);
    	});

    	$('#grid'+i).on("mouseleave", function(){	
        	$('#overlay'+i).stop().fadeOut(100);
    	});
	});
}

function showModal(d){
	console.log(d)
	$('#detailModal').modal('show');
	$('#modal_title').html(d['Material Name']);
	speedHTML='<p>Laser Etch: S'+d['Laser etch power']+' '+d['Laser etch speed']+'F</p>';
	speedHTML+='<p>Laser Etch: S'+d['Laser cut power']+' '+d['Laser cut speed']+'F</p>';
	$('#supplier').html('Supplier: '+d['Supplier']);
	$('#composition').html('<p>Composition: '+d.Composition+'</p>');
	$('#speeds').html(speedHTML);
	$('#notes').html(d.Notes);
	$('#weight').html('Weight: '+d.Weight);
	$('#weave').html('Weave: '+d.Weave);
	$('#modal_title').html(d['Material Name']);
	$('#detailimage').html('<img src="/images/'+d['Photo name 2']+'"  width="100%">');
}

function generateButtons(data){
	var filters = [];
	data.forEach(function(d){
		let tags = [d['Colour brackets']];
		tags.forEach(function(tag){
			if(filters.indexOf(tag)==-1 && tag!=''){
				filters.push(tag);
			}
		});
	});

	filters.forEach(function(f){
		var html = '<button class="filterbutton" data-filter=".'+f.replace(' ','_').toLowerCase()+'">'+f+'</button> ';
		$('.filter-button-group').append(html);
	});

	var filters = [];
	data.forEach(function(d){
		let tags = [d.Composition1,d.Composition2,d.Composition3];
		tags.forEach(function(tag){
			if(filters.indexOf(tag)==-1 && tag!=''){
				filters.push(tag);
			}
		});
	});

	filters.forEach(function(f){
		var html = '<button class="filterbutton" data-filter=".'+f.replace(' ','_').toLowerCase()+'">'+f+'</button> ';
		$('.filter-button-group-comp').append(html);
	});	
}