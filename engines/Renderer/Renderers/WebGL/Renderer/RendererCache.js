goog.provide('Renderer.WebGL.RendererCache');
goog.require('Renderer.WebGL.Program');
goog.require('Renderer.WebGL.Texture');

/**
 * The WebGL renderer cache.
 * @constructor
 * @author Donovan ORHAN <dono@sybrix.fr>
 */
Renderer.WebGL.RendererCache = function() 
{
	/**
	* Last Program binded.
	* @type {Renderer.WebGL.Program|null}
	* @public
	*/
	this.program = null;

	/**
	* Last Texture binded.
    * @type {Renderer.WebGL.Texture|null}
    * @public
	*/
	this.texture = null;

};

/**
* Clear cache.
*/
Renderer.WebGL.RendererCache.prototype.clear = function() 
{
	this.program = null;
	this.texture = null;
};

/**
* Change program in cache.
* @param {Renderer.WebGL.Program} program Program to use.
*/
Renderer.WebGL.RendererCache.prototype.setProgram = function( program ) 
{
	if( program != this.program )
	{
		this.program = program;
		this.program.bind();
	}
};

/**
* Change texture in cache.
* @param {Renderer.WebGL.Texture} texture Texture to use.
*/
Renderer.WebGL.RendererCache.prototype.setTexture = function( texture ) 
{
	if( texture != this.texture )
	{
		this.texture = texture;
		this.texture.bind();
	}
};