goog.provide('Renderer.SpotLight');
goog.require('Renderer.Private.AbstractLight');

/**
 * A spot light.
 * @constructor
 * @extends Renderer.Private.AbstractLight
 * @author Donovan ORHAN <dono@sybrix.fr>
 */
Renderer.SpotLight = function() 
{
    Renderer.Private.AbstractLight.call( this );
};
goog.inherits( Renderer.SpotLight, Renderer.Private.AbstractLight );