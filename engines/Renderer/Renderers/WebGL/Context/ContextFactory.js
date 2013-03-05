goog.provide('Renderer.WebGL.ContextFactory');
goog.require('goog.webgl');


/**
 * Create WebGL contexts.
 * @constructor
 * @author Donovan ORHAN <dono@sybrix.fr>
 */
Renderer.WebGL.ContextFactory = function()
{

};

/**
 * Create a new WebGL context.
 * @param {HTMLElement} canvas Canvas to use as a renderer.
 * @return {WebGLRenderingContext} A new WebGL context.
 */
Renderer.WebGL.ContextFactory.prototype.create = function( canvas ) 
{
 	var gl = null;

    try
    {
        gl = canvas.getContext("experimental-webgl", { premultipliedAlpha: false, alpha: false } );
    }
    catch(e) {}

    if( gl === null )
    {
        alert('Missing context');
    }

    return gl;
};