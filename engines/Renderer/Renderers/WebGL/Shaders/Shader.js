goog.provide('Renderer.WebGLRenderer.Shader');
goog.require('Nucleus.File');

/**
 * Shader class.
 * @constructor
 * @param {Renderer.WebGLRenderer.Shader.Type} type Type of shader to create.
 * @author Donovan ORHAN <dono@sybrix.fr>
 */
Renderer.WebGLRenderer.Shader = function( type ) 
{
	/**
	* WebGL shader "ID".
	* @type {WebGLShader}
	* @private
	*/
	this.id = Renderer.WebGL.ContextManager.getInstance().getCurrentContext().createShader( type );

	/**
	* State of the shader.
	* @type {boolean}
	* @private
	*/
	this.ready = false;

};

/**
 * Enum for shader types.
 * @enum {number}
 */
Renderer.WebGLRenderer.Shader.Type = {
	FRAGMENT 	: goog.webgl.FRAGMENT_SHADER,
	VERTEX		: goog.webgl.VERTEX_SHADER
};

/**
 * Remove the shader from GPU memory.
 * @param {string} source Source code to push inside the shader.
 */
Renderer.WebGLRenderer.Shader.prototype.fill = function( source ) 
{
	var context = Renderer.WebGL.ContextManager.getInstance().getCurrentContext();

	context.shaderSource( this.id, source );
	context.compileShader( this.id );

	this.ready = true;
};

/**
 * Remove the shader from GPU memory.
 */
Renderer.WebGLRenderer.Shader.prototype.remove = function() 
{
	Renderer.WebGL.ContextManager.getInstance().getCurrentContext().deleteShader( this.id );
};

/**
 * Return the shader "Id".
 * @return {WebGLShader} A reference to the shader ID.
 */
Renderer.WebGLRenderer.Shader.prototype.getId = function() 
{
	return this.id;
};

/**
 * Return the shader state.
 * @return {boolean} True if the shader is ready.
 */
Renderer.WebGLRenderer.Shader.prototype.isReady = function() 
{
	return this.ready;
};