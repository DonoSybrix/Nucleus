goog.provide('Renderer.WebGL.FrameBuffer');
goog.require('Renderer.WebGL.Buffer');

/**
 * A WebGL renderer buffer. 
 * @constructor
 * @extends Renderer.WebGL.Buffer
 * @author Donovan ORHAN <dono@sybrix.fr>
 */
Renderer.WebGL.FrameBuffer = function() 
{
    Renderer.WebGL.Buffer.call( this );

    /**
    * Id of the buffer.
    * @type {WebGLFramebuffer}
    * @protected
    */
    this.id = this.contextReference.createRenderbuffer();

};
goog.inherits( Renderer.WebGL.FrameBuffer, Renderer.WebGL.Buffer );

/**
 * Bind the buffer.
 * @override
 */
Renderer.WebGL.FrameBuffer.prototype.bind = function() 
{
    this.contextReference.bindFramebuffer( goog.webgl.FRAMEBUFFER, this.id );
};