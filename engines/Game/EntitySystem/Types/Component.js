goog.provide('Game.Component');
goog.require('Game.Entity');

/**
 * A component.
 * @constructor
 * @author Donovan ORHAN <dono@sybrix.fr>
 */
Game.Component = function() 
{
    /**
    * Owner of the component.
    * @type {Game.Entity}
    * @private
    */
    this.owner = null;

};

/**
 * Set component owner.
 * @param {Game.Entity} owner Owner to assign.
 */
Game.Component.prototype.setOwner = function( owner ) 
{
	this.owner = owner;
};

/**
 * Return owner of the component.
 * @return {Game.Entity} owner Reference to the owner.
 */
Game.Component.prototype.getOwner = function() 
{
	return this.owner;
};

/**
 * Return component name.
 * @return {string} Name of the component.
 */
Game.Component.prototype.getName = function() { return ''; };