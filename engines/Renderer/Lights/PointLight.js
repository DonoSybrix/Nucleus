goog.provide('Renderer.PointLight');
goog.require('Renderer.Private.AbstractLight');

/**
 * A point light.
 * @constructor
 * @extends Renderer.Private.AbstractLight
 * @author Donovan ORHAN <dono@sybrix.fr>
 */
Renderer.PointLight = function() 
{
    Renderer.Private.AbstractLight.call( this );
};
goog.inherits( Renderer.PointLight, Renderer.Private.AbstractLight );