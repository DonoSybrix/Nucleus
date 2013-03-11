goog.provide('Core.AnimationFramerate');

/**
* Used to make a fluide loop with all browser.
*/
window.requestAnimFrame = (function()
{
	return  window.requestAnimationFrame 		||
	      	window.webkitRequestAnimationFrame	||
	      	window.mozRequestAnimationFrame		||
	      	window.oRequestAnimationFrame		||
	      	window.msRequestAnimationFrame		||
	      	function( callback ){
	        	window.setTimeout(callback, 1000 / 60);
	      	};
})();