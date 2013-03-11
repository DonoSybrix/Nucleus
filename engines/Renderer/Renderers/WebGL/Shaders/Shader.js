goog.provide('Renderer.WebGL.Shader');
goog.provide('WebGL.Program.Type');
goog.provide('WebGL.Program.TypePrecision');
goog.require('Nucleus.File');
goog.require('goog.webgl');

/**
 * Shader class.
 * @constructor
 * @param {Renderer.WebGL.Shader.Type} type Type of shader to create.
 * @author Donovan ORHAN <dono@sybrix.fr>
 */
Renderer.WebGL.Shader = function( type ) 
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
 * Enum for uniforms types.
 * @enum {number}
 */
WebGL.Program.Type = {
	MATRIX4 		: 0,
	MATRIX3			: 1,
	MATRIX   		: 2,
	TEXTURE 		: 3,
	VEC4 			: goog.webgl.FLOAT_VEC4,
	VEC3 			: goog.webgl.FLOAT_VEC3,
	VEC2 			: goog.webgl.FLOAT_VEC2,
	FLOAT 			: goog.webgl.FLOAT,
	UINT8ARRAY 		: 8,
	INT 			: goog.webgl.INT,
	UNSIGNED_BYTE 	: goog.webgl.UNSIGNED_BYTE,
	BOOLEAN 		: goog.webgl.BOOL,
	STRUCTURE 		: 12
};

/**
 * Enum for uniforms types precision.
 * @enum {string}
 */
WebGL.Program.TypePrecision = {
	LOW 		: 'lowp',
	MEDIUM		: 'mediump',
	HIGH   		: 'highp'
};

/**
 * Enum for shader types.
 * @enum {number}
 */
Renderer.WebGL.Shader.Type = {
	FRAGMENT 	: goog.webgl.FRAGMENT_SHADER,
	VERTEX		: goog.webgl.VERTEX_SHADER
};

/**
 * Remove the shader from GPU memory.
 * @param {string} source Source code to push inside the shader.
 */
Renderer.WebGL.Shader.prototype.fill = function( source ) 
{
	var context = Renderer.WebGL.ContextManager.getInstance().getCurrentContext();

	context.shaderSource( this.id, source );
	context.compileShader( this.id );

	this.ready = true;
};

/**
 * Remove the shader from GPU memory.
 */
Renderer.WebGL.Shader.prototype.clear = function() 
{
	Renderer.WebGL.ContextManager.getInstance().getCurrentContext().deleteShader( this.id );
};

/**
 * Convert type to a string equivalent.
 * @param {WebGL.Program.Type} type Type of the variable.
 * @return {string} Type equivalent in a string.
 * @see http://jsperf.com/switch-if-else/20 for informations about the "elseif" used.
 */
Renderer.WebGL.Shader.typeToString = function( type ) 
{
	if( type == WebGL.Program.Type.INT ) {
		return 'int';
	}
	else if( type == WebGL.Program.Type.FLOAT ) {
		return 'float';
	}
	else if( type == WebGL.Program.Type.VEC2 ) {
		return 'vec2';
	}
	else if( type == WebGL.Program.Type.VEC3 ) {
		return 'vec3';
	}
	else if( type == WebGL.Program.Type.VEC4 ) {
		return 'vec4';
	}
	else if( type == WebGL.Program.Type.TEXTURE ) {
		return 'sampler2D';
	}
	else if( type == WebGL.Program.Type.MATRIX3 ) {
		return 'mat3';
	}
	else if( type == WebGL.Program.Type.MATRIX4 ) {
		return 'mat4';
	}
	else if( type == WebGL.Program.Type.BOOLEAN ) {
		return 'bool';
	}

	return 'int';
};

/**
 * Return the shader "Id".
 * @return {WebGLShader} A reference to the shader ID.
 */
Renderer.WebGL.Shader.prototype.getId = function() 
{
	return this.id;
};

/**
 * Return the shader state.
 * @return {boolean} True if the shader is ready.
 */
Renderer.WebGL.Shader.prototype.isReady = function() 
{
	return this.ready;
};