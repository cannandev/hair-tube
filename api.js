(function (){
	function getQuery(){
		var query = $('#query').val(); //clean up value
		getRequest(query);
	}

	function getRequest(query){
		var url = 'http://www.omdbapi.com';
		var params = {
			s: query,
			r: 'json',
		};
		/* Below is a jQuery utility function. $.getJSON()
		 * It takes three params: a url string, a data object, and a callbak function.
		 */
	  $.getJSON(url, params, function(data){ //jQuery utility fu. Takes as 
	    showResults(data.Search);
	  });  	
	}  

	function showResults(movies){
		$('#results').empty();
		movies.forEach(function(m){
			$('#results').append('<p>' + m.Title + '</p>');
		});
	}
	$(function(){ //shorthand for doc.ready()

	  $('#submit').click(function(e){
	  	e.preventDefault();
	  	getQuery();
	  });

	});	
})();


