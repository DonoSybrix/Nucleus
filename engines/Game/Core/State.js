goog.provide('Game.State');

/**
 * A game state.
 * @interface
 * @author Donovan ORHAN <dono@sybrix.fr>
 */
Game.State = function() { };

/**
* Call when the state passing inactif.
* @param {Game.GameInterface} game A reference to the game object.
*/
Game.State.prototype.end = function( game ) { };

/**
* Rendering stuff will be here.
* @param {Renderer.WebGLRenderer} renderer A reference to the renderer.
*/
Game.State.prototype.render = function( renderer ) { };

/**
* Call when the state start to be actif.
* @param {Game.GameInterface} game A reference to the game object.
*/
Game.State.prototype.start = function( game ) { };

/**
* Working on the rendering logic.
* @param {Game.GameInterface} game A reference to the game object.
*/
Game.State.prototype.update = function( game ) { };