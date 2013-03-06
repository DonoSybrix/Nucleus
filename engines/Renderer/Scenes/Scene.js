goog.provide('Renderer.Scene');
goog.require('Renderer.Private.AbstractLight');
goog.require('Renderer.AmbientLight');
goog.require('Renderer.Core.Spacial');

/**
 * A scene.
 * @constructor
 * @extends Renderer.Core.Spacial
 * @author Donovan ORHAN <dono@sybrix.fr>
 */
Renderer.Scene = function() 
{
    Renderer.Core.Spacial.call( this );

    /**
    * Ambient light.
    * @type {Renderer.AmbientLight}
    * @private
    */
    this.ambientLight = new Renderer.AmbientLight();

    /**
    * Scene's lights.
    * @type {Array.<Renderer.Private.AbstractLight>}
    * @private
    */
    this.lights = [];

    /**
    * Scene's lights counter.
    * @type {number}
    * @private
    */
    this.lightsCounter = 0;

};
goog.inherits( Renderer.Scene, Renderer.Core.Spacial );

/**
 * Add a light to the scène.
 * @param {Renderer.Private.AbstractLight} light Light to add. 
 */
Renderer.Scene.prototype.addLight = function( light )
{
	this.lights[this.lightsCounter] = light;
	this.lightsCounter++;
};

/**
 * Return scene's ambient light.
 * @return {Renderer.AmbientLight} A reference to the ambient light. 
 */
Renderer.Scene.prototype.getAmbientLight = function()
{
	return this.ambientLight;
};

/**
 * Return scene's lights.
 * @return {Array.<Renderer.Private.AbstractLight>} A reference to the scene's lights. 
 */
Renderer.Scene.prototype.getLights = function()
{
	return this.lights;
};

/**
 * Return scene's lights counter.
 * @return {number} Lights counter. 
 */
Renderer.Scene.prototype.getLightsCount = function()
{
	return this.lightsCounter;
};