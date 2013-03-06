goog.provide('Renderer.AmbientLight');
goog.require('Renderer.Private.AbstractLight');

/**
 * Ambient light.
 * @constructor
 * @extends Renderer.Private.AbstractLight
 * @author Donovan ORHAN <dono@sybrix.fr>
 */
Renderer.AmbientLight = function() 
{
    Renderer.Private.AbstractLight.call( this );
};
goog.inherits( Renderer.AmbientLight, Renderer.Private.AbstractLight );
