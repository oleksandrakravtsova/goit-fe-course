jQuery(function($) {
    // Asynchronously Load the map API 
    var script = document.createElement('script');
    script.src = "https://maps.googleapis.com/maps/api/js?sensor=false&callback=initialize";
    document.body.appendChild(script);
});
var infoWindowContent;
var markers;

function initialize() {
    var map;
    var bounds = new google.maps.LatLngBounds();
    var mapOptions = {
       mapTypeId: 'hybrid'
      // mapTypeId: 'satellite'
        // mapTypeId: 'roadmap'
      // mapTypeId: 'terrain'
      
    };
                    
    // Display a map on the page
    
    displayMap();

    function displayMap(){
    map = new google.maps.Map(document.getElementById("map_canvas"), mapOptions);
    map.setTilt(45);
    }
// onclick function-Country-Georgia
    setMarkersGE();
    $("#ge").click(function() {
       
        displayMap();
        setMarkersGE();
        displayInfoContentGE();
        displayMarkers();
        
        
        
      }); 
        
      // onclick function-Country-Turkey
    $("#tur").click(function() {
      
        displayMap();
        setMarkersTUR();
        displayInfoContentTUR();
        displayMarkers();
        
        
      }); 
       
       // onclick function-Country-Ukraine
    $("#ukr").click(function() {
       
        displayMap();
        setMarkersUKR();
        displayInfoContentUKR();
        displayMarkers();
        
      }); 
      //Marker locations for Georgia
       function setMarkersGE() {
             markers =[
                ['Nukriani', 41.6091781,45.8947416],
                ['Kazbegi', 42.657029,44.6308047],
                 ];
    
            }
        // Marker locations for Turkey
            function setMarkersTUR() {
                markers =[
                   ['Istambul', 41.0055005,28.7319924],
                   ['Ankara', 39.9035557,32.62268],
                   ];
       
               }
        // Marker locations for Ukraine
               function setMarkersUKR() {
                markers =[
                   ['Crimea', 45.3042776,33.4419001],
                   ['Kyiv', 50.4021368,30.2525089],
                  ];
       
               }

              
               displayInfoContentGE()

               function displayInfoContentGE() {   
       // Info Window Content
        infoWindowContent = [
        ['<div class="info_content" style=" text-align:center;" >' +
        '<h3>Nukriani</h3>' +
        '<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>' +
         '<p>Check available Community: <a href="#"> <b> <u> Nukriani Community </u> </b>  </a></p>' + '<p>Check in Google Maps: <a href="#" > for <b><u>Nukriani </u></b></a></p>' +'</div>'],
       ['<div class="info_content"  style=" text-align:center;" >' +
        '<h3>Kazbegi</h3>' +
        '<p>Stepantsminda or Kazbegi, is a townlet in the Mtskheta-Mtianeti region of north-eastern Georgia.</p>' +
         '<p>Check available Community: <a href="communities_kazbegi.html"> <b><u> Kazbegi Community </u></b></a></p>' + '<p>Check in Google Maps: <a href="#" > for <b><u> Kazbegi </u></b></a></p>' +'</div>'],
      
    ];
} 

 function displayInfoContentTUR() {   
    // Info Window Content
     infoWindowContent = [
     ['<div class="info_content" style=" text-align:center;" >' +
     '<h3>Istambul</h3>' +
     '<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>' +
      '<p>Check available Community: <a href="#"> <b> <u> Istambul Community </u> </b>  </a></p>' + '<p>Check in Google Maps: <a href="#" > for <b><u>Istambul </u></b></a></p>' +'</div>'],
    ['<div class="info_content"  style=" text-align:center;" >' +
     '<h3>Ankara</h3>' +
     '<p>Stepantsminda or Kazbegi, is a townlet in the Mtskheta-Mtianeti region of north-eastern Georgia.</p>' +
      '<p>Check available Community: <a href="#"> <b><u> Ankara Community </u></b></a></p>' + '<p>Check in Google Maps: <a href="#" > for <b><u> Ankara </u></b></a></p>' +'</div>'],
   
 ];
} 

  function displayInfoContentUKR() {   
    // Info Window Content
     infoWindowContent = [
     ['<div class="info_content" style=" text-align:center;" >' +
     '<h3>Crimea</h3>' +
     '<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>' +
      '<p>Check available Community: <a href="#"> <b> <u> Crimea Community </u> </b>  </a></p>' + '<p>Check in Google Maps: <a href="#" > for <b><u> Crimea </u></b></a></p>' +'</div>'],
    ['<div class="info_content"  style=" text-align:center;" >' +
     '<h3>Kiev</h3>' +
     '<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>' +
      '<p>Check available Community: <a href="#"> <b><u> Kiev Community </u></b></a></p>' + '<p>Check in Google Maps: <a href="#" > for <b><u> Kiev </u></b></a></p>' +'</div>'],
   
 ];
} 
    displayMarkers();

    function displayMarkers(){
    // Display multiple markers on a map
    var infoWindow = new google.maps.InfoWindow(), marker, i;
    
    // Loop through our array of markers & place each one on the map  
    for( i = 0; i < markers.length; i++ ) {
        var position = new google.maps.LatLng(markers[i][1], markers[i][2]);
        bounds.extend(position);
        marker = new google.maps.Marker({
            position: position,
            map: map,
            title: markers[i][0]
        });
        
        // Allow each marker to have an info window    
        google.maps.event.addListener(marker, 'click', (function(marker, i) {
            return function() {
                infoWindow.setContent(infoWindowContent[i][0]);
                infoWindow.open(map, marker);
            }
        })(marker, i));

        // Automatically center the map fitting all markers on the screen
        map.fitBounds(bounds);
    }
}
     var boundsListener;

     overrideMapGE(); 

    function overrideMapGE(){
    // Override our map zoom level once our fitBounds function runs (Make sure it only runs once)
     boundsListener = google.maps.event.addListener((map), 'bounds_changed', function(event) {
        this.setZoom(5);
        google.maps.event.removeListener(boundsListener);
    });
}    



}