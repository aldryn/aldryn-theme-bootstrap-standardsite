/*!
 * @author:    Divio AG
 * @copyright: http://www.divio.ch
 */

'use strict';
//######################################################################################################################
// #NAMESPACES#
var Cl = window.Cl || {};
/* global requirejs */

//######################################################################################################################
// #BASE#
jQuery(document).ready(function () {

    // set the correct js path
    requirejs.config({ 'baseUrl': Cl.static + 'js/' });

    // load modules using require
    require(['modules/cl.utils'], function() {
        // removes noscript form body and adds print-js
        Cl.Utils.document();
        // handles input placeholder="" attributes
        Cl.Utils.placeholders();
        // handles the viewport scaling for mobile devices
        Cl.Utils.viewport();
        // load default jquery widgets from addons/jquery.functions.js
        $('.popup').autoPopUp();
        $('.mailcrypte').mailCrypte();
    });

    // load mobilemenu
    require(['addons/cl.mobilemenu.min'], function () {
        new Cl.Mobilemenu({
            'bound': 739,
            'offset': {
                'top': -32
            }
        });
    });

    // adds standardsite specific features
    require(['modules/cl.standardsite'], function () {
        // handles fixed navigation and "top" link
        Cl.Standardsite.navigation();
    });

});