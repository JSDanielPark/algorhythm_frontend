var AnimateSR = function($) {
    "use strict";

    $('.navbar-collapse ul li a').click(function() {
        $('.navbar-toggle:visible').click();
    });

    sr.reveal('.sr-icons', {
        duration: 600,
        scale: 0.3,
        distance: '0px'
    }, 200);
    sr.reveal('.sr-button', {
        duration: 1000,
        delay: 200
    });
    sr.reveal('.sr-contact', {
        duration: 600,
        scale: 0.3,
        distance: '0px'
    }, 300);
    
    $('ul.navbar-nav>li').click(function() {
            $('#mainNav div.navbar-collapse').removeClass('in');
    });
}

module.exports = AnimateSR;
