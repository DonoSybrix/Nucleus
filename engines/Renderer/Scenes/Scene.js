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

/**
 * Return the children of this spacial element.
 * @return {Array.<!Renderer.Spacial>} A reference to the children.
 */
Renderer.Scene.prototype.getChildren = function() 
{
    return this.children;
};