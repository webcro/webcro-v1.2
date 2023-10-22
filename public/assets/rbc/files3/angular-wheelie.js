/* angular-wheelie v3.0.1, (c) 2016-2017 Joel Mukuthu, MIT License, built: 06-03-2017 12:12:32 GMT+0100 */
"object"==typeof exports&&(module.exports="wheelie"),angular.module("wheelie",[]),angular.module("wheelie").factory("wheelie",[function(){var a=angular.isDefined,b=angular.isFunction;return{bind:function(c,d,e){function f(a){a.originalEvent&&(a=a.originalEvent),e&&angular.element(a.target).hasClass(e)||(a.deltaX&&(a.deltaX<0&&d.left&&d.left(a),a.deltaX>0&&d.right&&d.right(a)),a.deltaY&&(a.deltaY<0&&d.up&&d.up(a),a.deltaY>0&&d.down&&d.down(a)))}if(d=d||{},a(d.up)&&!b(d.up))throw new Error("The 'up' callback must be a function");if(a(d.down)&&!b(d.down))throw new Error("The 'down' callback must be a function");if(a(d.left)&&!b(d.left))throw new Error("The 'left' callback must be a function");if(a(d.right)&&!b(d.right))throw new Error("The 'right' callback must be a function");if(!(a(d.up)||a(d.down)||a(d.left)||a(d.right)))throw new Error("At least one callback ('up', 'down', 'left' or 'right') must be provided");c.data("___wheelie_bindWheel___",f),c.on("wheel",f)},unbind:function(a){var c=a.data("___wheelie_bindWheel___");b(c)&&(a.data("___wheelie_bindWheel___",null),a.off("wheel",c))}}}]);