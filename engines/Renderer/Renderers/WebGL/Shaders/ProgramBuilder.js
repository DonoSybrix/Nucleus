goog.provide('Renderer.WebGL.ProgramBuilder');
goog.require('Renderer.WebGL.ShaderDefinition');
goog.require('Nucleus.ErrorManager');

/**
 * Shader builder : Build GLGS shaders.
 * @constructor
 * @param {Renderer.WebGL.Program=} program Program to use.
 * @author Donovan ORHAN <dono@sybrix.fr>
 */
Renderer.WebGL.ProgramBuilder = function( program ) 
{
	/**
	* List of attributs.
	* @type {Renderer.WebGL.ShaderDefinition}
	* @private
	*/
	this.attributList = new Renderer.WebGL.ShaderDefinition();

	/**
	* Code to put inside the fragment main.
	* @type {string}
	* @private
	*/
	this.fragmentMainCode = '';

	/**
	* Functions to add in the source code.
	* @type {Array.<string, {target: Renderer.WebGL.Shader.Type, code: string}>}
	* @private
	*/
	this.functionsCode = [];

	/**
	* A reference to the program we working on.
	* @type {Renderer.WebGL.Program}
	* @private
	*/
	this.program = program || new Renderer.WebGL.Program();

	/**
	* List of structures.
	* @type {Array.<string, Renderer.WebGL.ShaderDefinition>}
	* @private
	*/
	this.structureList = [];

	/**
	* List of uniforms.
	* @type {Renderer.WebGL.ShaderDefinition}
	* @private
	*/
	this.uniformList = new Renderer.WebGL.ShaderDefinition();

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

	/**
	* Indicate if the shader will use the default vertex structure.
	* @type {boolean}
	* @private
	*/
	this.useDefaultVertexStructure = true;

	/**
	* Code to put inside the vertex main.
	* @type {string}
	* @private
	*/
	this.vertexMainCode = '';

};

/** 
 * Lights max. in a scene.
 * @const
 * @type {number}
 */ 
Renderer.WebGL.ProgramBuilder.LIGHTS_MAX = 14;

/**
 * Add an attribut.
 * @param {string} name Name of the element.
 * @param {number} count Number of element given.
 * @param {WebGL.Program.Type} type Type of the element.
 * @param {WebGL.Program.TypePrecision=} precision Precision of the type [optional].
 * @private
 */
Renderer.WebGL.ProgramBuilder.prototype.addAttribut = function( name, count, type, precision ) 
{
	this.attributList.add( name, count, type, precision );
	this.program.addAttribut( name, type );
};

/**
 * Add uniform.
 * @param {string} name Name of the element.
 * @param {boolean} isCommon Say if we want a common uniform.
 * @param {number} count Number of element given.
 * @param {WebGL.Program.Type} type Type of the element.
 * @param {WebGL.Program.TypePrecision=} precision Precision of the type [optional].
 * @private
 */
Renderer.WebGL.ProgramBuilder.prototype.addUniform = function( name, isCommon, count, type, precision ) 
{
	this.uniformList.add( name, count, type, precision );

	if( isCommon )
	{
		this.program.addCommonUniform( name, type );
	}
	else
	{
		this.program.addModelUniform( name, type );
	}
};

/**
 * Add default attributs.
 * @private
 */
Renderer.WebGL.ProgramBuilder.prototype.addDefaultAttributs = function() 
{
	this.addAttribut('aPosition', 	3, WebGL.Program.Type.VEC3 );
	this.addAttribut('aColor', 	 	4, WebGL.Program.Type.VEC4 );
	this.addAttribut('aTexCoord', 	2, WebGL.Program.Type.VEC2 );
	this.addAttribut('aNormal', 	3, WebGL.Program.Type.VEC3 );
};

/**
 * Add default uniforms to the program.
 */
Renderer.WebGL.ProgramBuilder.prototype.addDefaultUniforms = function() 
{
	if( this.program == null ) {
    	Nucleus.ErrorManager.error('Program is null, ProgramBuilder can\'t add default uniforms.');
	}

	this.addUniform('uMvp', 		 true,  1, WebGL.Program.Type.MATRIX4, WebGL.Program.TypePrecision.MEDIUM );
	this.addUniform('uModel', 		 false, 1, WebGL.Program.Type.MATRIX4, WebGL.Program.TypePrecision.MEDIUM );
	this.addUniform('uAmbientLight', true,  1, WebGL.Program.Type.VEC3 );

	if( this.useMaterial )
	{
		var materialUniformName = 'uMaterial';

		this.addUniform( materialUniformName, false, 1, WebGL.Program.Type.STRUCTURE );

		// Add material data.		
	/*	var materialStructure = this.program.getUniformList().elements[materialUniformName];
		materialStructure.elements.add( materialUniformName + '.ambient',  	1, WebGL.Program.Type.VEC3 );
		materialStructure.elements.add( materialUniformName + '.diffuse', 	1, WebGL.Program.Type.VEC4 );
		materialStructure.elements.add( materialUniformName + '.specular', 	1, WebGL.Program.Type.VEC3 );
		materialStructure.elements.add( materialUniformName + '.shininess', 1, WebGL.Program.Type.FLOAT );*/
	}

	if( this.useLight )
	{
		var lightsUniformName = 'uLight';
		this.addUniform(lightsUniformName, true, 1, WebGL.Program.Type.STRUCTURE );

		// Add light one per one as a "sub-uniform".
		/*var lightStructure = this.program.getUniformList().elements[lightsUniformName];
		for( var i = 0, len = Renderer.WebGL.ProgramBuilder.LIGHTS_MAX; i < len; ++i ) 
		{
			var light = lightsUniformName + '[' + i + '].'; 
			lightStructure.elements.add( light + 'attenuation',  1, WebGL.Program.Type.VEC3 );
			lightStructure.elements.add( light + 'direction', 	 1, WebGL.Program.Type.VEC3 );
			lightStructure.elements.add( light + 'color', 		 1, WebGL.Program.Type.VEC3 );
		}*/
	}
};

/**
 * Add a function.
 * @param {string} name Name of the function.
 * @param {string} code Main code.
 * @param {Renderer.WebGL.Shader.Type} target Target source code (vertex or fragment).
 * @private
 */
Renderer.WebGL.ProgramBuilder.prototype.addFunction = function( name, code, target ) 
{
	this.functionsCode[name] = { target: target, code: code };
};

/**
 * Add light structure.
 * @private
 */
Renderer.WebGL.ProgramBuilder.prototype.addLightStructure = function() 
{
	var structure = new Renderer.WebGL.ShaderDefinition();
	structure.add( 'position', 	1,  WebGL.Program.Type.VEC3 );
	structure.add( 'direction', 1,  WebGL.Program.Type.VEC3 );
	structure.add( 'color', 	1, WebGL.Program.Type.VEC3 );
	this.addStructure( 'Light', structure );
};

/**
 * Add main function.
 * @param {string} code Main code.
 * @return {string} Data to add to the source.
 * @private
 */
Renderer.WebGL.ProgramBuilder.prototype.addMain = function( code ) 
{
	var structure = this.addSection('Main');

	structure += 'void main() \n';
	structure += '{ \n ';
	structure +=  code + '\n';
	structure += '} \n ';

	return structure;
};

/**
 * Add material structure.
 * @private
 */
Renderer.WebGL.ProgramBuilder.prototype.addMaterialStructure = function() 
{
	var structure = new Renderer.WebGL.ShaderDefinition();
	structure.add( 'ambient', 	1, WebGL.Program.Type.VEC3 );
	structure.add( 'diffuse', 	1, WebGL.Program.Type.VEC4 );
	structure.add( 'specular', 	1, WebGL.Program.Type.VEC3 );
	structure.add( 'shininess', 1, WebGL.Program.Type.FLOAT );
	this.addStructure( 'Material', structure );
};

/**
 * Add a section.
 * @param {string} sectionName Name of the section.
 * @return {string} Data to add to the source.
 * @private
 */
Renderer.WebGL.ProgramBuilder.prototype.addSection = function( sectionName ) 
{
	var section = '';

	section += '\n';
	section += '////////////////////////////////// \n';
	section += '/// ' + this.computeName( sectionName ) + '.\n';
	section += '////////////////////////////////// \n';

	return section;
};

/**
 * Reference a structure achitecture to the shader.
 * @param {string} structureName Targeted structure's name.
 * @param {Renderer.WebGL.ShaderDefinition} shaderElement Element to Add.
 */
Renderer.WebGL.ProgramBuilder.prototype.addStructure = function( structureName, shaderElement ) 
{
	this.structureList[structureName] = shaderElement;
};

/**
 * Compute an attribut.
 * @param {string} attributName Name of the attribut.
 * @param {Renderer.WebGL.ShaderElement} attribut Attribut. 
 * @param {boolean=} isAttribut Indicate if it's an attribut [optional].
 * @private
 */
Renderer.WebGL.ProgramBuilder.prototype.computeAttribut = function( attributName, attribut, isAttribut ) 
{
	var type = Renderer.WebGL.Shader.typeToString( attribut.type );
	var name = '';

	// Element in a structure or an attribut? Nothing to do.
	if( isAttribut == undefined || isAttribut == true )
	{
		name = attributName;
	}
	// Varying? Remove first letter and put a "v" letter.
	else
	{		
		name = 'v' + attributName.substring(1);
	}
	
	return attribut.precision + ' ' + type + ' ' + name + ';';
};


/**
 * Compute attributs.
 * @param {boolean} isFragment Indicate if we working with varyings or real attributs.
 * @return {string} Data to add to the source.
 * @private
 */
Renderer.WebGL.ProgramBuilder.prototype.computeAttributs = function( isFragment ) 
{
	var categorieName = (isFragment == false) ? 'attribute' : 'varying';

	var string 		= this.addSection( categorieName + 's');
	var attributs 	= this.attributList.getElements();

	for( var i in attributs ) 
	{
		string += categorieName + ' ' + this.computeAttribut( i, attributs[i], !isFragment ) + '\n';
	}

	return string;
};

/**
 * Compute given name.
 * @param {string} name Name to compute.
 * @return {string} Computed string.
 */
Renderer.WebGL.ProgramBuilder.prototype.computeName = function( name ) 
{
	return name.charAt(0).toUpperCase() + name.slice(1);
};

/**
 * Compute structures.
 * @return {string} Data to add to the source.
 * @private
 */
Renderer.WebGL.ProgramBuilder.prototype.computeStructures = function() 
{
	var string 		= '';

	for( var i in this.structureList )
	{
		string += this.addSection( i + ' structure');

		string += 'struct '+ i + '\n';
		string += '{\n';

			for( var j in this.structureList[i].elements )
			{
				string += '\t' + this.computeAttribut( j, this.structureList[i].elements[j] ) + '\n';
			}

		string += '};\n';
	}

	return string;
};

/**
 * Compute uniforms.
 * @return {string} Data to add to the source.
 * @private
 */
Renderer.WebGL.ProgramBuilder.prototype.computeUniforms = function() 
{
	var string = this.addSection('Uniforms');

	var categorieName = 'uniform';
	var type 	  	  = null;
	var array		  = '';
	var uniforms  	  = this.uniformList.getElements();	

	for( var i in uniforms ) 
	{
		// Compute array or not.
		if( uniforms[i].count > 1 ) 
		{
			array = '[' + uniforms[i].count + ']';
		}
		else 
		{
			array = '';
		}

		// Compute type
		if( uniforms[i].type == WebGL.Program.Type.STRUCTURE )
		{
			type  = i.substr(1);
		}
		else
		{
			type  = uniforms[i].precision + ' ' + Renderer.WebGL.Shader.typeToString( uniforms[i].type );			
		}

		// Create line.
		string += categorieName + ' ' + type + ' ' + i + array + '; \n';
	}

	return string;	
};

/**
 * Create a program from the configuration given.
 * @return {Renderer.WebGL.Program} A new program.
 */
Renderer.WebGL.ProgramBuilder.prototype.create = function() 
{
	// Generate source "headers".
	var sources = this.generate();

	// Add functions support here.
	// TODO: Add functions.

	// Finally add main function.
	sources.fragment += this.addMain( this.fragmentMainCode );
	sources.vertex 	+= this.addMain( this.vertexMainCode );

	// Load result inside the program.
	this.program.loadFromSources( sources.vertex, sources.fragment );

	return this.program;
};

/**
 * Generate shader. 
 * @return {{vertex: string, fragment: string}} Object with generated sources.
 */
Renderer.WebGL.ProgramBuilder.prototype.generate = function() 
{
	if( this.program == null ) {
    	Nucleus.ErrorManager.error('ProgramBuilder can\'t generate the given program.');
	}

	// Code to compilate.
	var result = {vertex: '', fragment: ''};

	// Add core structures.
	if( this.useMaterial ) 
	{ 
		this.addMaterialStructure();
	}

	if( this.useLight )	   
	{ 
		this.addLightStructure();
	}

	// Add attributs.
	this.addDefaultUniforms();
	this.addDefaultAttributs();

	// Compute structures.
	var structures 	 = this.computeStructures()
	result.vertex 	+= structures;
	result.fragment	+= structures;

	// Compute uniforms.
	var uniforms 	 = this.computeUniforms();
	result.vertex 	+= uniforms;
	result.fragment += uniforms;

	// Compute attributs.
	result.vertex 	+= this.computeAttributs( false );
	result.vertex 	+= this.computeAttributs( true );

	// Compute varying.
	result.fragment += this.computeAttributs( true );

	return result;
};

/**
 * Remove lights presence in the shader.
 */
Renderer.WebGL.ProgramBuilder.prototype.removeLightSupport = function() 
{
	this.useLight = false;
};

/**
 * Remove lights presence in the shader.
 */
Renderer.WebGL.ProgramBuilder.prototype.removeMaterialSupport = function() 
{
	this.useMaterial = false;
};

/**
 * Set the main code to use for the vertex.
 * @param {string} code Code to put inside the vertex main.
 */
Renderer.WebGL.ProgramBuilder.prototype.setVertexMainCode = function( code ) 
{
	this.vertexMainCode = code;
};

/**
 * Set the main code to use for the fragment.
 * @param {string} code Code to put inside the fragment main.
 */
Renderer.WebGL.ProgramBuilder.prototype.setFragmentMainCode = function( code ) 
{
	this.fragmentMainCode = code;
};

/**
 * Indicate to builder if It can use the default vertex structure.
 */
Renderer.WebGL.ProgramBuilder.prototype.usePersonalStructure = function() 
{
	this.useDefaultVertexStructure = true;
};

/**
 * Return the created program.
 * @return {Renderer.WebGL.Program} The created program.
 */
Renderer.WebGL.ProgramBuilder.prototype.getProgram = function() 
{
	return this.program;
};