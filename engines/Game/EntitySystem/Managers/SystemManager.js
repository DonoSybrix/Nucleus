goog.provide('Game.EntitySystem.SystemManager');
goog.require('Game.System');

/**
 * Manage systems.
 * @constructor
 * @param {Game.World} world Reference to the parent world.
 * @author Donovan ORHAN <dono@sybrix.fr>
 */
Game.EntitySystem.SystemManager = function( world ) 
{
	/**
	* List of systems.
	* @type {Array.<Game.System>}
	* @private
	*/
	this.systems = [];

	/**
	* System count.
	* @type {number}
	* @private
	*/
	this.systemCount = 0;

	/**
	* A reference to the parent world.
	* @type {Game.World}
	* @private
	*/
	this.world = world;

};

/**
 * Add a system.
 * @param {Game.System} system System to add.
 */
Game.EntitySystem.SystemManager.prototype.addSystem = function( system ) 
{
	this.systems[this.systemCount] = system;
	this.systemCount++;
};

/**
 * Init systems.
 */
Game.EntitySystem.SystemManager.prototype.init = function() { };

/**
 * Update systems.
 */
Game.EntitySystem.SystemManager.prototype.update = function() 
{
	for( var i = 0, len = this.systemCount; i < len; ++i ) 
	{
		this.systems[i].update();
	}
};

/**
 * Shutdown systems.
 */
 Game.EntitySystem.SystemManager.prototype.shutdown = function() { };