goog.provide('Game.Entity');

/**
 * An entity.
 * @constructor
 * @param {number} id Identifiant to use.
 * @param {Game.World} world Reference to the parent world.
 * @author Donovan ORHAN <dono@sybrix.fr>
 */
Game.Entity = function( id, world ) 
{
    /**
    * Unique ID of the entity.
    * @type {number}
    * @private
    */
    this.id = id;

	/**
	* A reference to the parent world.
	* @type {Game.World}
	* @private
	*/
	this.world = world;

};

/**
 * Activate the entity, register to systems.
 */
Game.Entity.prototype.activate = function() 
{
	this.world.getSystemManager().registerEntity( this, this.world.getComponentManager().getKey( this ) );
};

/**
 * Return the entity ID.
 * @return {number} Entity ID.
 */
Game.Entity.prototype.getId = function() 
{
    return this.id;
};

/**
 * Return the asked component.
 * @param {string} componentName Name of the component asked.
 * @return {Game.Component} A reference to the asked component.
 */
Game.Entity.prototype.getComponent = function( componentName ) 
{
    return this.world.getComponentManager().getComponent( this, componentName );
};