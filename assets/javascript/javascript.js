$(function () {
    populateButtons(searchArray, "searchButton", "#buttonsArea");
    console.log("page loaded");

})

var searchArray = ["dog", "cat", "bird", "random"];

function populateButtons(searchArray, classToAdd, areaToAddTo) {
    $(areaToAddTo).empty();
    for (var i = 0; i < searchArray.length; i++) {
        console.log("hello");
        var a = $('<button>');
        a.addClass(classToAdd);
        a.attr('data-type', searchArray[i]);
        a.text(searchArray[i]);
        $(areaToAddTo).append(a);
    }
}

$(document).on('click', '.searchButton', function () {
    $('#searches').empty();
    var type = $(this).data('type');
    var queryURL = 'https://api.giphy.com/v1/gifs/search?q=' + type + '&api_key=v14V4YrY1CPPbHOLl1F1hAp2zPTP8MXO&limit=10'
    $.ajax({ url: queryURL, method: 'GET' })
        .done(function (response) {
            for (var i = 0; i < response.data.length; i++) {
                var searchDiv = $('<div class="search-item">');
                var rating = response.data[i].rating;
                var title = response.data[i].title;
                var embed = response.data[i].embed_url;
                var p = $('<p>').text('Rating: ' + rating + ' Title: ' + title + ' Embed: ' + embed);
                var animated = response.data[i].images.fixed_height.url;
                var still = response.data[i].images.fixed_height_still.url;
                var image = $('<img>');
                image.attr('src', still);
                image.attr('data-still', still);
                image.attr('data-animated', animated);
                image.attr('data-state', 'still');
                image.addClass('searchImage');
                searchDiv.append(p);
                searchDiv.append(image);
                $('#searches').append(searchDiv);
                console.log(response);
            }
        })
})
// this changes the state of the image to animated or still upon click. 
$(document).on('click','.searchImage',function(){
   var state = $(this).attr('data-state'); 
   if(state == 'still'){
       $(this).attr('src',$(this).data('animated'));
       $(this).attr('data-state','animated');
    } else {
        $(this).attr('src',$(this).data('still'));
        $(this).attr('data-state','still');
    }
})

$('#addSearch').on('click',function(){
    var newSearch = $('input').eq(0).val();
    searchArray.push(newSearch);
    populateButtons(searchArray, "searchButton", "#buttonsArea");
    return false;

})