goog.provide('Renderer.WebGL.RendererHelper');
goog.require('Renderer.WebGL.Program');
goog.require('Renderer.WebGL.GeometryConfiguration');
goog.require('Renderer.WebGL.Texture');

/**
 * The WebGL renderer helper/cache.
 * @constructor
 * @author Donovan ORHAN <dono@sybrix.fr>
 */
Renderer.WebGL.RendererHelper = function() 
{
	/**
	* Last geometry binded.
	* @type {Renderer.Geometric.Geometry}
	*/
	this.geometry = null;

	/**
	* Last geometry configuration binded.
	* @type {Renderer.WebGL.GeometryConfiguration}
	*/
	this.geometryConfiguration = null;

	/**
	* Last Program binded.
	* @type {Renderer.WebGL.Program|null}
	* @public
	*/
	this.program = null;

	/**
	* Last Textures binded.
    * @type {Array.<Renderer.WebGL.Texture>}
    * @public
	*/
	this.textures = [];

	/**
	* Last Texture slot used.
    * @type {number}
    * @public
	*/
	this.textureSlot = goog.webgl.TEXTURE0;

};

/**
* Clear cache.
*/
Renderer.WebGL.RendererHelper.prototype.clear = function() 
{
	this.program  = null;
	this.texture  = null;
	this.geometry = null;
	this.textures = [];
};


/**
* Change geometry in cache.
* @param {Renderer.Geometric.Geometry} geometry Geometry to use.
* @param {WebGLRenderingContext} context A reference to the context.
*/
Renderer.WebGL.RendererHelper.prototype.useGeometry = function( geometry, context ) 
{
	if( geometry != this.geometry )
	{
		this.geometry 				= geometry;
		this.geometryConfiguration 	= /** @type {Renderer.WebGL.GeometryConfiguration} */(this.geometry.getConfiguration());

		if( this.geometry.isDirty() ) {
			// this.geometry.update();
		}

		this.geometryConfiguration.bindGeometry( this.program.getAttributs(), context );
	}
};

/**
* Change program in cache.
* @param {Renderer.WebGL.Program} program Program to use.
* @param {Renderer.Camera} camera Camera used by the renderer.
*/
Renderer.WebGL.RendererHelper.prototype.useProgram = function( program, camera  ) 
{
	if( program != this.program )
	{
		// Cache + bind.
		this.program = program;
		this.program.bind();

		// Set common uniforms values.
		var uniforms 			= this.program.getCommonUniforms();
		uniforms['uMvp'].data 	= camera.getMatrix();

		// Send them.
		this.program.sendCommonUniforms();
	}
};

/**
* Apply given material.
* @param {Renderer.Materials.Material} material Material to use.
* @param {WebGLRenderingContext} context A reference to the context.
*/
Renderer.WebGL.RendererHelper.prototype.useMaterial = function( material, context ) 
{
	var textures = material.getTextures();

	for( var i = 0, len = material.getTextureCount(); i < len; ++i ) 
	{
		var slot = (goog.webgl.TEXTURE0 + i) - goog.webgl.TEXTURE0;
		if( this.textures[slot] != textures[i] && textures[i].isReady() )
		{
        	context.activeTexture( goog.webgl.TEXTURE0 );
        	textures[i].bind();
        	this.textures[slot] = /** @type {Renderer.WebGL.Texture} */(textures[i]);
		}
	}
};