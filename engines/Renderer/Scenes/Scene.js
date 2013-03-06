goog.provide('Renderer.Scene');
goog.require('Renderer.Spacial');

/**
 * A scene.
 * @constructor
 * @extends Renderer.Spacial
 * @author Donovan ORHAN <dono@sybrix.fr>
 */
Renderer.Scene = function() 
{
    Renderer.Spacial.call( this );

    /**
    * Scene's lights.
    * @type {Array.<number>}
    * @public
    */
    this.lights = [];

};
goog.inherits( Renderer.Scene, Renderer.Spacial );
