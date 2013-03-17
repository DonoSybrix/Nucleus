goog.provide('Game.EntitySystem.ComponentContainer');
goog.require('Game.Component');
goog.require('Game.Private.Key');

/**
 * Container for components.
 * @constructor
 * @author Donovan ORHAN <dono@sybrix.fr>
 */
Game.EntitySystem.ComponentContainer = function() 
{
	/**
	* List of components.
	* @type {Array.<Game.Component>}
	* @private
	*/
	this.components = [];

	/**
	* Key generated with components.
	* @type {Game.Private.Key}
	* @private
	*/
	this.key = new Game.Private.Key();

};

/**
 * Add a component.
 * @param {Game.Component} component Component to add.
 */
Game.EntitySystem.ComponentContainer.prototype.add = function( component ) 
{
	this.components[component.getComponentName()] = component;
	this.key.allow( component.getComponentName() );
};

/**
 * Remove a component.
 * @param {Game.Component} component Component to remove.
 */
Game.EntitySystem.ComponentContainer.prototype.remove = function( component ) 
{
    var index = this.components.indexOf( component.getComponentName() );
    this.components.splice(index, 1);
	this.key.denied( component.getComponentName() );
};

/**
 * Return the asked component for the given entity.
 * @param {string} componentName Name of the component asked.
 * @return {Game.Component} The asked component.
 */
Game.EntitySystem.ComponentContainer.prototype.get = function( componentName ) 
{
	return this.components[componentName];
};

/**
 * Return container's key.
 * @return {Game.Private.Key} The container key.
 */
Game.EntitySystem.ComponentContainer.prototype.getKey = function() 
{
	return this.key;
};