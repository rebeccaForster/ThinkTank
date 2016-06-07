(function() {
	// Initialize collapse button
	$(document).ready(function() {
		var isStartScreen = $("body.startscreen").length > 0;
		if (!isStartScreen) {
			$(".button-collapse").sideNav({
				menuWidth : 200, // Default is 240
				// edge: 'right', // Choose the horizontal origin
				// closeOnClick: true // Closes side-nav on <a> clicks, useful for Angular/Meteor
			});
		}
	});
	
	function collapseSuperMenuIfActive(currentSite, superElement, subElements) {
		var currentlyOnSubElement = subElements.some(function(sub) {
			return sub === currentSite;
		});
		if (currentlyOnSubElement) {
			var li = $("ul#nav-mobile li." + superElement);
			li.addClass("active");
			li.find("a.collapsible-header").addClass("active");
			li.find("div.collapsible-body").attr("style", "display:block;");
		}
	}

	//collapse right menu and highlight it
	$(document).ready(function() {
		var bodyId = document.getElementsByTagName("body")[0].id;
		collapseSuperMenuIfActive(bodyId, "about", ["person", "kontakt"]);
		collapseSuperMenuIfActive(bodyId, "it", ["tut", "tools"]);
		collapseSuperMenuIfActive(bodyId, "wissen", ["studium", "schule", "galerie", "woerterlexikon"]);
	});

	//Spoiler
	$(document).ready(function() {
		$("div.spoilerblock pre").hide();
		$("div.spoilerblock input").click(function() {
			$(this).next("pre").toggle(500);
			if ($(this).attr("value") == "Anzeigen") {
				$(this).attr("value", "Ausblenden");
			} else {
				$(this).attr("value", "Anzeigen");
			}
		});
	});
})();

