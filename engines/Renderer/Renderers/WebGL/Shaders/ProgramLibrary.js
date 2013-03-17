goog.provide('Renderer.WebGL.ProgramLibrary');
goog.require('Renderer.WebGL.ProgramBuilder');

/**
 * Stock application's programs (User programs and renderer programs).
 * @constructor
 * @author Donovan ORHAN <dono@sybrix.fr>
 */
Renderer.WebGL.ProgramLibrary = function() 
{
	/**
	* List of Program.
	* @type {Array.<Renderer.WebGL.Program>}
	* @private
	*/
	this.programs = [];

};
goog.addSingletonGetter( Renderer.WebGL.ProgramLibrary );

/**
* Register a program in the library.
* @param {string} name Name of the program to register.
* @param {Renderer.WebGL.Program} program A reference to the program.
*/
Renderer.WebGL.ProgramLibrary.prototype.register = function( name, program ) 
{
	this.programs[name] = program;
};

/**
* Return the asked program.
* @param {string} programName Name of the program to return.
* @return {Renderer.WebGL.Program} A reference to the program.
*/
Renderer.WebGL.ProgramLibrary.prototype.get = function( programName ) 
{
	return this.programs[programName] || this.getDefaultProgram();
};

/**
* Return the default program of the renderer.
* @return {Renderer.WebGL.Program} A reference to the program.
*/
Renderer.WebGL.ProgramLibrary.prototype.getDefaultProgram = function() 
{
	if( this.programs['default'] == undefined ) 
	{
		// Source code
		var vertexSource   	 = 'vColor		  = aColor; \n';
		vertexSource   	 	+= 'vTexCoord	  = aTexCoord; \n';
		vertexSource		+= 'gl_Position   = (uMvp * uModel) * vec4( aPosition, 1.0);';

		//var fragmentSource 	 = 'gl_FragColor  = texture2D(uTexture, vTexCoord) * vColor ;';

		var fragmentSource 	 = '';
		fragmentSource 	 	+= 'lowp vec4 textureColor = texture2D(uTexture, vTexCoord); \n';
		fragmentSource 	 	+= 'if (textureColor.a < 0.5) \n';
		fragmentSource 	 	+= 'discard; \n';
		fragmentSource 	 	+= 'else \n';
		fragmentSource 	 	+= 'gl_FragColor  = textureColor * vColor; \n';

		// Create the program from the builder.
		var programBuilder = new Renderer.WebGL.ProgramBuilder();
		programBuilder.addUniform('uTexture', false,  1, WebGL.Program.Type.TEXTURE );
		programBuilder.setVertexMainCode( vertexSource );
		programBuilder.setFragmentMainCode( fragmentSource );

		this.programs['default'] = programBuilder.create();
	}

	return this.programs['default'];
};