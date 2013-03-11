goog.provide('Renderer.Materials.Material');
goog.require('Renderer.Core.Color');
goog.require('Renderer.WebGL.ProgramLibrary');
goog.require('goog.webgl');

/**
 * Material: Used to define a mesh's apparence.
 * @constructor
 * @author Donovan ORHAN <dono@sybrix.fr>
 */
Renderer.Materials.Material = function() 
{
    /**
    * Ambient color.
    * @type {Renderer.Core.Color}
    * @protected
    */
    this.ambientColor = new Renderer.Core.Color();

    /**
    * Blending mode.
    * @type {Renderer.BlendMode}
    * @protected
    */
    this.blendMode = Renderer.BlendMode.NONE;

    /**
    * The diffuse color.
    * @type {Renderer.Core.Color}
    * @protected
    */
    this.diffuseColor = new Renderer.Core.Color();

    /**
    * Drawing mode.
    * @type {number}
    * @protected
    */
    this.drawingMode = Renderer.DrawingMode.TRIANGLES;

    /**
    * Reference to the program used by the mesh [WebGL stuff].
    * @type {Renderer.WebGL.Program|null}
    * @protected
    */
    this.program = Renderer.WebGL.ProgramLibrary.getInstance().getDefaultProgram();

    /**
    * Shininess.
    * @type {number}
    * @protected
    */
    this.shininess = 5;

    /**
    * The specular color.
    * @type {Renderer.Core.Color}
    * @protected
    */
    this.specularColor = new Renderer.Core.Color();

    /**
    * Texture.
    * @type {Renderer.Texture|null}
    * @protected
    */
    this.texture = null;

    /**
    * Visibility of the material.
    * @type {boolean}
    * @public
    */
    this.visible = true;

};

/**
 * Enum for blending types.
 * @enum {number}
 */
Renderer.BlendMode = {
    ADD         : 0,
    ALPHA       : 1,
    MULTIPLY    : 2,
    NONE        : 3
};

/**
 * Enum for drawing modes.
 * @enum {number}
 */
Renderer.DrawingMode = 
{
    LINES           : goog.webgl.LINES,
    LINE_STRIP      : goog.webgl.LINE_STRIP,
    POINTS          : goog.webgl.POINTS,
    TRIANGLES       : goog.webgl.TRIANGLES,
    TRIANGLE_FAN    : goog.webgl.TRIANGLE_FAN,
    TRIANGLE_STRIP  : goog.webgl.TRIANGLE_STRIP
};

/**
 * Hide the material, owner will be hidden.
 */
Renderer.Materials.Material.prototype.hide = function() 
{
    this.visible = false;
};

/**
 * Change the ambient color.
 * All values must be in a range of 0 and 255.
 * @param {Renderer.Core.Color|number} r Color object or red value.
 * @param {number=} g Green value [optional].
 * @param {number=} b Blue value [optional].
 * @param {number=} a Transparent value [optional].
 */
Renderer.Materials.Material.prototype.setAmbientColor = function( r, g, b, a ) 
{
    if( g == undefined)
    {
        this.ambientColor = /** @type {Renderer.Core.Color} */(r);
    }
    else
    {
        this.ambientColor.setFromValues( /** @type {number} */(r), 
                                         /** @type {number} */(g), 
                                         /** @type {number} */(b),
                                         /** @type {number} */(a) );
    }
};

/**
 * Change the blend style.
 * @param {Renderer.BlendMode} blendMode Blend mode to use.
 */
Renderer.Materials.Material.prototype.setBlendingMode = function( blendMode ) 
{
    this.blendMode = blendMode;
};

/**
 * Change the material color.
 * This is a shortcut, diffuse and ambient color will be the same in 90% of case.
 * @param {Renderer.Core.Color|number} r Color object or red value.
 * @param {number=} g Green value [optional].
 * @param {number=} b Blue value [optional].
 * @param {number=} a Transparent value [optional].
 */
Renderer.Materials.Material.prototype.setColor = function( r, g, b, a ) 
{
    this.setAmbientColor( r, g, b, a );
    this.setDiffuseColor( r, g, b, a );
};

/**
 * Change the diffuse color.
 * All values must be in a range of 0 and 255.
 * @param {Renderer.Core.Color|number} r Color object or red value.
 * @param {number=} g Green value [optional].
 * @param {number=} b Blue value [optional].
 * @param {number=} a Transparent value [optional].
 */
Renderer.Materials.Material.prototype.setDiffuseColor = function( r, g, b, a ) 
{
    if( g == undefined)
    {
        this.diffuseColor = /** @type {Renderer.Core.Color} */(r);
    }
    else
    {
        this.diffuseColor.setFromValues( /** @type {number} */(r), 
                                         /** @type {number} */(g), 
                                         /** @type {number} */(b),
                                         /** @type {number} */(a) );
    }
};

/**
 * Change the drawing mode.
 * @param {Renderer.DrawingMode} drawingMode Drawing mode to use.
 */
Renderer.Materials.Material.prototype.setDrawingMode = function( drawingMode ) 
{
    this.drawingMode = drawingMode;
};

/**
 * Change the program used by the material [WebGL stuff].
 * @param {Renderer.WebGL.Program} program Program to use.
 */
Renderer.Materials.Material.prototype.setProgram = function( program ) 
{
    this.program = program;
};

/**
 * Change the shininess value.
 * @param {number} shininessValue Value to assign, must be in a range of 0 to 255
 * Shininess with 0 will be very high.
 */
Renderer.Materials.Material.prototype.setShininess = function( shininessValue ) 
{
    this.shininess = shininessValue;
};

/**
 * Change the specular color.
 * All values must be in a range of 0 and 255.
 * @param {Renderer.Core.Color|number} r Color object or red value.
 * @param {number=} g Green value [optional].
 * @param {number=} b Blue value [optional].
 * @param {number=} a Transparent value [optional].
 */
Renderer.Materials.Material.prototype.setSpecularColor = function( r, g, b, a ) 
{
    if( g == undefined)
    {
        this.specularColor = /** @type {Renderer.Core.Color} */(r);
    }
    else
    {
        this.specularColor.setFromValues( /** @type {number} */(r), 
                                          /** @type {number} */(g), 
                                          /** @type {number} */(b),
                                          /** @type {number} */(a) );
    }
};

/**
 * Change the texture used by the material.
 * @param {Renderer.Texture} texture Texture to use.
 */
Renderer.Materials.Material.prototype.setTexture = function( texture ) 
{
    this.texture = texture;
};

/**
 * Show the material, owner will be visible.
 */
Renderer.Materials.Material.prototype.show = function() 
{
    this.visible = true;
};

/**
 * Return the material drawing mode.
 * @return {number} Drawing mode.
 */
Renderer.Materials.Material.prototype.getDrawingMode = function() 
{
    return this.drawingMode;
};

/**
 * Return the program used by this material.
 * @return {Renderer.WebGL.Program|null} A reference to the program.
 */
Renderer.Materials.Material.prototype.getProgram = function() 
{
    return this.program;
};
