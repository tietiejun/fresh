
$.fn.extend({
    defaultValue: function(callback) {

        var nativePlaceholderSupport = (function(){
            var i = document.createElement('input');
            return ('placeholder' in i);
        })();

        if(nativePlaceholderSupport){
            return false;
        }

        return this.each(function(index, element) {

            if($(this).data('defaultValued')){
                return false;
            }

            var $input				=	$(this),
                defaultValue		=	$input.attr('placeholder');
            var	callbackArguments 	=	{'input':$input};

            $input.data('defaultValued', true);

            var $clone = createClone();

            callbackArguments.clone = $clone;

            $clone.insertAfter($input);

            var setState = function() {
                if( $input.val().length <= 0 ){
                    $clone.show();
                    $input.hide();
                } else {
                    $clone.hide();
                    $input.show().trigger('click');
                }
            };

            // Events for password fields
            $input.bind('blur', setState);

            // Create a input element clone
            function createClone(){

                var $el;

                if($input.context.nodeName.toLowerCase() == 'input') {
                    $el = $("<input />").attr({
                        'type'	: 'text'
                    });
                } else if($input.context.nodeName.toLowerCase() == 'textarea') {
                    $el = $("<textarea />");
                } else {
                    throw 'DefaultValue only works with input and textareas';
                }

                $el.attr({
                    'value'		: defaultValue,
                    'class'		: $input.attr('class')+' ui-input-ph',
                    'size'		: $input.attr('size'),
                    'style'		: $input.attr('style'),
                    'tabindex' 	: $input.attr('tabindex'),
                    'rows' 		: $input.attr('rows'),
                    'cols'		: $input.attr('cols'),
                    'name'		: 'defaultvalue-clone-' + (((1+Math.random())*0x10000)|0).toString(16).substring(1)
                });

                $el.focus(function(){

                    setTimeout(function () {
                        $input.focus();
                    }, 1);

                });

                return $el;
            }

            setState();

            if(callback){
                callback(callbackArguments);
            }

        });
    }
});