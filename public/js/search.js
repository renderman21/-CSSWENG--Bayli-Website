$(document).ready(function(){

	search_form = document.getElementById("search-form")
	search_bar = document.getElementById("search-bar")
    search_button = document.getElementById("search-button")

	search_bar.addEventListener('keypress', function (e) {
		if (e.key === 'Enter' && $("#search-bar").val() != "") {

			search_form.action = "/product-list-" + $("#search-bar").val()
			search_form.submit()
		}
		
	});

});