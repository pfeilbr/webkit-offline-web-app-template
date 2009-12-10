(function() {
    
	function log(s) {
		$('#content').append("<div class='log'>" + s + "</div>");
	}
				
	function getConfig(callback) {
		$.getJSON('config.json', function(data) {
			callback(data);
		});				
	}
	
	// NOTE: the cache will only update if app.manifest has also been updated
	function updateCache() {
		log('executing cache.update()');
		cache.update();
		log('executing cache.swapCache()');
		cache.swapCache();
	}
	
	var cache = window.applicationCache;
	cache.addEventListener('updateready', function() {
			log("applicationCache.updateready event fired");
			if (cache.status == cache.UPDATEREADY) {
				log('applicationCache.status == UPDATEREADY');
				updateCache();
			}				
		}, false);
		
	cache.addEventListener('error', function() { log("applicationCache.error event fired"); }, false);			
				
	if (typeof(localStorage) === 'undefined') {
		alert("localStorage not supported by this browser")
	}
	
	// reset after 1000
	if (localStorage.loadCount && parseInt(localStorage.loadCount) > 1000) {
		localStorage.loadCount = 0;
	}
	
	localStorage.loadCount = localStorage.loadCount ? parseInt(localStorage.loadCount) + 1 : 1;
	
	log('localStorage.loadCount = ' + localStorage.loadCount);
				
	$("#debug").click(function() {
		getConfig(function(config) {
			log('version = ' + config.version);
			log('navigator.onLine = ' + navigator.onLine);
			log('localStorage.characterCount = ' + localStorage.characterCount);
		});
	});
	
	// manually update the cache
	$("#update_cache").click(function() {
		updateCache();
	});
	
	// see how many characters can be stored in local storage
	$("#local_storage_test").click(function() {
		var proceed = true;
		localStorage.characterCount = 0;
		var data = "";
		while (proceed) {
			try {
				data = data + "a";
				if (localStorage.getItem("data")) {
					localStorage.removeItem("data");
				}
				localStorage.setItem("data", data);
				localStorage.characterCount = parseInt(localStorage.characterCount) + 1;
			} catch (e) {
				log("error while executing: localStorage.setItem " + e);
				log("number of characters stored = " + localStorage.characterCount);
				proceed = false;
			}
		}
	});
	
	// check connectivity status every 5 seconds
	setInterval(function() {
		var status = navigator.onLine ? "online" : "offline";
		// log('connection status: ' + status);
	}, 5000);
	
	document.addEventListener("online", function() { log('online event fired'); });
	document.addEventListener("offline", function() { log('offline event fired'); });			
	
})();
