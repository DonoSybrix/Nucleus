goog.provide('Renderer.Private.VisualResource');
goog.require('Nucleus.ErrorManager');

/**
 * A visual resource.
 * @constructor
 * @author Donovan ORHAN <dono@sybrix.fr>
 */
Renderer.Private.VisualResource = function() 
{
    /**
    * Id.
    * @type {HTMLVideoElement|Image}
    * @protected
    */
    this.data = null;

    /**
    * Width.
    * @type {number}
    * @protected
    */
    this.width = 0;

    /**
    * Height.
    * @type {number}
    * @protected
    */
    this.height = 0;

    /**
    * Indicate state of the resource.
    * @type {boolean}
    * @protected
    */
    this.ready = false;

    /**
    * Function to call when loading is done.
    * @type {function(Renderer.Private.VisualResource)|null}
    * @private
    */
    this.callbackOnLoadingCompleted = null;

};

/**
 * Load image from a file.
 * @param {string} path Path to the image file.
 */
Renderer.Private.VisualResource.prototype.loadFromFile = function( path ) 
{
	var thisCopy = this;
	this.data.onload = function() 
	{
		thisCopy.onResourceLoading();
	};
	this.data.src = path;
};

/**
 * Call when the resource loading has encountered an error.
 * @param {string} path Location of the resource.
 */
Renderer.Private.VisualResource.prototype.onError = function( path ) 
{
    Nucleus.ErrorManager.warning('Resource \"' + path + '\" not found.');
};

/**
 * Call when the resource loading is successfull.
 * @param {string} path Location of the resource.
 */
Renderer.Private.VisualResource.prototype.onLoad = function( path ) { };

/**
 * Function to call when loading is done.
 */
Renderer.Private.VisualResource.prototype.onResourceLoading = function() 
{
	if( this.data.complete == true )
	{
		this.onResourceComplete();
	}
};

/**
 * Function to call when loading is done.
 */
Renderer.Private.VisualResource.prototype.onResourceComplete = function() 
{
	if( this.callbackOnLoadingCompleted != null )
	{
		this.callbackOnLoadingCompleted( this );
	}
};

/**
 * Function to call when loading is done.
 * @param {function(Renderer.Private.VisualResource)} callback Callback.
 */
Renderer.Private.VisualResource.prototype.setCallbackOnLoadingCompleted = function( callback ) 
{
	this.callbackOnLoadingCompleted = callback;
};

/**
 * Set visual resource's dimensions.
 * @param {number} width Width of the resource in pixels.
 * @param {number} height Height of the resource in pixels.
 */
Renderer.Private.VisualResource.prototype.setSize = function( width, height ) 
{
	this.width 	= width;
	this.height = height;
};

/**
 * Return the visual resource's height.
 * @return {number} Height of the visual resource in pixels.
 */
Renderer.Private.VisualResource.prototype.getHeight = function() 
{
	return this.height;
};

/**
 * Return the visual resource's width.
 * @return {number} Width of the visual resource in pixels.
 */
Renderer.Private.VisualResource.prototype.getWidth = function() 
{
	return this.width;
};

/**
 * Return the object.
 * @return {Image|HTMLVideoElement} Javascript object.
 */
Renderer.Private.VisualResource.prototype.getData = function() 
{
	return this.data;
};

/**
 * Return state of the resource.
 * @return {boolean} True if the resource is ready.
 */
Renderer.Private.VisualResource.prototype.isReady = function() 
{
    return this.ready;
};