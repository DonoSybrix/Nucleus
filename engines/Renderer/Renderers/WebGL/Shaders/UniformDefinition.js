goog.provide('Renderer.WebGL.UniformDefinition');

/**
 * Uniform definition : Structure of a uniform element.
 * @constructor
 * @author Donovan ORHAN <dono@sybrix.fr>
 */
Renderer.WebGL.UniformDefinition = function() 
{

	/**
	* Data.
	* @type {Array.<number>|Float32Array|number}
	* @public
	*/
	this.data = 0;

	/**
	* Id.
	* @type {number|WebGLUniformLocation}
	* @public
	*/
	this.id = -1;

	/**
	* Type of uniform.
	* @type {WebGL.Program.Type}
	* @public
	*/
	this.type = WebGL.Program.Type.FLOAT;

};