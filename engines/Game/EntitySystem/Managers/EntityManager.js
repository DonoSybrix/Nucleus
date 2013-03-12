goog.provide('Game.EntitySystem.EntityManager');
goog.require('Game.Component');

/**
 * Manage entites.
 * @constructor
 * @param {Game.World} world Reference to the parent world.
 * @author Donovan ORHAN <dono@sybrix.fr>
 */
Game.EntitySystem.EntityManager = function( world ) 
{
	/**
	* Entity count.
	* @type {number}
	* @private
	*/
	this.entityCount = 0;

	/**
	* A reference to the parent world.
	* @type {Game.World}
	* @private
	*/
	this.world = world;

};

/**
 * Add a component to an entity.
 * @return {Game.Entity} A reference to the new entity.
 */
Game.EntitySystem.EntityManager.prototype.createEntity = function() 
{
 	return new Game.Entity( this.entityCount++, this.world );
};