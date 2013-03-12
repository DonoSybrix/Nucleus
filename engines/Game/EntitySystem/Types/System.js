goog.provide('Game.System');
goog.require('Game.Entity');

/**
 * A system.
 * @constructor
 * @author Donovan ORHAN <dono@sybrix.fr>
 */
Game.System = function() 
{
	/**
	* Array of entities.
	* @type {Array.<Game.Entity>}
	* @private
	*/
	this.entities = [];

	/**
	* Entity count used by the system.
	* @type {number}
	* @private
	*/
	this.entityCount = 0;

	/**
	* State of the system.
	* @type {boolean}
	* @private
	*/
	this.active = true;

};

/**
 * Add an entity to the system.
 * @param {Game.Entity} entity A reference to the entity to add.
 */
Game.System.prototype.addEntity = function( entity ) 
{
	this.entities[this.entityCount] = entity;
	this.entityCount++;
};

/**
 * Call when the system is initialised.
 */
Game.System.prototype.init = function() { };

/**
 * Shutdown the system, remove elements.
 */
Game.System.prototype.shutdown = function() { };

/**
 * Update system's entities.
 */
Game.System.prototype.update = function() 
{
	for( var i = 0, len = this.entityCount; i < len; ++i ) 
	{
		this.updateEntity( this.entities[i] );
	}
};

/**
 * Update the given entity.
 * @param {Game.Entity} entity Entity to update.
 */
Game.System.prototype.updateEntity = function( entity ) { };