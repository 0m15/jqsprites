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
            height,
            animation,
            current;
            
        var settings = {
            'defaultWidth'  : 40,
            'defaultHeight' : 60,
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
                console.log(tmp);
                return tmp;
    	}
    	
    	function stop() {
    	    console.log('======== stop');
    	    window.clearInterval(animation);
    	    
    	}
    	
    	function animate(e, offset, current, x, y) {
             console.log('offset: ' + (current + offset));
             console.log('current: ' + current);
             e.style.background = 'url(' + src + ') -' + current + 'px -' + y + 'px ';
    	}
		
        if (options) {
            $.extend(settings, options);
        }
        
        return this.each(function() {
            var self = $(this), x, y, hx, hy, end, fps, timeout, frame = 1, offset, loop;
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
            
            
            
            if(params['animate'] && params['offset'] && params['end'] && params['fps']) {
                // fps to timeout = 1000 ms / number of frames
                // 1000 / 25 = 40 ms
                timeout = 1000 / parseInt(params['fps']);
                console.log(timeout);
                end = parseInt(params['end']);
                current = parseInt(x);
                offset = parseInt(params['offset']);
                frame += 1;
                loop = params['loop'];

                animation = window.setInterval(function() {
                     //console.log(parseInt(params['offset']));
                     //offset = parseInt(x);
                     current = current + offset;
                     console.log('loop: ' + loop);
                     
                     if (current > end && loop) {
                         console.log('========= end')
                         //stop();
                         //window.clearInterval(animation);
                         //animate(e, offset, current, x, y);
                         current = parseInt(x);
                         
                     } else if (current == end && !loop) {
                         window.clearInterval(animation);
                     }
                     
                     animate(e, offset, current, x, y);
                     
                }, timeout);
                
                                

                
                
            }
        }); 
    }
})(jQuery);