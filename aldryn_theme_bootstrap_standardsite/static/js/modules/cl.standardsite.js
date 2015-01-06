'use strict';
//######################################################################################################################
/* global Cl */
Cl.Standardsite = {

    navigation: function () {
        var header = $('.header');
        var headerSpace = $('.header-space');
        var toolbar = $('.toolbar');
        var offset = 0;

        // setup
        headerSpace.height(header.outerHeight(true) - offset);

        // handles fixed positioned menu
        $(window).on('scroll.mainnav', function () {
            // cancel if on mobile
            if(Cl.Utils.mobile()) { return false; }

            if($(window).scrollTop() > toolbar.outerHeight(true)) {
                headerSpace.show();
                header.addClass('header-fixed');
            } else {
                headerSpace.hide();
                header.removeClass('header-fixed');
            }
        }).trigger('scroll.mainnav');

        // handles jump to top from within the menu on the bottom
        var topTrigger = $('.footnav li:first-child a');
        topTrigger.on('click', function (e) {
            e.preventDefault();
            // TODO use here cl.scroll
            $('html, body').animate({ 'scrollTop': 0 }, 100);
        });
    }

};