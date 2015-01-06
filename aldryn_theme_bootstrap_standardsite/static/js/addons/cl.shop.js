/*!
 * @author      Angelo Dini - github.com/finalangel/classjs-plugins
 * @copyright   Distributed under the BSD License.
 * @version     1.3.4
 */

// ensure namespace is defined
window.Cl = window.Cl || {};
Cl.Shop = {};

(function($){
    'use strict';

    // sorting within product/product_list.html
    Cl.Shop.Sort = new Class({

        initialize: function (container) {
            this.form = $(container);
            this.elements = this.form.find('.sort input');
            // move to setup
            this._setup();
        },

        _setup: function () {
            var that = this;
            // attach form event
            this.elements.on('change', function (e) {
                e.preventDefault();
                // set active state
                that.form.find('.sort').removeClass('active');
                $(this).closest('.sort').addClass('active');
                // ajax reload content
                new Cl.Shop.Ajax({
                    'form': that.form
                });
            });
        }

    });

    // filters within product/product_list.html
    Cl.Shop.Filter = new Class({

        initialize: function (container) {
            this.form = $(container);
            this.triggers = this.form.find('.trigger');
            this.containers = this.form.find('.container');
            this.elements = this.form.find('.container input');
            // move to setup
            this._setup();
        },

        _setup: function () {
            var that = this;
            var speed = 300;
            // check if any container should be opened
            this.containers.each(function () {
                if($(this).closest('li').hasClass('expanded')) {
                    that.containers.eq(that.containers.index(this)).show();
                }
            });
            // attach open/close events
            this.triggers.on('click', function (e) {
                e.preventDefault();
                that.containers.eq(that.triggers.index(this)).toggle(speed).closest('li').toggleClass('expanded');
            });
            // attach form event
            this.elements.on('change', function () {
                // ajax reload content
                new Cl.Shop.Ajax({
                    'form': that.form
                });
            });
        }

    });

    // handles ajax pagination
    Cl.Shop.Pagination = new Class({

        initialize: function (container) {
            this.container = $(container);
            // move to setup
            this._setup();
        },

        _setup: function () {
            var that = this;

            this.container.delegate('#form-product-pagination a', 'click', function (e) {
                e.preventDefault();
                that._change($(this));
            });
        },

        _change: function (anchor) {
            var index = anchor.attr('href').replace('?page=', '');
            var form = anchor.closest('form');
            var input = form.find('#page-number');

            input.val(index);

            new Cl.Shop.Ajax({
                'form': form
            });
        }

    });

    // sorting within product/product_list.html
    Cl.Shop.Tabs = new Class({

        initialize: function (nav, containers) {
            this.nav = $(nav);
            this.containers = $(containers);
            this.triggers = this.nav.find('a');
            this.triggerParents = this.nav.find('li');
            // move to setup
            this._setup();
        },

        _setup: function () {
            var that = this;
            // setup elements
            this.nav.show();
            this.containers.hide().eq(0).show();

            // attach switch event
            this.triggers.on('click', function (e) {
                e.preventDefault();
                var index = that.triggers.index(this);
                // set correct tab
                that.triggerParents.removeClass('active').eq(index).addClass('active');
                that.containers.hide().eq(index).show();
            });
        }

    });

    // updates list area with new content from ajax request
    Cl.Shop.Ajax = new Class({

        initialize: function (options) {
            this.form = options.form;
            this.container = $('#product-container');
            this.pagination = $('.pagenav');
            this.loader = $('#product-loader');
            this.params = '';

            // gather all other forms
            this.forms = {
                'pagination': $('#form-product-pagination'),
                'sorting': $('#form-product-sorting'),
                'filters': $('#form-product-filters')
            };

            // trigger ajax load
            this._setup();
        },

        _setup: function () {
            var that = this;

            // show loader
            this.loader.show();

            // gather params
            $.each(this.forms, function (key, value) {
                if(value.serialize()) { that.params += '&' + value.serialize(); }
            });
            // remove first "&"
            this.params = this.params.replace('&', '?');

            // last initiate the ajax reload
            this._ajax();
        },

        _ajax: function () {
            var that = this;
            var speed = 300;

            $.ajax({
                'type': 'GET',
                'url': this.form.attr('action'),
                'dataType': 'html',
                'data': this.params.replace('?', '')+'&ajax=1',
                'success': function(html) {
                    // insert new html
                    that.container.hide().fadeIn(speed).html(html);
                    // set new url
                    if(window.history) { history.replaceState(null, 'Shop', that.params); }
                },
                'error': function() {
                    // reload
                    window.location.reload();
                }
            });
        }

    });

})(jQuery);