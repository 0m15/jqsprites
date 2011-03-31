/*
 * sprites.jquery – jQuery Sprites Plugin v0.2
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
 * Copyright 2011, Simone Carella
 * Use it without restrictions.
 *
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
 * Aim of this plugin is to let you use sprites as you
 * would do with normal <img> element. You just have to
 * add some parameters to the src string to make it work.
 *
 * The plugin will convert this:
 * <img class="sprite" src="sprite.png?x=35&y=120" width="64" height="64" class="pic">
 *
 * into this:
 * <div style="background:url(sprite.png) -35px -120px;width:64px;height:64px" class="sprite"></div>
 * 
 * How to use: 
 * $('img.selector').sprites();
 *
 * That's all. 
 *
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
 * UPDATES (v0.2):
 *
 * - Added sprite hover support to img
 *   <img src="sprite.png?x=20&y=0&hx=60&hy=0"> where 'hx' and 'hy' are the
 *   effective coordinates for the rollover state image
 *
 * - Improved parsing of querystring by using regex. 
 *
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
 * Date: Sun Mar 31 13:22:00 2011 +0100
 *
 */
 
(function() {
        
    $.fn.sprites = function(options) {
        var params = {}, 
            className, 
            src, 
            width, 
            height;
            
        var settings = {
            'defaultWidth'  : 64,
            'defaultHeight' : 64,
        };
                
   		function parseQs(qs) {
			var ex,
			    a = /\+/g,  // Regex for replacing addition symbol with a space
			    r = /([^&=]+)=?([^&]*)/g,
			    d = function (s) { return decodeURIComponent(s.replace(a, " ")); },
			    q = qs,
				tmp = {};

			    while (ex = r.exec(q)) {
			       tmp[d(ex[1])] = d(ex[2]);
				}
				
				return tmp;
		}
		
        if (options) {
            $.extend(settings, options);
        }
        
        return this.each(function() {
            var self = $(this), x, y, hx, hy;
            params = parseQs(self.attr('src').split('?')[1]);
            src = self.attr('src').split('?')[0];
            x = params['x'];
            y = params['y'];
			width = self.attr('width') || settings.defaultWidth;
            height = self.attr('height') || settings.defaultHeight;
			className = self.attr('class');
            
            var e = document.createElement('div');
            e.style.background = 'url(' + src + ') -' + x + 'px -' + y + 'px ';
            e.style.width = width + 'px';
            e.style.height = height + 'px';
            e.className = className; 
			
			self.replaceWith(e);
			
			if (params['hx'] || params['hy']) {
				hx = params['hx'];
				hy = params['hy'];
				
				$(e).bind('mouseover', function() {
					e.style.background = 'url(' + src + ') -' + hx + 'px -' + hy + 'px ';
				});
				
				$(e).bind('mouseout', function() {
					e.style.background = 'url(' + src + ') -' + x + 'px -' + y + 'px ';
				});
			}

            
        }); 
    }

})(jQuery);