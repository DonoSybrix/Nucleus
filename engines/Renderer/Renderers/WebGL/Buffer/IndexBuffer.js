goog.provide('Renderer.WebGL.IndexBuffer');
goog.require('Renderer.Geometric.GeometryConfiguration');
goog.require('Renderer.WebGL.Buffer');

/**
 * A WebGL index buffer. 
 * @constructor
 * @extends Renderer.WebGL.Buffer
 * @author Donovan ORHAN <dono@sybrix.fr>
 */
Renderer.WebGL.IndexBuffer = function() 
{
    Renderer.WebGL.Buffer.call( this );

    /**
    * Id of the buffer.
    * @type {WebGLBuffer}
    * @protected
    */
    this.id = this.contextReference.createBuffer();

    /**
    * Type of the buffer's data.
    * @type {number}
    * @protected
    */
    this.type = goog.webgl.UNSIGNED_BYTE;

};
goog.inherits( Renderer.WebGL.IndexBuffer, Renderer.WebGL.Buffer );

/**
 * Bind the buffer.
 * @override
 */
Renderer.WebGL.IndexBuffer.prototype.bind = function() 
{
    this.contextReference.bindBuffer( goog.webgl.ELEMENT_ARRAY_BUFFER, this.id );
};

/**
 * Fill the buffer. 
 * @param {ArrayBuffer|Uint8Array|Uint16Array|Uint32Array} data Array with the data.
 * @override
 */
Renderer.WebGL.IndexBuffer.prototype.fill = function( data ) 
{
    this.bind();
    this.contextReference.bufferData( goog.webgl.ELEMENT_ARRAY_BUFFER, data, goog.webgl.STATIC_DRAW );
};

/**
 * Get type of data used by the buffer.
 * @return {number} Indice type.
 */
Renderer.WebGL.IndexBuffer.prototype.getType = function() 
{
   return this.type;
};

/**
 * Set type of data used by the buffer.
 * @param {Renderer.Geometric.GeometryConfiguration.GeometryType} type Type of geometry.
 */
Renderer.WebGL.IndexBuffer.prototype.setType = function( type ) 
{
    if( type == Renderer.Geometric.GeometryConfiguration.GeometryType.SMALL ) {
        this.type = goog.webgl.UNSIGNED_BYTE;
    }
    else if( type == Renderer.Geometric.GeometryConfiguration.GeometryType.MEDIUM ) {
        this.type = goog.webgl.UNSIGNED_SHORT;
    }
    else {
        this.type = goog.webgl.UNSIGNED_INT;
    }
};
