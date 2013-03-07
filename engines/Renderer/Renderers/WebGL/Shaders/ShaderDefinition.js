goog.provide('Renderer.WebGL.ShaderDefinition');
goog.require('Renderer.WebGL.ShaderElement');

/**
 * Shader definition : Represent an encapsulated list of shader element.
 * @constructor
 * @author Donovan ORHAN <dono@sybrix.fr>
 */
Renderer.WebGL.ShaderDefinition = function() 
{
	/**
	* Array of elements.
	* @type {Array.<string, Renderer.WebGL.ShaderElement>}
	* @private
	*/
	this.elements = [];

	/**
	* Elements counter
	* @type {number}
	* @private
	*/
	this.elementCount = 0;

};

/**
 * Add an element.
 * @param {string} name Name of the element.
 * @param {number} count Number of element given.
 * @param {WebGL.Program.Type} type Type of the element.
 * @param {WebGL.Program.TypePrecision=} typePrecision Precision of the type [optional].
 * @param {WebGL.Program.Type=} itemType Type of an item for the given attributs [optional].
 */
Renderer.WebGL.ShaderDefinition.prototype.add = function( name, count, type, typePrecision, itemType ) 
{
	var element 		= new Renderer.WebGL.ShaderElement();
	element.type 		= type;
	element.count 		= count;
	element.precision 	= typePrecision || WebGL.Program.TypePrecision.LOW;
	element.itemType 	= itemType 		|| WebGL.Program.Type.FLOAT;

	this.elements[name] = element;
	this.elementCount++; 
};

/**
 * Return a reference to the array of elements.
 * @return {Array.<string, Renderer.WebGL.ShaderElement>} Array of ShaderElement.
 */
Renderer.WebGL.ShaderDefinition.prototype.getElements = function() 
{
	return this.elements;
};

/**
 * Return element count inside for this structure.
 * @return {number} Element count.
 */
Renderer.WebGL.ShaderDefinition.prototype.getElementCount = function() 
{
	return this.elementCount;
};