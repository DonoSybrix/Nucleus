goog.provide('Renderer.WebGL.TextureFactory');
goog.require('Renderer.TextureFactory');
goog.require('Renderer.WebGL.Texture');

/**
 * Create WebGL textures.
 * @constructor
 * @implements {Renderer.TextureFactory}
 * @param {WebGLRenderingContext} context Reference to the parent context.
 * @author Donovan ORHAN <dono@sybrix.fr>
 */
Renderer.WebGL.TextureFactory = function( context ) 
{
	/**
	* A reference to the parent context.
	* @type {WebGLRenderingContext}
	* @private
	*/
	this.parentContext = context;
};

/**
 * Return a new WebGL texture.
 * @return {Renderer.WebGL.Texture} A new texture.
 */
Renderer.WebGL.TextureFactory.prototype.create = function() 
{
	return new Renderer.WebGL.Texture( this.parentContext );
};