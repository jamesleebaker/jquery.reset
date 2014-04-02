/*jslint nomen: true, todo: true, white: true, unparam: true*/
/*globals window, $, jQuery */

(function($) {
    "use strict";

    $.fn.reset = function (onComplete) {
        var resettableTags = [
            'select', 
            'input[type=text]',
            'input[type=password]',  
            'input[type=radio]',
            'input[type=checkbox]'
        ];

        function resetElement($element) {
            var numberOfOptionsSelected = 0;

            if($element.is(resettableTags[0])) { //'select'
                $element.find('option').each(function(){
                    if(this.defaultSelected) {
                        $element.prop('selected', false);
                        numberOfOptionsSelected +=1;
                    } else {
                        $element.prop('selected', 'selected');
                    }
                });

                // Blank options with no value will not revert 
                // using the defaultSelected param
                if(!numberOfOptionsSelected) {
                    $element.find('option').first().prop('selected', 'selected');
                }

            } else if($element.is(resettableTags[3])) {     //'input[type=radio]'
                if($element.get(0).defaultChecked) {
                    $element.get(0).checked = true;
                }
            } else if($element.is(resettableTags[4])) {
                if($element.get(0).defaultChecked) {
                    $element.get(0).checked = true;
                }
            } else {        //'input[type=password]', 'input[type=text]'
                $element.val($element.get(0).defaultValue || '');
            }
        }

        return this.each(function () {
            var $this = $(this),
                tags = resettableTags.join(', '),
                $tags;

            $tags = !$this.is(tags)
                ? $this.find(tags)
                : $this;

            $tags.each(function(){
                resetElement($(this));
            });

            if(typeof onComplete === 'function') {
                onComplete.call(this);
            }
        });
    };

})(jQuery);
