goog.provide('Renderer.Core.Color');
goog.require('goog.vec.Vec4');

/**
 * A color wrapper.
 * @constructor
 * @author Donovan ORHAN <dono@sybrix.fr>
 */
Renderer.Core.Color = function() 
{
    /**
    * Color value.
    * @type {goog.vec.Float32}
    * @private
    */
    this.value = goog.vec.Vec4.createFloat32FromValues( 1.0, 1.0, 1.0, 1.0 );

};

/**
 * Return normalized color's value.
 * @return {goog.vec.Float32}
 */
Renderer.Core.Color.prototype.getValue = function() 
{
    return this.value;
};

/**
 * Set color from the given values.
 * @param {number} r Red value.
 * @param {number} g Green value.
 * @param {number} b Blue value.
 * @param {number} a Transparent value.
 */
Renderer.Core.Color.prototype.setFromValues = function( r, g, b, a ) 
{
    this.value[0] = r;
    this.value[1] = g;
    this.value[2] = b;
    this.value[3] = a;
};