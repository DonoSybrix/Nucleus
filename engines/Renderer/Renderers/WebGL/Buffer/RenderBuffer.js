goog.provide('Renderer.WebGL.RendererBuffer');
goog.require('Renderer.WebGL.Buffer');

/**
 * A WebGL renderer buffer. 
 * @constructor
 * @extends Renderer.WebGL.Buffer
 * @author Donovan ORHAN <dono@sybrix.fr>
 */
Renderer.WebGL.RendererBuffer = function() 
{
    Renderer.WebGL.Buffer.call( this );

    /**
    * Id of the buffer.
    * @type {WebGLRenderbuffer}
    * @public
    */
    this.id = this.contextReference.createRenderbuffer();

};
goog.inherits( Renderer.WebGL.RendererBuffer, Renderer.WebGL.Buffer );

/**
 * Bind the buffer. 
 * @override
 */
Renderer.WebGL.RendererBuffer.prototype.bind = function() 
{
    this.contextReference.bindRenderbuffer( goog.webgl.RENDERBUFFER, this.id );
};

/**
 * Change the render buffer size.
 * @param {number} width Width to assign.
 * @param {number} height Height to assign.
 */
Renderer.WebGL.RendererBuffer.prototype.setSize = function( width, height ) 
{ 
    this.bind();
    this.contextReference.renderbufferStorage( goog.webgl.RENDERBUFFER, goog.webgl.DEPTH_COMPONENT16, width, height );
};