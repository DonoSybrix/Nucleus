goog.provide('Game.EntitySystem.ComponentManager');
goog.require('Game.Component');
goog.require('Game.EntitySystem.ComponentContainer');
goog.require('Game.Private.Key');

/**
 * Manage components.
 * @constructor
 * @param {Game.World} world Reference to the parent world.
 * @author Donovan ORHAN <dono@sybrix.fr>
 */
Game.EntitySystem.ComponentManager = function( world ) 
{
	/**
	* List of entities with assigned components.
	* @type {Array.<number, Game.EntitySystem.ComponentContainer>}
	* @private
	*/
	this.components = [];

	/**
	* A reference to the parent world.
	* @type {Game.World}
	* @private
	*/
	this.world = world;

};

/**
 * Add a component to an entity.
 * @param {Game.Entity} entity Futur component owner.
 * @param {Game.Component} component Component to attach to the entity.
 */
Game.EntitySystem.ComponentManager.prototype.addComponent = function( entity, component ) 
{
	// Set owner.
	component.setOwner( entity );

	// Add to the entity.
	var componentsContainer = this.components[entity.getId()];

	if( componentsContainer == undefined ) {
		componentsContainer = new Game.EntitySystem.ComponentContainer();
	}

	componentsContainer.add( component );
};

/**
 * Return the asked component for the given entity.
 * @param {Game.Entity} entity Entity asking component.
 * @param {string} componentName Name of the component asked.
 */
Game.EntitySystem.ComponentManager.prototype.getComponent = function( entity, componentName ) 
{
	return this.components[entity.getId()].get( componentName );
};

/**
 * Return entity's key.
 * @param {Game.Entity} entity Entity asking component.
 * @return {Game.Private.Key} componentName Name of the component asked.
 */
Game.EntitySystem.ComponentManager.prototype.getKey = function( entity ) 
{
	return this.components[entity.getId()].getKey();
};