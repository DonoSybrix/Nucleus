goog.provide('Renderer.TextureFactory');

/**
 * Create textures.
 * @interface
 * @author Donovan ORHAN <dono@sybrix.fr>
 */
Renderer.TextureFactory = function() {};

/**
 * Return a new texture.
 * @return {Renderer.Texture} A new texture.
 */
Renderer.TextureFactory.prototype.create = function() {};