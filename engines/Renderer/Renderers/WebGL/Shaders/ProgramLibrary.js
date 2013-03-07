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
		vertexSource		+= 'gl_Position   = (uMvp * uModel) * vec4( aPosition, 1.0);';
		var fragmentSource 	 = 'gl_FragColor  = vColor;';

		// Create the program from the builder.
		var programBuilder = new Renderer.WebGL.ProgramBuilder();
		programBuilder.setVertexMainCode( vertexSource );
		programBuilder.setFragmentMainCode( fragmentSource );

		this.programs['default'] = programBuilder.create();
	}

	return this.programs['default'];
};