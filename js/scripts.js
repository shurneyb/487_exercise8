$(document).ready(function(){
  console.log('scripts loaded');
  
  var locData;
  var location = '';
  var url = 'http://api.open-notify.org/iss-now.json';
  var html = '';
  var data2;
  var url2;
  var place = '';
  
  
  $.ajax({
    type: 'GET',
    dataType: 'json',
    data: locData,
    url: url,
    success:function(data){
      console.log(data);
      location = data.iss_position.latitude + ',%20' + data.iss_position.longitude;
      console.log(location);
      url2 = 'https://nominatim.openstreetmap.org/search/' + location +  '?format=json&polygon=1&addressdetails=1';
      console.log(url2);
      
      $.ajax({
        type: 'GET',
        dataType: 'json',
        data: data2,
        url: url2,
        success:function(data){
          html = 'The space station is currently over ';
          console.log(data);
          if (data.length == 0){
            html += 'an ocean';
            console.log('empty');
          }else{
            if (data[0].address.city == undefined && data[0].address.town == undefined){
              place = data[0].address.country;
            }else if (data[0].address.city == undefined){
              place = data[0].address.town + ', ' + data[0].address.country;
            }else{
              place = data[0].address.city + ', ' + data[0].address.country;
            }
            console.log(place);
            html += place;
          }
          $('#results').html(html);
        },
        error:function(msg){
          console.log('X');
          
        }
      }); //close ajax
    },
    error:function(msg){
      console.log(this);
      
    }
  }); //close ajax
  
  
  
});
