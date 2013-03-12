goog.provide('Game.Entity');

/**
 * An entity.
 * @constructor
 * @param {number} id Identifiant to use.
 * @author Donovan ORHAN <dono@sybrix.fr>
 */
Game.Entity = function( id ) 
{
    /**
    * Unique ID of the entity.
    * @type {number}
    * @private
    */
    this.id = id;
};

/**
 * Return the entity ID.
 * @return {number} Entity ID.
 */
Game.Entity.prototype.getId = function() 
{
    return this.id;
};