goog.provide('Renderer.WebGL.ShaderElement');
goog.require('WebGL.Program.Type');
goog.require('WebGL.Program.TypePrecision');

/**
 * Shader element.
 * @constructor
 * @author Donovan ORHAN <dono@sybrix.fr>
 */
Renderer.WebGL.ShaderElement = function() 
{
	/**
	* Id.
	* @type {number|WebGLUniformLocation}
	* @public
	*/
	this.id = -1;

	/**
	* Element count.
	* @type {number}
	* @public
	*/
	this.count = 1;

	/**
	* Data.
	* @type {Array.<number>|Float32Array|number}
	* @public
	*/
	this.data = 0;

	/**
	* Subelement list (Used by structure).
	* @type {Renderer.WebGL.ShaderDefinition}
	* @public
	*/
	this.elements = new Renderer.WebGL.ShaderDefinition();

	/**
	* Type of an item of the attributs (ex: color: UNSIGNED_BYE, position: FLOAT).
	* @type {WebGL.Program.Type}
	* @public
	*/
	this.itemType = WebGL.Program.Type.FLOAT;

	/**
	* Indicate if you want normalized data.
	* @type {boolean}
	* @public
	*/
	this.normalize = false;

	/**
	* Precision.
	* @type {WebGL.Program.TypePrecision}
	* @public
	*/
	this.precision = WebGL.Program.TypePrecision.LOW;

};