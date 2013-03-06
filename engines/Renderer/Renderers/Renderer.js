goog.provide('Renderer.Renderer');
goog.require('Renderer.Camera');
goog.require('Renderer.Scene');
goog.require('Renderer.TextureFactory');

/**
 * Renderers's interface.
 * @interface
 * @author Donovan ORHAN <dono@sybrix.fr>
 */
Renderer.Renderer = function() {};

/**
 * Method called before the rendering.
 * @param {Renderer.Scene} scene Scene to draw.
 * @param {Renderer.Camera} camera Camera to use.
 */
Renderer.Renderer.prototype.preRendering = function( scene, camera ) {};

/**
 * Method called after the rendering.
 * @param {Renderer.Scene} scene Scene to draw.
 * @param {Renderer.Camera} camera Camera to use.
 */
Renderer.Renderer.prototype.postRendering = function( scene, camera ) {};

/**
 * Rendering method.
 * @param {Renderer.Scene} scene Scene to draw.
 * @param {Renderer.Camera} camera Camera to use.
 */
Renderer.Renderer.prototype.rendering = function( scene, camera ) {};

/**
 * Render the given scene with the given camera.
 * @param {Renderer.Scene} scene Scene to draw.
 * @param {Renderer.Camera} camera Camera to use.
 */
Renderer.Renderer.prototype.render = function( scene, camera ) {};

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