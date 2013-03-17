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
	this.world.getSystemManager().registerEntity( this, this.getKey() );
};

/**
 * Return the asked component.
 * @param {Game.Component} component Component to attach to the entity.
 */
Game.Entity.prototype.addComponent = function( component ) 
{
    this.world.getComponentManager().addComponent( this, component );
};

/**
 * Remove the asked component.
 * @param {string} componentName Name of the component to remove.
 */
Game.Entity.prototype.removeComponent = function( componentName ) 
{
    this.world.getComponentManager().removeComponent( this, componentName );
    // TODO: Remove from systems.
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
 * Return the entity key.
 * @return {Game.Private.Key} Entity key.
 */
Game.Entity.prototype.getKey = function() 
{
    return this.world.getComponentManager().getKey( this );
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