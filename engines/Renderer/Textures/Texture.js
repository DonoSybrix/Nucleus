goog.provide('Renderer.Texture');

/**
 * Textures's interface.
 * @interface
 * @author Donovan ORHAN <dono@sybrix.fr>
 */
Renderer.Texture = function() {};

/**
 * Return the texture's ID.
 * @return {WebGLTexture} A reference to the ID.
 */
Renderer.Texture.prototype.getId = function() {};

/**
 * Return the texture's width.
 * @return {number} Width in pixel.
 */
Renderer.Texture.prototype.getWidth = function() {};

/**
 * Return the texture's height.
 * @return {number} Height in pixel.
 */
Renderer.Texture.prototype.getHeight = function() {};