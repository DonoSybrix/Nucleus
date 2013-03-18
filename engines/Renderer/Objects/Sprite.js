goog.provide('Renderer.Sprite');
goog.require('Renderer.Materials.SpriteMaterial');
goog.require('Renderer.Mesh');
goog.require('Renderer.PrimitiveBuilder');
goog.require('Renderer.Texture');

/**
 * A sprite.
 * @constructor
 * @extends Renderer.Mesh
 * @author Donovan ORHAN <dono@sybrix.fr>
 */
Renderer.Sprite = function() 
{
    Renderer.Mesh.call( this,
                        Renderer.PrimitiveBuilder.Plane(),
                        new Renderer.Materials.SpriteMaterial() );

    /**
    * Indicate if we want flip sprite on X.
    * @type {boolean}
    * @private
    */
    this.flixOnX = false;

    /**
    * Indicate if we want flip sprite on Y.
    * @type {boolean}
    * @private
    */
    this.flixOnY = false;

};
goog.inherits( Renderer.Sprite, Renderer.Mesh );

/**
 * Set coordinate to use on the texture.
 * @param {number} x Position on X.
 * @param {number} y Position on Y.
 * @param {number} x2 End position on X.
 * @param {number} y2 End position on Y.
 */
Renderer.Sprite.prototype.setSubRect = function( x, y, x2, y2 ) 
{
    if( this.flixOnX == true )
    {
        var xTemp = x;
        x  = x2;
        x2 = xTemp;
    }

    if( this.flixOnY == true )
    {
        var yTemp = y;
        y  = y2;
        y2 = yTemp;
    }

    this.material.setSubRect( x, y, x2, y2 );
};

/**
 * Set texture to use with the sprite.
 * @param {Renderer.Texture} texture Texture to use.
 */
Renderer.Sprite.prototype.setTexture = function( texture ) 
{
    this.material.setTexture( texture );
};

/**
 * Flip sprite on X.
 */
Renderer.Sprite.prototype.flipX = function() 
{
    this.flixOnX = !this.flixOnX;

    var subrect = this.material.getSubRect();
    this.setSubRect( subrect[0], subrect[1], subrect[2], subrect[3] );
};

/**
 * Flip sprite on Y.
 */
Renderer.Sprite.prototype.flipY = function() 
{
    this.flixOnY = !this.flixOnY;

    var subrect = this.material.getSubRect();
    this.setSubRect( subrect[0], subrect[1], subrect[2], subrect[3] );
};