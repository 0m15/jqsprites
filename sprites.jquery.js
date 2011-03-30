/*
 * sprites.jquery – jQuery Sprites Plugin v0.1
 *
 * Copyright 2011, Simone Carella
 * Use it without restrictions.
 * 
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
 * Date: Sun Mar 30 21:18:00 2011 +0100
 */
 
(function() {
        
    $.fn.sprites = function(options) {
        var attrs, 
            className, 
            src, 
            x, y, 
            width, 
            height;
            
        var settings = {
            'defaultWidth'  : 64,
            'defaultHeight' : 64,
        };
                
        function getX(str) {
            return getXY(str, 'x');
        }
        
        function getY(str) {
            return getXY(str, 'y');
        }
        
        function getXY(str, val) {
            var index = (val == 'x') ? 0 : 1;            
            return parseInt(str.split('?')[1].split('&')[index].replace(val + "=",""));
        }
        
        if (options) {
            $.extend(settings, options);
        }
        
        return this.each(function() {
            var self = $(this);
            attrs = self.attr('src');
            className = self.attr('class');
            src = attrs.split('?')[0];
            x = getX(attrs);
            y = getY(attrs);
            width = self.attr('width') || settings.defaultWidth;
            height = self.attr('height') || settings.defaultHeight;
            
            var e = document.createElement('div');
            
            e.style.background = 'url(' + src + ') -' + x + 'px -' + y + 'px ';
            e.style.width = width + 'px';
            e.style.height = height + 'px';
            e.className = className; 
            
            self.replaceWith(e);
        }); 
    }

})(jQuery);