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
	* Last Texture binded.
    * @type {Renderer.WebGL.Texture|null}
    * @public
	*/
	this.texture = null;

};

/**
* Clear cache.
*/
Renderer.WebGL.RendererHelper.prototype.clear = function() 
{
	this.program  = null;
	this.texture  = null;
	this.geometry = null;
};


/**
* Change geometry in cache.
* @param {Renderer.Geometric.Geometry} geometry Geometry to use.
*/
Renderer.WebGL.RendererHelper.prototype.useGeometry = function( geometry ) 
{
	if( geometry != this.geometry )
	{
		this.geometry 				= geometry;
		this.geometryConfiguration 	= /** @type {Renderer.WebGL.GeometryConfiguration} */(this.geometry.getConfiguration());

		if( this.geometry.isDirty() ) {
			// this.geometry.update();
		}

		this.geometry.bind( this.program.getAttributs() );
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
* Change texture in cache.
* @param {Renderer.WebGL.Texture} texture Texture to use.
*/
Renderer.WebGL.RendererHelper.prototype.useTexture = function( texture ) 
{
	if( texture != this.texture )
	{
		this.texture = texture;
		this.texture.bind();
	}
};