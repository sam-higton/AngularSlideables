angular.module('angularSlideables', [])
.directive('slideable', function () {
    return {
        restrict:'A',
        scope: {
            slideable: '=slideable'
        },
        compile: function (element, attr) {
            console.log('compiling');
            // wrap tag
            var contents = element.html();
            element.html('<div class="slideable_content" style="margin:0 !important; padding:0 !important" >' + contents + '</div>');

            return function postLink(scope, element, attrs) {
                // default properties
                attrs.duration = (!attrs.duration) ? '1s' : attrs.duration;
                attrs.easing = (!attrs.easing) ? 'ease-in-out' : attrs.easing;
                element.css({
                    'overflow': 'hidden',
                    'height': '0px',
                    'transitionProperty': 'height',
                    'transitionDuration': attrs.duration,
                    'transitionTimingFunction': attrs.easing
                });
                scope.$watch('slideable', function(newVal,oldVal) {
                    var content = element.find('.slideable_content');
                    if(newVal) {
                        content[0].style.border = '1px solid rgba(0,0,0,0)';
                        var y = content[0].clientHeight;
                        content[0].style.border = 0;
                        element[0].style.height = y + 'px';
                    } else {
                        element[0].style.height = '0px';
                    }
                });
            };
        }

    };
});
