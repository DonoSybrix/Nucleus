goog.provide('Renderer.Private.Image');
goog.require('Renderer.Private.VisualResource');

/**
 * An image.
 * @constructor
 * @extends Renderer.Private.VisualResource
 * @author Donovan ORHAN <dono@sybrix.fr>
 */
Renderer.Private.Image = function() 
{
    Renderer.Private.VisualResource.call( this );

    /**
    * Id.
    * @type {Image}
    * @protected
    */
    this.data = new Image();

};
goog.inherits( Renderer.Private.Image, Renderer.Private.VisualResource );

/**
 * Load image from a file.
 * @param {string} path Path to the image file.
 * @override
 */
Renderer.Private.Image.prototype.loadFromFile = function( path ) 
{
	this.data.onload  = this.onLoad.bind( this, path );
    this.data.onerror = this.onError.bind( this, path );
	this.data.src = path;
};

/**
 * Call when the resource loading is successfull.
 * @param {string} path Location of the resource.
 * @override
 */
Renderer.Private.Image.prototype.onLoad = function( path ) 
{
    this.setSize( this.width, this.height );
    this.onResourceLoading();
    this.ready = true;
};