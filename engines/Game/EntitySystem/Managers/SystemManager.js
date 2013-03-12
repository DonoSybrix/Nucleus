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
Game.EntitySystem.SystemManager.prototype.init = function() 
{ 
	for( var i = 0, len = this.systemCount; i < len; ++i ) 
	{
		this.systems[i].init();
	}
};

/**
 * Register an entity to systems.
 * @param {Game.Entity} entity Entity to register.
 * @param {Game.Private.Key} key Entity's key.
 */
Game.EntitySystem.SystemManager.prototype.registerEntity = function( entity, key ) 
{
	for( var i = 0, len = this.systemCount; i < len; ++i ) 
	{
		if( this.systems[i].key & key == this.systems[i].key )
		{
			this.systems[i].addEntity( entity );
		}
	}
};

/**
 * Shutdown systems.
 */
Game.EntitySystem.SystemManager.prototype.shutdown = function() 
{
	for( var i = 0, len = this.systemCount; i < len; ++i ) 
	{
		this.systems[i].shutdown();
	}
};

/**
 * Update systems.
 */
Game.EntitySystem.SystemManager.prototype.update = function() 
{
	for( var i = 0, len = this.systemCount; i < len; ++i ) 
	{
		this.systems[i].process();
	}
};