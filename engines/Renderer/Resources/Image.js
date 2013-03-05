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
	var thisCopy = this;
	this.data.onload = function() 
	{
        thisCopy.setSize( this.width, this.height );
		thisCopy.onResourceLoading();
        thisCopy.ready = true;
	};
	this.data.src = path;
};