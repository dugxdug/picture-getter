$(document).ready(function() {
  $('#submit').click(function() {
    let request = new XMLHttpRequest();
    let keyword = $('#search').val();

    if (keyword === '') {
      keyword = 'mountains';
    }

    let url = 'https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=42a824d160d11e984d36e43256b43d49&tags=' + keyword + '&tag_mode=any&format=json&nojsoncallback=1';

    request.onreadystatechange = function() {
      if (this.readyState === 4 && this.status === 200) {
        let response = JSON.parse(this.responseText);
        let image = getElements(response);
        $('#results').attr('src', image);
      }
    }

    request.open("GET", url, true);
    request.send();

    getElements = function(response) {
      var index = getRandomInt(0, 100);
      var pic = response.photos.photo[index]
      var picUrl = `https://farm${pic.farm}.staticflickr.com/${pic.server}/${pic.id}_${pic.secret}.jpg`

      return picUrl;
    }

    function getRandomInt(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }
  });
});
