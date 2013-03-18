goog.provide('Renderer.Materials.SpriteMaterial');
goog.require('goog.vec.Vec4');
goog.require('Renderer.Materials.Material');

/**
 * Material: Used to define a mesh's apparence.
 * @constructor
 * @extends Renderer.Materials.Material
 * @author Donovan ORHAN <dono@sybrix.fr>
 */
Renderer.Materials.SpriteMaterial = function()
{
    Renderer.Materials.Material.call( this );

    /**
    * Reference to the program used by the mesh [WebGL stuff].
    * @type {Renderer.WebGL.Program|null}
    * @protected
    */
    this.program = Renderer.WebGL.ProgramLibrary.getInstance().getDefaultSpriteProgram();

    /**
    * Subrect used to draw the sprite.
    * @type {goog.vec.Float32}
    * @private
    */
    this.subrect = goog.vec.Vec4.createFloat32FromValues( 0.0, 0.0, 1.0, 1.0 );

};
goog.inherits( Renderer.Materials.SpriteMaterial, Renderer.Materials.Material );

/**
 * Prepare uniforms of the material to send to the shader.
 * @param {Array.<string, Renderer.WebGL.UniformDefinition>} uniforms List of uniforms of the material.
 * @override
 */
Renderer.Materials.SpriteMaterial.prototype.prepareMaterialUniforms = function( uniforms ) 
{
	uniforms['uTextureCoord'].data = this.subrect;
};

/**
 * Return coordinate array.
 * @return {goog.vec.Float32} Subrect values.
 */
Renderer.Materials.SpriteMaterial.prototype.getSubRect = function() 
{
	return this.subrect;
};

/**
 * Set coordinate to use on the texture.
 * @param {number} x Position on X.
 * @param {number} y Position on Y.
 * @param {number} x2 End position on X.
 * @param {number} y2 End position on Y.
 */
Renderer.Materials.SpriteMaterial.prototype.setSubRect = function( x, y, x2, y2 ) 
{
    /*this.geometry.setVertexTextureCoordinates([
        x2,  y,
        x2,  y2,
         x,  y2,
         x,  y
    ]);
*/
    this.subrect[0] = x;
    this.subrect[1] = y;
    this.subrect[2] = x2;
    this.subrect[3] = y2;
};