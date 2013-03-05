goog.provide('Renderer.Renderer');
goog.require('Renderer.TextureFactory');

/**
 * Renderers's interface.
 * @interface
 * @author Donovan ORHAN <dono@sybrix.fr>
 */
Renderer.Renderer = function() {};

/**
 * Method called before the rendering.
 */
Renderer.Renderer.prototype.preRendering = function() {};

/**
 * Method called after the rendering.
 */
Renderer.Renderer.prototype.postRendering = function() {};

/**
 * Rendering method.
 */
Renderer.Renderer.prototype.rendering = function() {};

/**
 * Return the renderer's height.
 * @return {number} Height of the renderer in pixels.
 */
Renderer.Renderer.prototype.getHeight = function() {};

/**
 * Return the renderer's texture factory.
 * @return {Renderer.TextureFactory} Texture's factory for this renderer.
 */
Renderer.Renderer.prototype.getTextureFactory = function() {};

/**
 * Return the renderer's width.
 * @return {number} Width of the renderer in pixels.
 */
Renderer.Renderer.prototype.getWidth = function() {};