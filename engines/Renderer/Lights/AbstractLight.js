goog.provide('Renderer.Private.AbstractLight');
goog.require('Renderer.Core.Spacial');

/**
 * An abstract light.
 * @constructor
 * @extends Renderer.Core.Spacial
 * @author Donovan ORHAN <dono@sybrix.fr>
 */
Renderer.Private.AbstractLight = function() 
{
    Renderer.Core.Spacial.call( this );

    /**
    * Light's color.
    * @type {goog.vec.Vec3.Float32}
    * @protected
    */
    this.color = goog.vec.Vec3.createFloat32FromValues( 1.0, 1.0, 1.0 );

    /**
    * Light's direction.
    * @type {goog.vec.Vec3.Float32}
    * @protected
    */
    this.direction = goog.vec.Vec3.createFloat32FromValues( 1.0, 1.0, 1.0 );

    /**
    * Light's attenuation.
    * @type {goog.vec.Vec3.Float32}
    * @protected
    */
    this.attenuation = goog.vec.Vec3.createFloat32FromValues( 0.0, 1.0, 0.0 );

    /**
    * Light's state.
    * @type {boolean}
    * @protected
    */
    this.brightening = true;

};
goog.inherits( Renderer.Private.AbstractLight, Renderer.Core.Spacial );

/**
 * Return light's attenuation.
 * @return {goog.vec.Vec3.Float32} The light attenuation.
 */
Renderer.Private.AbstractLight.prototype.getAttenuation = function() 
{
    return this.attenuation;
};

/**
 * Return light's color.
 * @return {goog.vec.Vec3.Float32} The light color.
 */
Renderer.Private.AbstractLight.prototype.getColor = function() 
{
    return this.color;
};

/**
 * Return light's direction.
 * @return {goog.vec.Vec3.Float32} The light direction.
 */
Renderer.Private.AbstractLight.prototype.getDirection = function() 
{
    return this.direction;
};

/**
 * Return the light's state.
 * @return {boolean} True if the light is turned on.
 */
Renderer.Private.AbstractLight.prototype.isTurnedOn = function() 
{
    return this.brightening;
};