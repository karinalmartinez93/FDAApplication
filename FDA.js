//Using the NREL Alternative Fuel Station API to find nearby alternative fuel stations.
//See https://developer.nrel.gov/docs/transportation/alt-fuel-stations-v1/ for full documentation
//Passing the JQuery global object to the function expression
(function($) {
    //click handler for the button
    document.getElementById("searchFood").onclick = function() {
      //get values from the input fields
      var city = document.getElementById("city").value;
      var state = document.getElementById("state").value;
      makeFoodRequest('https://api.fda.gov/food/enforcement.json?api_key=wtIxzGhSPbtoUuyR2Cy6ZCUT65OZ0PMe0SbIvtO2&search=city:' + city + '+AND+state:' + state + '&limit=50');
      makeDrugRequest('https://api.fda.gov/drug/enforcement.json?api_key=wtIxzGhSPbtoUuyR2Cy6ZCUT65OZ0PMe0SbIvtO2&search=city:' + city + '+AND+state:' + state + '&limit=10');
    };

    //See JQuery getJSON doc: http://api.jquery.com/jquery.getjson/
    function makeFoodRequest(url) {
      //Set text to loading... before request is made
      document.getElementById("foodData").innerHTML = "<p>loading...</p>";
      //JQuery get JSON request. If you want to set headers, you must use the full ajax function via http://api.jquery.com/jquery.ajax/
      $.getJSON(url, function(data) {
        //JQuery parses the JSON string using JSON.parse for you.
        console.log(data);
        displayFoodHTML(data);
      });
    }
    function makeDrugRequest(url) {
      //Set text to loading... before request is made
      document.getElementById("drugData").innerHTML = "<p>loading...</p>";
      //JQuery get JSON request. If you want to set headers, you must use the full ajax function via http://api.jquery.com/jquery.ajax/
      $.getJSON(url, function(data) {
        //JQuery parses the JSON string using JSON.parse for you.
        console.log(data);
        displayDrugHTML(data);
      });
    }

    //handler when response data is received
    function displayFoodHTML(generalObject) {
      //Clear previous
      $('#foodTable').DataTable().destroy();
      document.getElementById("foodData").innerHTML = "";
      var recalls = generalObject.results;
      var count = 0;
      recalls.forEach(function(recalls) {
        if(recalls.recall_initiation_date > 20160000){
          count+= 1;
          var tr = document.createElement("tr");
          tr.innerHTML = "<td>" + recalls.city+ "</td><td>" + recalls.classification + "</td>" +
            "<td>" + recalls.recall_initiation_date + "</td><td>" + recalls.product_description + "</td>" +
            "<td>" + recalls.reason_for_recall + "</td><td>" + recalls.code_info + "</td>";
          document.getElementById("foodData").appendChild(tr);
        }
      });
      $(document).ready( function() {
        $('#foodTable').dataTable( {
          "fnDrawCallback": function( oSettings ) {
          }
        } );
      } );
    }
    function displayDrugHTML(generalObject) {
      //Clear previous
      $('#drugTable').DataTable().destroy();
      document.getElementById("drugData").innerHTML = "";
      var recalls = generalObject.results;
      var count = 0;
      recalls.forEach(function(recalls) {
          var tr = document.createElement("tr");
          tr.innerHTML = "<td>" + recalls.city+ "</td><td>" + recalls.classification + "</td>" +
            "<td>" + recalls.recall_initiation_date + "</td><td>" + recalls.product_description + "</td>" +
            "<td>" + recalls.reason_for_recall + "</td><td>" + recalls.code_info + "</td>";
          document.getElementById("drugData").appendChild(tr);

      });
      $(document).ready( function() {
        $('#drugTable').dataTable( {
          "fnDrawCallback": function( oSettings ) {
          }
        } );
      } );
    }

})(jQuery);
