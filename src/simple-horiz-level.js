
(function($) {
    
    //Constants
    const version = "1.0.0";
    const name = "simple-horiz-level";
    const debugging = true;

    //Default options
    var _defaultOptions = {
        lineColor: 'black',
        lineWidth: 1,
        margin: 0.5,                
        defaultColor: '#e0e0e0',
        scale: true,
        height: 100,
        showBorder: true,
        showPopover: false
    };

    //Creating factory
    var factory = function(input){
        var options = input.options || {};       
        if (this && this[0]){
            this.$element = this;
            var _options = {};
            $.extend(_options, _defaultOptions);         
            var _data = input.data || [];
            var _context = null;
            

            if (options) {                
                $.extend(_options, options);            
            }
            
            resize(this.$element, _options, _data);
            _context = this[0].getContext('2d');
            draw(_context, _options, _data);
            return this;
        }
    };

    function drawBorder(_context, _options){
        _context.strokeStyle = _options.lineColor;
        _context.strokeWith = _options.lineWidth;
        _context.strokeRect(_options.margin, _options.margin, _options.actWidth - (_options.margin * 2) - 3, _options.height - (2 * _options.margin));
    }

    function drawElement(_context,_options,item,index){
        _context.fillStyle = item.color;
        _context.fillRect(_options.margin + item.start, _options.margin, item.end, _options.height);

        if(_options.showPopover){
            
        }
    }

    function draw(_context, _options, _data) {
       
        for(i = 0;i<_data.length;i++){
            drawElement(_context,_options,_data[i],i);
        }
        if(_options.showBorder){
            drawBorder(_context, _options);
        }        

    }

    function resize($element, _options, _data) {
        
        if (_options.scale) {
            _options.actWidth = parseInt($element.parent().css('width')) - 5;
            $element.attr('width', _options.actWidth);
            if (_options.minHeight) {
                _options.actHeight = _options.minHeight;
            }
            else {
                _options.actHeight = parseInt($element.parent().css('height'));
            }
            if(_data && _data.length > 0){
                
            }
            $element.attr('height', _options.actHeight);

        }
        else {
            _options.actWidth = $element.width;
        }
        if(_data){
            _options.numberOfElements = _data.length;
            var sum = 0;
            for(i=0;i<_data.length;i++){
                
                sum = sum + _data[i].value;
            }
            _options.totalSum = sum;
            if(_options.totalSum > 0){
                var pos = 0;
                for(i=0;i<_data.length;i++){
                    if(_data[i].value === 0){
                        _data[i].prcnt =  0;
                    } else{
                        _data[i].prcnt = _options.totalSum / _data[i].value;
                    }
                    _data[i].start = pos;
                    _data[i].end = pos + (_options.actWidth / _options.totalSum) + (_options.actWidth / _options.totalSum * _data[i].value);
                    pos = _data[i].end;
                    console.log(_data[i])
                }
            } 

        }
    }

    //Logger
    var logger = function(message, arg){ 
        if(debugging) {
            console.log(message, arg);
        }
    }

    factory.version = version;
    $.fn.simpleHorizLevel = factory;
    logger('Module ' + name + ' added');
    
})(jQuery);