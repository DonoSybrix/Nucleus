goog.provide('Renderer.WebGLRenderer.ShaderBuilder');

/**
 * Shader builder : Decorate given shader.
 * @constructor
 * @author Donovan ORHAN <dono@sybrix.fr>
 */
Renderer.WebGLRenderer.ShaderBuilder = function() 
{

	/**
	* Indicate if the shader will use lighting.
	* @type {boolean}
	* @private
	*/
	this.useLight = true;

	/**
	* Indicate if the shader will use material properties.
	* @type {boolean}
	* @private
	*/
	this.useMaterial = true;

};

/** 
 * Lights max. in a scene.
 * @const
 * @type {number}
 */ 
Renderer.WebGLRenderer.ShaderBuilder.LIGHTS_MAX = 14;

/**
 * Remove the shader from GPU memory.
 * @param {string} source Source code to push inside the shader.
 * @return {string} Result source code.
 */
Renderer.WebGLRenderer.ShaderBuilder.prototype.build = function( source ) 
{
	var finalSource = '';

	// Add material structure.
	if( this.useMaterial )
	{
		finalSource += this.addMaterial();
	}

	// Add light structure.
	if( this.useLight )
	{
		finalSource += this.addLight();
	}

	// Add uniforms.
	// this.addUniforms();

	// Finally add main function.
	finalSource += this.addMain( source );

	return finalSource;
};

/**
 * Add light informations.
 * @return {string} Data to add to the source.
 */
Renderer.WebGLRenderer.ShaderBuilder.prototype.addLight = function() 
{
	var structure = this.addSection('Light structure');

	structure += 'struct Light \n';
	structure += '{ \n ';
	structure += '\tlowp vec3  position; \n';
	structure += '\tlowp vec3  direction; \n';
	structure += '\tlowp vec3  colour; \n ';
	structure += '} \n';

	return structure;
};

/**
 * Add main function.
 * @param {string} mainCode Main code.
 * @return {string} Data to add to the source.
 */
Renderer.WebGLRenderer.ShaderBuilder.prototype.addMain = function( mainCode ) 
{
	var structure = this.addSection('Main');

	structure += 'void main() \n';
	structure += '{ \n ';
	structure +=  mainCode + '\n';
	structure += '} \n ';

	return structure;
};

/**
 * Add material informations.
 * @return {string} Data to add to the source.
 */
Renderer.WebGLRenderer.ShaderBuilder.prototype.addMaterial = function() 
{
	var structure = this.addSection('Material structure');

	structure += 'struct Material \n';
	structure += '{ \n';
	structure += '\tlowp vec3  ambient; \n';
	structure += '\tlowp vec4  diffuse; \n';
	structure += '\tlowp vec3  specular; \n';
	structure += '\tlowp float shininess; \n';
	structure += '} \n';

	return structure;
};

/**
 * Add a section.
 * @param {string} sectionName Name of the section.
 * @return {string} Data to add to the source.
 */
Renderer.WebGLRenderer.ShaderBuilder.prototype.addSection = function( sectionName ) 
{
	var section = '';

	section += '\n';
	section += '////////////////////////////////// \n';
	section += '/// ' + sectionName + '\n';
	section += '////////////////////////////////// \n';

	return section;
};

/**
 * Remove lights presence in the shader.
 */
Renderer.WebGLRenderer.ShaderBuilder.prototype.removeLightSupport = function() 
{
	this.useLight = false;
};

/**
 * Remove lights presence in the shader.
 */
Renderer.WebGLRenderer.ShaderBuilder.prototype.removeMaterialSupport = function() 
{
	this.useMaterial = false;
};
