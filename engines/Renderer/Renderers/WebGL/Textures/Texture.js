goog.provide('Renderer.WebGL.Texture');
goog.require('Renderer.Private.Image');
goog.require('Renderer.Private.Video');
goog.require('Renderer.Texture');
goog.require('Renderer.WebGL.ContextManager');

/**
 * WebGL texture.
 * @constructor
 * @implements {Renderer.Texture}
 * @param {WebGLRenderingContext} context Reference to the parent context.
 * @author Donovan ORHAN <dono@sybrix.fr>
 */
Renderer.WebGL.Texture = function( context ) 
{
	/**
	* Check the context.
	*/
	context = context || Renderer.WebGL.ContextManager.getInstance().getCurrentContext();

    /**
    * Id.
    * @type {WebGLTexture}
    * @private
    */
    this.id = context.createTexture();

    /**
    * Source used by the texture.
    * @type {Renderer.Private.Image|Renderer.Private.Video|null}
    * @private
    */
    this.source = null;

    /**
    * State of the texture.
    * @type {boolean}
    * @private
    */
    this.ready = false;

};

/**
 * Bind the texture.
 */
Renderer.WebGL.Texture.prototype.bind = function() 
{
	var context = Renderer.WebGL.ContextManager.getInstance().getCurrentContext();
	context.bindTexture( goog.webgl.TEXTURE_2D, this.id );
};

/**
 * Create a texture of width the given dimensions.
 * @param {number} width Width of the texture in pixels.
 * @param {number} height Height of the texture in pixels.
 */
Renderer.WebGL.Texture.prototype.create = function( width, height ) 
{
	var context = Renderer.WebGL.ContextManager.getInstance().getCurrentContext();

	// Create source (Image here).
	this.source = this.createSource();

	// Set dimensions.
	this.source.setSize( width, height );

	// Bind texture to work with.
	this.bind();

	// Usual parameters.
	this.setFilters( goog.webgl.LINEAR_MIPMAP_NEAREST, goog.webgl.LINEAR );
	this.useMipmap();

  	// Blank texture.
	context.texImage2D( goog.webgl.TEXTURE_2D, 
						0, 
						goog.webgl.RGBA, 
						width, 
						height, 
						0, 
						goog.webgl.RGBA, 
						goog.webgl.UNSIGNED_BYTE, 
						null );

    // Unbind.
    Renderer.WebGL.Texture.unbind();
};

/**
 * Create source from file's type.
 * @param {string=} path Path to the image file.
 * @return {Renderer.Private.Image|Renderer.Private.Video} A new resource.
 */
Renderer.WebGL.Texture.prototype.createSource = function( path ) 
{
	// Create image or video ?
	if( path != undefined )
	{
		var re 			= /(?:\.([^.]+))?$/;
		var ext 		= re.exec(path)[1];
		var isVideo 	= (ext == "ogg" || ext == "webm") ? true : false;

		if( isVideo == true )
		{
			return new Renderer.Private.Video();
		}
	}

	return new Renderer.Private.Image();
};

/**
 * Fill the texture with the given data.
 * @param {HTMLImageElement|HTMLVideoElement|ImageData} data Data to send inside the texture.
 */
Renderer.WebGL.Texture.prototype.fill = function( data ) 
{
	var context = Renderer.WebGL.ContextManager.getInstance().getCurrentContext();

	// Bind texture to work with.
	this.bind();

	// Set filters.
	this.setFilters( goog.webgl.LINEAR, goog.webgl.LINEAR );

  	// Blank texture.
    context.pixelStorei( goog.webgl.UNPACK_FLIP_Y_WEBGL, 1);
    context.texImage2D( goog.webgl.TEXTURE_2D,
    					0,
    					goog.webgl.RGBA,
    					goog.webgl.RGBA,
    					goog.webgl.UNSIGNED_BYTE,
    					data );

    Renderer.WebGL.Texture.unbind();
    this.ready = true;
};

/**
 * Load resource from a file.
 * @param {string} path Path to the image file.
 */
Renderer.WebGL.Texture.prototype.loadFromFile = function( path ) 
{
	// Create source (Image here).
	this.source = this.createSource( path );

	// Now load.
	this.source.setCallbackOnLoadingCompleted( this.update.bind( this ) );
	this.source.loadFromFile( path );
};

/**
 * Set filters to apply on the texture.
 * @param {number} shrinkage Filter when texture is near.
 * @param {number} expansion Filter when texture is far.
 */
Renderer.WebGL.Texture.prototype.setFilters = function( shrinkage, expansion ) 
{
	var context = Renderer.WebGL.ContextManager.getInstance().getCurrentContext();

	context.texParameteri( goog.webgl.TEXTURE_2D, goog.webgl.TEXTURE_MIN_FILTER, shrinkage );
  	context.texParameteri( goog.webgl.TEXTURE_2D, goog.webgl.TEXTURE_MAG_FILTER, expansion );
};

/**
 * Unbind texture currently bind.
 */
Renderer.WebGL.Texture.unbind = function() 
{
	var context = Renderer.WebGL.ContextManager.getInstance().getCurrentContext();
	context.bindTexture( goog.webgl.TEXTURE_2D, null );
};

/**
 * Update texture with this source.
 */
Renderer.WebGL.Texture.prototype.update = function() 
{
	this.fill( this.source.getData() );
};

/**
 * Activate mipmap on the texture.
 */
Renderer.WebGL.Texture.prototype.useMipmap = function() 
{
	if( this.source.getWidth() == this.source.getHeight() )
	{
		var context = Renderer.WebGL.ContextManager.getInstance().getCurrentContext();
  		context.generateMipmap( goog.webgl.TEXTURE_2D );
	}
};

/**
 * Return the texture's ID.
 * @return {WebGLTexture} A reference to the ID.
 */
Renderer.WebGL.Texture.prototype.getId = function() 
{
	return this.id;
};

/**
 * Return the source's height.
 * @return {number} Height of the source in pixels.
 */
Renderer.WebGL.Texture.prototype.getHeight = function() 
{
	return this.source.getHeight();
};

/**
 * Return texture's source.
 * @return {Renderer.Private.Image|Renderer.Private.Video|null} Source used by this texture.
 */
Renderer.WebGL.Texture.prototype.getSource = function() 
{
	return this.source;
};

/**
 * Return the source's width.
 * @return {number} Width of the source in pixels.
 */
Renderer.WebGL.Texture.prototype.getWidth = function() 
{
	return this.source.getWidth();
};

/**
 * Return texture's state.
 * @return {boolean} State of the texture.
 */
Renderer.WebGL.Texture.prototype.isReady = function() 
{
	return this.ready;
};