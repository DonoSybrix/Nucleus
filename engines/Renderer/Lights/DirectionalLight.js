goog.provide('Renderer.DirectionalLight');
goog.require('Renderer.Private.AbstractLight');

/**
 * A directional light : Light with a specified direction.
 * @constructor
 * @extends Renderer.Private.AbstractLight
 * @author Donovan ORHAN <dono@sybrix.fr>
 */
Renderer.DirectionalLight = function() 
{
    Renderer.Private.AbstractLight.call( this );
};
goog.inherits( Renderer.DirectionalLight, Renderer.Private.AbstractLight );