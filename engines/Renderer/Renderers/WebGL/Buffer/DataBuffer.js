goog.provide('Renderer.WebGL.VertexBuffer');
goog.require('Renderer.WebGL.Buffer');

/**
 * A WebGL data buffer. 
 * @constructor
 * @extends Renderer.WebGL.Buffer
 * @author Donovan ORHAN <dono@sybrix.fr>
 */
Renderer.WebGL.DataBuffer = function() 
{
    Renderer.WebGL.Buffer.call( this );

    /**
    * Id of the buffer.
    * @type {WebGLBuffer}
    * @public
    */
    this.id = this.contextReference.createBuffer();

};
goog.inherits( Renderer.WebGL.DataBuffer, Renderer.WebGL.Buffer );

/**
 * Bind the buffer. 
 * @override
 */
Renderer.WebGL.DataBuffer.prototype.bind = function() 
{
    this.contextReference.bindBuffer( goog.webgl.ARRAY_BUFFER, this.id );
};

/**
 * Fill the buffer. 
 * @param {ArrayBuffer} data Array with the data.
 * @override
 */
Renderer.WebGL.DataBuffer.prototype.fill = function( data ) 
{
    this.bind();
    this.contextReference.bufferData( goog.webgl.ARRAY_BUFFER, data, goog.webgl.STATIC_DRAW );
};
