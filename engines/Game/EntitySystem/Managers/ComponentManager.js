goog.provide('Game.EntitySystem.ComponentManager');
goog.require('Game.Component');

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
	* @type {Array.<number, Array.<Game.Component> >}
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
	componentsContainer[componentsContainer.length] = component;
};