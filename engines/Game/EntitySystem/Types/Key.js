goog.provide('Game.Private.Key');

/**
 * A key.
 * @constructor
 * @author Donovan ORHAN <dono@sybrix.fr>
 */
Game.Private.Key = function() 
{
    /**
    * Key value.
    * @type {number}
    * @private
    */
    this.value = 0;

};

/**
* Contents name -> value correspondance.
* @type {Array.<string, number>}
*/
Game.Private.Key.data = [];

/**
* Indicate next component value.
* @type {number}
*/
Game.Private.Key.nextValue = 1;

/**
* Register a component to the key.
* @param {string} componentName Name of the component to allow.
*/
Game.Private.Key.prototype.allow = function( componentName ) 
{
    this.value |= this.getValue( componentName );
};

/**
* Unregister a component from the key.
* @param {string} componentName Name of the component to denied.
*/
Game.Private.Key.prototype.denied = function( componentName ) 
{
    this.value ^= this.getValue( componentName );
};

/**
* Unregister a component from the key.
* @param {string} componentName Name of the component to denied.
* @return {number} Value to give.
* @private
*/
Game.Private.Key.prototype.getValue = function( componentName ) 
{
    var componentValue = Game.Private.Key.data[componentName];

    // Don"t exist? Add the value!
    if( componentValue == undefined ) 
    {
        componentValue = Game.Private.Key.nextValue;
        Game.Private.Key.data[componentName] = componentValue;
        Game.Private.Key.nextValue = Game.Private.Key.nextValue << 1;
    }

    return componentValue;
};