goog.provide('Renderer.WebGLRenderer.Program');
goog.require('Renderer.WebGLRenderer.Shader');
goog.require('Renderer.WebGLRenderer.ShaderBuilder');

// Used to debug (TODO: Remove)
// goog.require('Nucleus.ErrorManager');

/**
 * A program.
 * @constructor
 * @author Donovan ORHAN <dono@sybrix.fr>
 */
Renderer.WebGLRenderer.Program = function() 
{
	/**
	* WebGL program "ID".
	* @type {WebGLProgram}
	* @private
	*/
	this.id = Renderer.WebGL.ContextManager.getInstance().getCurrentContext().createProgram();

	/**
	* The fragment shader.
	* @type {Renderer.WebGLRenderer.Shader}
	* @private
	*/
	this.fragmentShader = new Renderer.WebGLRenderer.Shader( Renderer.WebGLRenderer.Shader.Type.FRAGMENT );

	/**
	* The vertex shader.
	* @type {Renderer.WebGLRenderer.Shader}
	* @private
	*/
	this.vertexShader = new Renderer.WebGLRenderer.Shader( Renderer.WebGLRenderer.Shader.Type.VERTEX );

};

/**
 * Build the program.
 * @private
 */
Renderer.WebGLRenderer.Program.prototype.build = function() 
{
	// Check shaders's states.
	if( this.fragmentShader.isReady() == false || 
		this.vertexShader.isReady()   == false ) 
	{
		return;
	}

	var context = Renderer.WebGL.ContextManager.getInstance().getCurrentContext();

	context.attachShader( this.id, this.vertexShader.getId() );
	context.attachShader( this.id, this.fragmentShader.getId() );
	context.linkProgram( this.id );

	/*if ( !context.getProgramParameter( this.id, goog.webgl.LINK_STATUS ) ) 
	{
		alert( "Shader: Error in the shader (" + this.id + ")" );	
		return;
	}*/
};

/**
 * Load program from the given folder.
 * @param {string} folderPath Path to the folder.
 */
Renderer.WebGLRenderer.Program.prototype.loadFromFolder = function( folderPath ) 
{
	var vertexFileName   = folderPath + '/vertex.vert';
	var fragmentFileName = folderPath + '/fragment.frag';

	// Load vertex's file.
	Nucleus.File.read( vertexFileName, function( fileName, source )
	{
		this.vertexShader.fill( source );
		this.build();
	}.bind( this) );

	// Load fragment's file.
	Nucleus.File.read( fragmentFileName, function( fileName, source )
	{
		this.fragmentShader.fill( source );
		this.build();	
	}.bind( this) );

	var shaderBuilder = new Renderer.WebGLRenderer.ShaderBuilder();
	var sourceCode = shaderBuilder.build('v = 5 * 4;');

    // Used to debug (TODO: Remove)
    // Nucleus.ErrorManager.warning( sourceCode );
};

/**
 * Load program from the given sources.
 * @param {string} vertexSource Vertex source.
 * @param {string} fragmentSource Fragment source.
 */
Renderer.WebGLRenderer.Program.prototype.loadFromSources = function( vertexSource, fragmentSource ) 
{
	this.fragmentShader.fill( fragmentSource );
	this.vertexShader.fill( vertexSource );
	this.build();
};

/**
 * Return the program "Id".
 * @return {WebGLProgram} A reference to the program ID.
 */
Renderer.WebGLRenderer.Program.prototype.getId = function() 
{
	return this.id;
};
