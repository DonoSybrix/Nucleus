goog.provide('Renderer.Private.Video');
goog.require('Renderer.Private.VisualResource');

/**
 * A video.
 * @constructor
 * @extends Renderer.Private.VisualResource
 * @author Donovan ORHAN <dono@sybrix.fr>
 */
Renderer.Private.Video = function() 
{
    Renderer.Private.VisualResource.call( this );

    /**
    * Id.
    * @type {HTMLVideoElement}
    * @protected
    */
    this.data = /** @type {HTMLVideoElement} */ ( document.createElement('video') );

    /**
    * Indicate if video will be auto-played.
    * @type {boolean}
    * @private
    */
    this.autoplay = true;

};
goog.inherits( Renderer.Private.Video, Renderer.Private.VisualResource );

/**
 * Load video from a file.
 * @param {string} path Path to the video file.
 * @override
 */
Renderer.Private.Video.prototype.loadFromFile = function( path ) 
{
    this.data.preload = "auto";
    this.data.addEventListener( "canplaythrough", this.onLoad.bind( this, path ), true );
    this.data.addEventListener( "error", this.onError.bind( this, path ), true );
    this.data.src = path;
};

/**
 * Call when the resource loading is successfull.
 * @param {string} path Location of the resource.
 * @override
 */
Renderer.Private.Video.prototype.onLoad = function( path ) 
{
    this.setSize( this.width, this.height );
    this.onResourceLoading();
    this.ready = true;

    if( this.autoplay )
    {
        this.play();
    }
};

/**
 * Pause video.
 */
Renderer.Private.Video.prototype.pause = function() 
{
    this.data.pause();
};

/**
 * Play video.
 */
Renderer.Private.Video.prototype.play = function() 
{
    this.data.play();
};

/**
 * Get video duration.
 * @return {number} Duration of the video.
 */
Renderer.Private.Video.prototype.getDuration = function() 
{
    return this.data.duration;
};