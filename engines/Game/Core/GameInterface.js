goog.provide('Game.GameInterface');
goog.require('Core.AnimationFramerate');
goog.require('Game.State');
goog.require('Renderer.WebGLRenderer');

/**
 * Game.
 * @constructor
 * @author Donovan ORHAN <dono@sybrix.fr>
 */
Game.GameInterface = function() 
{
	/**
	* State actually used by the game.
	* @type {Game.State}
	* @private
	*/
	this.currentState = null;

	/**
	* State actually used by the game.
	* @type {Renderer.WebGLRenderer}
	* @private
	*/
	this.renderer = null;

};

/**
 * Prepare the game.
 */
Game.GameInterface.prototype.prepare = function() { };

/**
 * Good guy Dono : User friendly method :).
 */
Game.GameInterface.prototype.start = function()
{
	this.update();
};

/**
 * Start the game loop.
 */
Game.GameInterface.prototype.update = function()
{
	window.requestAnimFrame( this.update.bind(this) );

	if( this.currentState != null ) {
		this.currentState.update( this );
		this.currentState.render( this.renderer );
	}
};

/**
 * Clear the game.
 */
Game.GameInterface.prototype.clear = function()
{
	this.prepare();
};