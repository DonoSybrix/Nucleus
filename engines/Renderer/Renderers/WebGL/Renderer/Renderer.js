goog.provide('Renderer.WebGLRenderer');
goog.require('Renderer.Renderer');
goog.require('Renderer.WebGL.ContextManager');
goog.require('Renderer.WebGL.TextureFactory');

/**
 * The WebGL renderer.
 * @constructor
 * @implements {Renderer.Renderer}
 * @param {HTMLElement} canvas Canvas to use as a renderer.
 * @author Donovan ORHAN <dono@sybrix.fr>
 */
Renderer.WebGLRenderer = function( canvas ) 
{
	/**
	* Context for this renderer.
	* @type {WebGLRenderingContext}
	* @private
	*/
	this.context = Renderer.WebGL.ContextManager.getInstance().create( canvas );

	/**
	* Texture factory for this renderer.
    * @type {Renderer.WebGL.TextureFactory}
    * @private
	*/
	this.textureFactory = new Renderer.WebGL.TextureFactory( this.context );

};

/**
 * Method called before the rendering.
 */
Renderer.WebGLRenderer.prototype.preRendering = function() 
{
    this.context.clear( goog.webgl.COLOR_BUFFER_BIT | goog.webgl.DEPTH_BUFFER_BIT );
    this.context.clearColor(0.0, 0.0, 0.0, 1.0);
};

/**
 * Method called after the rendering.
 */
Renderer.WebGLRenderer.prototype.postRendering = function() 
{

};

/**
 * Rendering method.
 */
Renderer.WebGLRenderer.prototype.rendering = function() 
{

};

/**
 * Return a reference to the context manager.
 * @return {Renderer.WebGL.ContextManager} A reference to the context manager.
 */
Renderer.WebGLRenderer.prototype.getContextManager = function() 
{
	return Renderer.WebGL.ContextManager.getInstance();
};

/**
 * Return the renderer's height.
 * @return {number} Height of the renderer in pixels.
 */
Renderer.WebGLRenderer.prototype.getHeight = function() 
{
	return 0;
};

/**
 * Return the factory for this renderer.
 * @return {Renderer.WebGL.TextureFactory} Texture's factory for this renderer.
 */
Renderer.WebGLRenderer.prototype.getTextureFactory = function() 
{
	return this.textureFactory;
};

/**
 * Return the renderer's width.
 * @return {number} Width of the renderer in pixels.
 */
Renderer.WebGLRenderer.prototype.getWidth = function() 
{
	return 0;
};