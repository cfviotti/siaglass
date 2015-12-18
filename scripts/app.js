$(document).foundation();

$(".products__item").click(function(){
    slideIndex = $(this).index();
});

$(document).on('opened.fndtn.reveal', '[data-reveal]', function () {
    var modal = $(this);
    $('.slick').slick({
    	initialSlide: parseInt(slideIndex),
    	cssEase: 'cubic-bezier(.55,0,.1,0)',
    	speed: 800,
      dots: true,
    });
});



$(document).on('closed.fndtn.reveal', '[data-reveal]', function () {
    var modal = $(this);
    $('.slick').slick('unslick');
});

$('.modal-trigger').click(function () {
    $(this).addClass('active');
    var modalContent = $(this).find('.modal-content-trigger').children().clone();
    $('.modal__content').html(modalContent);
    var modalOffset = $(window).scrollTop() + 48;
    $('.modal').css('top', modalOffset);
    $('.modal').fadeIn();
    $('.modal-bg').fadeIn();

});

$('.modal-close, .modal-bg').click(function (e) {
    $('.modal-trigger.active').removeClass('active');
    $('.modal-bg').fadeOut();
    $('.modal').fadeOut(function(){
    $('.modal__content').empty();
    });
    e.stopPropagation();

});

$(document).ready(function () {
    $(document).on("scroll", onScroll);

    $('.main-nav__link').on('click', function (e) {
      e.preventDefault();
      $(document).off("scroll");

      $('.main-nav__item').each(function () {
        $(this).removeClass('active');
      })
      $(this).parent('.main-nav__item').addClass('active');

      var target = this.hash;
      var navHeight = $('.main-nav').height();
      $target = $(target);
      $('html, body').stop().animate({
        'scrollTop': $target.offset().top-navHeight+2
      }, 1000, function () {
        window.location.hash = target;
        $(document).on("scroll", onScroll);
      });
    });
  });

  function onScroll(event){
    var scrollPosition = $(document).scrollTop();
    $('.main-nav__item').each(function () {
      var currentLink = $(this);
      var refElement = $(currentLink.children('.main-nav__link').attr("href"));
      var navHeight = $('.main-nav').height();
      if (refElement.position().top-navHeight+2 <= scrollPosition && refElement.position().top+navHeight-2 + refElement.height() > scrollPosition) {
        $('.main-nav__item').removeClass("active");
        currentLink.addClass("active");
      }
      else{
        currentLink.removeClass("active");
      }
    });
  }


$(document).ready(function(){
    $("#sticker").sticky({topSpacing:0});
  });

$(document).ready(function() {
  google.maps.event.addDomListener(window, 'load', init);
  var map;

  function init() {
    var mapOptions = {
      center: new google.maps.LatLng(-15.803151, -47.954986),
      zoom: 15,
      zoomControl: true,
      zoomControlOptions: {
        style: google.maps.ZoomControlStyle.DEFAULT,
      },
      disableDoubleClickZoom: true,
      mapTypeControl: false,
      scaleControl: false,
      scrollwheel: false,
      panControl: false,
      streetViewControl: false,
      draggable: false,
      overviewMapControl: false,
      overviewMapControlOptions: {
        opened: false,
      },
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      styles: [{
        "featureType": "all",
        "elementType": "all",
        "stylers": [{
          "visibility": "simplified"
        }, {
          "saturation": "0"
        }, {
          "hue": "#ff0008"
        }]
      }],
    }
    var mapElement = document.getElementById('mapa');
    var map = new google.maps.Map(mapElement, mapOptions);
    var locations = [
      ['Sia Glass', 'undefined', '61 3233-3239', 'contato@siaglass.com.br', 'undefined', -15.803151, -47.954986, 'https://mapbuildr.com/assets/img/markers/solid-pin-orange.png']
    ];
    for (i = 0; i < locations.length; i++) {
      if (locations[i][1] == 'undefined') {
        description = '';
      } else {
        description = locations[i][1];
      }
      if (locations[i][2] == 'undefined') {
        telephone = '';
      } else {
        telephone = locations[i][2];
      }
      if (locations[i][3] == 'undefined') {
        email = '';
      } else {
        email = locations[i][3];
      }
      if (locations[i][4] == 'undefined') {
        web = '';
      } else {
        web = locations[i][4];
      }
      if (locations[i][7] == 'undefined') {
        markericon = '';
      } else {
        markericon = locations[i][7];
      }
      marker = new google.maps.Marker({
        icon: markericon,
        position: new google.maps.LatLng(locations[i][5], locations[i][6]),
        map: map,
        title: locations[i][0],
        desc: description,
        tel: telephone,
        email: email,
        web: web
      });
      link = '';
      bindInfoWindow(marker, map, locations[i][0], description, telephone, email, web, link);
    }

    function bindInfoWindow(marker, map, title, desc, telephone, email, web, link) {
      var infoWindowVisible = (function() {
        var currentlyVisible = false;
        return function(visible) {
          if (visible !== undefined) {
            currentlyVisible = visible;
          }
          return currentlyVisible;
        };
      }());
      iw = new google.maps.InfoWindow();
      google.maps.event.addListener(marker, 'click', function() {
        if (infoWindowVisible()) {
          iw.close();
          infoWindowVisible(false);
        } else {
          var html = "<div style='color:#000;background-color:#fff;padding:5px;width:150px;'><h4>" + title + "</h4><p>" + telephone + "<p><a href='mailto:" + email + "' >" + email + "<a></div>";
          iw = new google.maps.InfoWindow({
            content: html
          });
          iw.open(map, marker);
          infoWindowVisible(true);
        }
      });
      google.maps.event.addListener(iw, 'closeclick', function() {
        infoWindowVisible(false);
      });
    }
  }
});

