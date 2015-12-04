(function (){
	
	var prevPageToken, nextPageToken;

	function getRequest(query, pageToken){
		var endpoint = 'https://www.googleapis.com/youtube/v3/search';
		var base = 'natural hair';
		var params = {
			part: 'snippet',
			key: 'AIzaSyDMsWACfX3OWfmPZePzaWd13iEM-cgbSww',
			q: base + ' ' + query,
			r: 'json',
			maxResults: '6',
		};

    if(pageToken){
      params.pageToken = pageToken;        
    } 		

	  $.getJSON(endpoint, params, function(data){
      nextPageToken = data.nextPageToken;
      prevPageToken = data.prevPageToken;
	  	showThumbs(data.items);				
		 }); 	
	}

	function showThumbs(data){
		var resultList = $('#results .videos');
		var list = {
			title: '',
			videoURL: '',
			thumb: '',
			channel: '',
			channelURL: '',
			init: function(){
				for(var i=0; i<data.length; i++){
					this.title = data[i].snippet.title;
					this.videoURL = 'http://www.youtube.com/watch?v=' + data[i].id.videoId;
					this.thumb = data[i].snippet.thumbnails.medium.url;
					this.channel = data[i].snippet.channelTitle;
					this.channelURL = 'https://www.youtube.com/channel/' + data[i].snippet.channelId;
					resultList.append(this.drawList());
				}
			},			
			drawList: function(){
				return '<li><a href="' + this.videoURL + '" alt="' + 
					this.title + '" class="thumb"><img src="' + this.thumb + '" title="' + this.title + '"/></a><a href="' + 
					this.channelURL + '" alt="' + this.channel + '" class="channel">' + this.channel + '</a><span>' + 
					this.title + '</span></li>';
			},
		};

		resultList.empty();		
		list.init();		
	}
	$(function(){ //shorthand for doc.ready()


	  $('#search-form').submit(function(e){
	  	e.preventDefault();  	
	  	getRequest($('#query').val());
	  	$('#results').fadeIn('slow');
	  });

	  $('.arrows span.prev').click(function(){
	  	getRequest($('#query').val(), prevPageToken);
	  });

	  $('.arrows span.next').click(function(){
	  	getRequest($('#query').val(), nextPageToken);
	  });

	  $('.fa-times-circle').click(function(){
	  	$('#query').val('').focus();
	  });

	});	
})();



