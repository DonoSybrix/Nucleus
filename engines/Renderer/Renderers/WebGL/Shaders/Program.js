goog.provide('Renderer.WebGL.Program');
goog.require('Renderer.WebGL.Shader');
goog.require('Renderer.WebGL.ShaderDefinition');
goog.require('Nucleus.ErrorManager');

/**
 * A program.
 * @constructor
 * @author Donovan ORHAN <dono@sybrix.fr>
 */
Renderer.WebGL.Program = function() 
{

	/**
	* List of attributs.
	* @type {Renderer.WebGL.ShaderDefinition}
	* @private
	*/
	this.attributList = new Renderer.WebGL.ShaderDefinition();

	/**
	* The fragment shader.
	* @type {Renderer.WebGL.Shader}
	* @private
	*/
	this.fragmentShader = new Renderer.WebGL.Shader( Renderer.WebGL.Shader.Type.FRAGMENT );

	/**
	* WebGL program "ID".
	* @type {WebGLProgram}
	* @private
	*/
	this.id = Renderer.WebGL.ContextManager.getInstance().getCurrentContext().createProgram();

	/**
	* List of uniforms.
	* @type {Renderer.WebGL.ShaderDefinition}
	* @private
	*/
	this.uniformList = new Renderer.WebGL.ShaderDefinition();

	/**
	* The vertex shader.
	* @type {Renderer.WebGL.Shader}
	* @private
	*/
	this.vertexShader = new Renderer.WebGL.Shader( Renderer.WebGL.Shader.Type.VERTEX );

	/**
	* Total size, in bytes, of the attributs.
	* @type {number}
	* @public
	*/
	this.attibutsStructureSize = 0;

};

/**
 * Add an attribut.
 * @param {string} name Name of the element.
 * @param {number} count Number of element given.
 * @param {WebGL.Program.Type} type Type of the element.
 * @param {WebGL.Program.TypePrecision=} precision Precision of the type [optional].
 */
Renderer.WebGL.Program.prototype.addAttribut = function( name, count, type, precision ) 
{
	this.attributList.add( name, count, type, precision );
};

/**
 * Add uniform.
 * @param {string} name Name of the element.
 * @param {number} count Number of element given.
 * @param {WebGL.Program.Type} type Type of the element.
 * @param {WebGL.Program.TypePrecision=} precision Precision of the type [optional].
 */
Renderer.WebGL.Program.prototype.addUniform = function( name, count, type, precision ) 
{
	this.uniformList.add( name, count, type, precision );
};

/**
 * Build the program.
 * @private
 */
Renderer.WebGL.Program.prototype.bind = function() 
{
	var context = Renderer.WebGL.ContextManager.getInstance().getCurrentContext();
    context.useProgram( this.id );
};

/**
 * Build the program.
 * @private
 */
Renderer.WebGL.Program.prototype.build = function() 
{
	// Check shaders's states.
	if( this.fragmentShader.isReady() == false || 
		this.vertexShader.isReady()   == false ) 
	{
		return;
	}

	// Usefull context.
	var context = Renderer.WebGL.ContextManager.getInstance().getCurrentContext();

	// Attach and link shaders to program.
	context.attachShader( this.id, this.vertexShader.getId() );
	context.attachShader( this.id, this.fragmentShader.getId() );
	context.linkProgram( this.id );

	// Clear data.
	this.vertexShader.delete();
	this.fragmentShader.delete();

	// Check for errors.
	if ( !context.getProgramParameter( this.id, goog.webgl.LINK_STATUS ) ) 
	{
    	Nucleus.ErrorManager.error('Error found during shader compilation.');
		return;
	}

	// Build uniforms and attributs.
	this.buildAttributs();
	this.buildUniforms();
};

/**
 * Build attributs.
 */
Renderer.WebGL.Program.prototype.buildAttributs = function() 
{
	var context 	  = Renderer.WebGL.ContextManager.getInstance().getCurrentContext();
	var attributs = this.attributList.elements;

	for( var i in attributs )
	{
		var attribut = attributs[i];
		attribut.id  = context.getAttribLocation( this.id, i );

		// Attribut not find in the shader? Ignore it.
		if( attribut.id == -1) 
		{
			continue;
		}

		/** 
		* Calculate type's size.
		* @type {number}
		*/
		var typeSize = (attribut.type == WebGL.Program.Type.FLOAT) ? 4 : 3;

		// Calculate offset.
		attribut.offset = this.attibutsStructureSize;

		// Calculate total size.
		this.attibutsStructureSize += (attribut.count * typeSize);
	}
};

/**
 * Build uniforms.
 */
Renderer.WebGL.Program.prototype.buildUniforms = function() 
{
	var context  = Renderer.WebGL.ContextManager.getInstance().getCurrentContext();
	var uniforms = this.uniformList.elements;

    for( var i in uniforms ) 
    {
    	uniforms[i].id = context.getUniformLocation( this.id, i );

    	if( uniforms[i].id == null) {
    		uniforms[i].id = -1;
    	}
	}
};

/**
 * Enable attributs.
 */
Renderer.WebGL.Program.prototype.enableAttributs = function() 
{
	console.log("plop");
	var context   = Renderer.WebGL.ContextManager.getInstance().getCurrentContext();
	var attributs = this.attributList.elements;

	for( var i in attributs )
    {
		if( attributs[i].id == -1 ) {
			continue;
		}

		var attribut = attributs[i];
		context.enableVertexAttribArray( /** @type {number} */(attribut.id) );
		context.vertexAttribPointer( /** @type {number} */(attribut.id), attribut.count, attribut.itemType, attribut.normalize, this.attibutsStructureSize, attribut.offset );
	}
};

/**
 * Send common uniforms (lights, camera, …), shortcut for the user.
 */
Renderer.WebGL.Program.prototype.sendCommonUniforms = function() 
{
	this.sendUniforms( this.uniformList.elements );
};

/**
 * Send personal uniforms (model, material, …) shortcut for the user.
 */
Renderer.WebGL.Program.prototype.sendPersonalUniforms = function() 
{
	// this.sendUniforms( this.uniformList.elements );
};

/**
 * Send uniforms given.
 * @param {Array.<Renderer.WebGL.ShaderElement>} uniforms Array of ShaderElement.
 * @see http://jsperf.com/switch-if-else/20 for informations about the "elseif" used.
 */
Renderer.WebGL.Program.prototype.sendUniforms = function( uniforms ) 
{
	var context   = Renderer.WebGL.ContextManager.getInstance().getCurrentContext();

	for( var i in uniforms )
    {
		if( uniforms[i].id == -1 ) {
			continue;
		}

		if( uniforms[i].type == WebGL.Program.Type.MATRIX4 ) {
    		context.uniformMatrix4fv( 	/** @type {WebGLUniformLocation} */(uniforms[i].id), 
    									uniforms[i].normalize, 
    									/** @type {Float32Array} */(uniforms[i].data) );
		}
		else if( uniforms[i].type == WebGL.Program.Type.MATRIX3 ) {
    		context.uniformMatrix3fv( 	/** @type {WebGLUniformLocation} */(uniforms[i].id), 
    									uniforms[i].normalize, 
    									/** @type {Float32Array} */(uniforms[i].data) );
		}
		else if( uniforms[i].type == WebGL.Program.Type.VEC3 ) {
    		context.uniform3fv( /** @type {WebGLUniformLocation} */(uniforms[i].id), 
    							/** @type {Float32Array} */(uniforms[i].data) );
		}
		else if( uniforms[i].type == WebGL.Program.Type.UINT8ARRAY ) {
    		context.uniform1iv( /** @type {WebGLUniformLocation} */(uniforms[i].id),
    							/** @type {Int32Array} */(uniforms[i].data) );
		}
		else if( uniforms[i].type == WebGL.Program.Type.FLOAT ) {
    		context.uniform1f(  /** @type {WebGLUniformLocation} */(uniforms[i].id), 
    							/** @type {number} */(uniforms[i].data) );
		}
		else if( uniforms[i].type == WebGL.Program.Type.TEXTURE || 
				 uniforms[i].type == WebGL.Program.Type.INT ) 
		{
    		context.uniform1i(  /** @type {WebGLUniformLocation} */(uniforms[i].id), 
    							/** @type {number} */(uniforms[i].data) );
		}
	}
};

/**
 * Load program from the given folder.
 * @param {string} folderPath Path to the folder.
 */
Renderer.WebGL.Program.prototype.loadFromFolder = function( folderPath ) 
{
	// Files.
	var vertexFileName   = folderPath + '/vertex.vert';
	var fragmentFileName = folderPath + '/fragment.frag';

	// Add common elements to the given shader.	
	var programBuilder 	 = new Renderer.WebGL.ProgramBuilder( this );
	programBuilder.addDefaultUniforms();
	var sources = programBuilder.generate();

	// Load vertex's file.
	Nucleus.File.read( vertexFileName, function( fileName, source )
	{
		this.vertexShader.fill( sources.vertex + '\n' + source );
		this.build();
	}.bind( this) );

	// Load fragment's file.
	Nucleus.File.read( fragmentFileName, function( fileName, source )
	{
		this.fragmentShader.fill( sources.fragment + '\n' + source );
		this.build();	
	}.bind( this) );
};

/**
 * Load program from the given sources.
 * @param {string} vertexSource Vertex source.
 * @param {string} fragmentSource Fragment source.
 */
Renderer.WebGL.Program.prototype.loadFromSources = function( vertexSource, fragmentSource ) 
{
	this.fragmentShader.fill( fragmentSource );
	this.vertexShader.fill( vertexSource );
	this.build();
};

/**
 * Return the program attributs.
 * @return {Renderer.WebGL.ShaderDefinition} A reference to the program attributs object.
 */
Renderer.WebGL.Program.prototype.getAttributList = function() 
{
	return this.attributList;
};

/**
 * Return the program list of uniforms.
 * @return {Renderer.WebGL.ShaderDefinition} A reference to the program uniforms object.
 */
Renderer.WebGL.Program.prototype.getUniformList = function() 
{
	return this.uniformList;
};

/**
 * Return the program "Id".
 * @return {WebGLProgram} A reference to the program ID.
 */
Renderer.WebGL.Program.prototype.getId = function() 
{
	return this.id;
};
