	
	var startNorth;
	var startEast;
	var locations = []; //for root path
	//google map location
	//1'st to last  (緯度Latitude(startNorth),經度Longitude(startEast))
	var myCenter = new google.maps.LatLng(24.163122, 120.640350); 
	var shop2 = new google.maps.LatLng(24.182906, 120.616967);
	var shop3 = new google.maps.LatLng(24.165928, 120.631680);
	var shop4 = new google.maps.LatLng(24.139124, 120.680541);
	var shop5 = new google.maps.LatLng(24.135787, 120.610822);
	var nowPosition;	

	//info index
	var shopAddress = document.getElementById("address");
	var shopTel = document.getElementById("tel");
	var shopOpen = document.getElementById("openHoure");

	var mapProp = {
		center : myCenter,
		zoom : 13,
		mapTypeId : google.maps.MapTypeId.ROADMAP
	};

	var map = new google.maps.Map($("#googleMap")[0], mapProp);	
	


//set marker
 	var marker= new google.maps.Marker({
	  	position:myCenter,
	  	// animation:google.maps.Animation.BOUNCE //jump
	  	title:"總店",
 	})
  	var marker2= new google.maps.Marker({
  		position:shop2,
  		title:"澄清店",
 	})

  	var marker3= new google.maps.Marker({
  		position:shop3,
  		title:"環河店",
  	})
  	var marker4= new google.maps.Marker({
  		position:shop4,
  		title:"民族店",
  	})

  	var marker5= new google.maps.Marker({
  		position:shop5,
  		title:"嶺東店",
  	})

  	marker.setMap(map);
  	marker2.setMap(map);
  	marker3.setMap(map);
  	marker4.setMap(map);
  	marker5.setMap(map);	  	

  	var infowindow = new google.maps.InfoWindow({
  		content:"總店 <br/> 地址：台中市西屯區惠來路二段 <br/> 電話：04-6666-8888"
  	});
  	// infowindow.open(map,marker);

  	var infowindow = new google.maps.InfoWindow({
  		content:"澄清店 <br/> 地址：台灣台中市西屯區台灣大道四段966號 <br/> 電話：04-6666-7777"
  	});
  	// infowindow.open(map,marker2);

  	var infowindow = new google.maps.InfoWindow({
  		content:"環河店 <br/> 地址：台中市西屯區台中市西屯區市政北二路400號 <br/> 電話：04-6666-6666"
  	});
  	// infowindow.open(map,marker3);

  	var infowindow = new google.maps.InfoWindow({
  		content:"民族店 <br/> 地址：台灣台中市中區民族路67號 <br/> 電話：04-6666-5555"
  	});
  	// infowindow.open(map,marker4);

  	var infowindow = new google.maps.InfoWindow({
  		content:"嶺東店 <br/> 地址：台灣台中市南屯區建功路50號 <br/> 電話：04-6666-3333"
  	});

 // marker click event
  	google.maps.event.addListener(marker, 'click', function() {
  		if (locations.length>1){locations =[];} //clear array when triple click
  		getLocation();//get user location
  		locations.push(marker); //push marker in locations[1];
        DrawRoutePath();//root organize

        //show shop info
        shopAddress.innerHTML = "地址：台中市西屯區惠來路二段";
		shopTel.innerHTML = "電話：04-6666-8888";
		shopOpen.innerHTML = "營業時間：0900-2100";
	  	infowindow.open(map,marker);
	});

  	google.maps.event.addListener(marker2, 'click', function() {
  		if (locations.length>1){locations =[];} //clear array when triple click
	  	getLocation();//get user location
	  	locations.push(marker2); //push marker in locations[1];
        DrawRoutePath();//root organize

        //show shop info
        shopAddress.innerHTML = "地址：台灣台中市西屯區台灣大道四段966號";
		shopTel.innerHTML = "電話：04-6666-7777";
		shopOpen.innerHTML = "營業時間：0900-2100";

	    infowindow.open(map,marker2);
	});

	google.maps.event.addListener(marker3, 'click', function() {
		if (locations.length>1){locations =[];} //clear array when triple click
		getLocation();//get user location
		locations.push(marker3); //push marker in locations[1];
        DrawRoutePath();//root organize

        //show shop info
        shopAddress.innerHTML = "地址：台中市西屯區台中市西屯區市政北二路400號";
		shopTel.innerHTML = "電話：04-6666-6666";
		shopOpen.innerHTML = "營業時間：0900-2100";

	    infowindow.open(map,marker3);
	});

	google.maps.event.addListener(marker4, 'click', function() {
		if (locations.length>1){locations =[];} //clear array when triple click
		getLocation();//get user location
		locations.push(marker4); //push marker in locations[1];
        DrawRoutePath();//root organize
//show shop info
        shopAddress.innerHTML = "地址：台灣台中市中區民族路67號";
		shopTel.innerHTML = "電話：04-6666-5555";
		shopOpen.innerHTML = "營業時間：0900-2100";
	  	infowindow.open(map,marker4);
	});

	google.maps.event.addListener(marker5, 'click', function() {
		if (locations.length>1){locations =[];} //clear array when triple click
		getLocation();//get user location
		locations.push(marker5); //push marker in locations[1];
        DrawRoutePath();//root organize
//show shop info
        shopAddress.innerHTML = "地址：台灣台中市南屯區建功路50號";
		shopTel.innerHTML = "電話：04-6666-3333";
		shopOpen.innerHTML = "營業時間：0900-2100";
		infowindow.open(map,marker5);
	});
		
//get user geolocation
	//  var startNorth;
	// 	var startEast;
	//  1'st to last  (緯度Latitude(startNorth),經度Longitude(startEast))
	var x = document.getElementById("mapInfo"); //display mapInfo

	function getLocation() {
	    if (navigator.geolocation) {
	        navigator.geolocation.getCurrentPosition(showPosition, showError);
	    } else {
	        x.innerHTML = "Geolocation is not supported by this browser.";
	    }
	}

	function showPosition(position) {
		// if (locations.length>1){locations =[];} //clear array when triple click
		startNorth = position.coords.latitude;
		startEast = position.coords.longitude;
		nowPosition = new google.maps.LatLng(startNorth, startEast);
		locations.push(nowPosition);//put user position in [0]
		x.innerHTML = "("+startNorth+","+startEast+")";
	}

	function showError(error) {
	    switch(error.code) {
	        case error.PERMISSION_DENIED:
	            x.innerHTML = "User denied the request for Geolocation."
	            break;
	        case error.POSITION_UNAVAILABLE:
	            x.innerHTML = "Location information is unavailable."
	            break;
	        case error.TIMEOUT:
	            x.innerHTML = "The request to get user location timed out."
	            break;
	        case error.UNKNOWN_ERROR:
	            x.innerHTML = "An unknown error occurred."
	            break;
	    }
	}
    
    //root path service
    var directionsService = new google.maps.DirectionsService();
    var directionsDisplay = new google.maps.DirectionsRenderer();
    directionsDisplay.setMap(map);
    
    function DrawRoutePath() {
        if (locations.length < 2)
            return;
        var start = locations[0].position;
        var end = locations[1].position
        var request = {
            origin : start,
            destination : end,
            travelMode : google.maps.TravelMode.DRIVING
        };
        directionsService.route(request, function(response, status) {
            if (status == google.maps.DirectionsStatus.OK) {
                directionsDisplay.setDirections(response);
            }
        });
    }  // end of DrawRoutePath()
		  