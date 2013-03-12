goog.provide('Game.System');
goog.require('Game.Entity');
goog.require('Game.Private.Key');

/**
 * A system.
 * @constructor
 * @author Donovan ORHAN <dono@sybrix.fr>
 */
Game.System = function() 
{

	/**
	* State of the system.
	* @type {boolean}
	* @private
	*/
	this.active = true;

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
	* Key of the system.
	* @type {Game.Private.Key}
	* @public
	*/
	this.key = new Game.Private.Key();

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
 * Method call after processing.
 */
Game.System.prototype.afterProcessing = function() { };

/**
 * Method call before processing.
 */
Game.System.prototype.beforeProcessing = function() { };

/**
 * Update system's entities.
 */
Game.System.prototype.process = function() 
{
	for( var i = 0, len = this.entityCount; i < len; ++i ) 
	{
		this.processEntity( this.entities[i] );
	}
};

/**
 * Update the given entity.
 * @param {Game.Entity} entity Entity to update.
 */
Game.System.prototype.processEntity = function( entity ) { };