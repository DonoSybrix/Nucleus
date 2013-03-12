goog.provide('Game.World');
goog.require('Game.EntitySystem.ComponentManager');
goog.require('Game.EntitySystem.EntityManager');
goog.require('Game.EntitySystem.SystemManager');

/**
 * A world.
 * @constructor
 * @author Donovan ORHAN <dono@sybrix.fr>
 */
Game.World = function() 
{
	/**
	* Components manager.
	* @type {Game.EntitySystem.ComponentManager}
	* @private
	*/
	this.componentManager = new Game.EntitySystem.ComponentManager( this );

	/**
	* Entity manager.
	* @type {Game.EntitySystem.EntityManager}
	* @private
	*/
	this.entityManager = new Game.EntitySystem.EntityManager( this );

	/**
	* Systems manager.
	* @type {Game.EntitySystem.SystemManager}
	* @private
	*/
	this.systemManager = new Game.EntitySystem.SystemManager( this );

};

/**
 * Add a system.
 * @param {Game.System} system System to add.
 */
Game.World.prototype.addSystem = function( system ) 
{
	this.systemManager.addSystem( system );
};

/**
 * Add an entity to the system.
 * @return {Game.Entity} A new entity.
 */
Game.World.prototype.createEntity = function() 
{
	return this.entityManager.createEntity();
};

/**
 * Init the world.
 */
Game.World.prototype.init = function() 
{
	this.systemManager.init();
};

/**
 * Update.
 */
Game.World.prototype.update = function() 
{
	this.systemManager.update();
};

/**
 * Shutdown, clear the world.
 */
Game.World.prototype.shutdown = function() 
{ 
	this.systemManager.shutdown();
};

/**
 * Return a reference to the component manager.
 * @return {Game.EntitySystem.ComponentManager} A reference to the component manager.
 */
Game.World.prototype.getComponentManager = function() 
{ 
	return this.componentManager;
};

/**
 * Return a reference to the system manager.
 * @return {Game.EntitySystem.SystemManager} A reference to the system manager.
 */
Game.World.prototype.getSystemManager = function() 
{ 
	return this.systemManager;
};