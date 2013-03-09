goog.provide('Renderer.WebGL.Buffer');
goog.require('goog.webgl');

/**
 * A WebGL buffer.
 * @constructor
 * @author Donovan ORHAN <dono@sybrix.fr>
 */
Renderer.WebGL.Buffer = function() 
{
    /**
    * Id of the buffer.
    * @type {WebGLBuffer|WebGLRenderbuffer|WebGLFramebuffer|null}
    * @protected
    */
    this.id = null;

    /**
    * Element count in the data.
    * @type {number}
    * @protected
    */
    this.elementCount = 0;

    /**
    * A reference to the renderering context (Optimisation).
    * @type {WebGLRenderingContext}
    * @protected
    */
    this.contextReference = Renderer.WebGL.ContextManager.getInstance().getCurrentContext();

};

/**
 * Bind the buffer. 
 */
Mango.Core.Buffer.prototype.bind = function() { };

/**
 * Fill the buffer. 
 * @param {ArrayBuffer} data Array with the data.
 */
Mango.Core.Buffer.prototype.fill = function( data ) { };
