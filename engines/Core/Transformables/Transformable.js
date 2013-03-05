goog.provide('Core.Transformable');
goog.require('goog.vec.Mat4');
goog.require('goog.vec.Vec3');

/**
 * Transformable : Matrix and transformations.
 * @constructor
 * @author Donovan ORHAN <dono@sybrix.fr>
 */
Core.Transformable = function() 
{
    /**
    * The result matrix.
    * @type {goog.vec.Mat4.Float32}
    * @protected
    */
    this.matrix = goog.vec.Mat4.createFloat32Identity();

    /**
    * Position.
    * @type {goog.vec.Vec3.Float32}
    * @protected
    */
    this.position = goog.vec.Vec3.createFloat32();

    /**
    * Rotation.
    * @type {goog.vec.Vec3.Float32}
    * @protected
    */
    this.rotation = goog.vec.Vec3.createFloat32();

    /**
    * Scale.
    * @type {goog.vec.Vec3.Float32}
    * @protected
    */
    this.scale = goog.vec.Vec3.createFloat32FromValues( 1.0, 1.0, 1.0 );

    /**
    * Say if the matrix need to be updated.
    * @type {boolean}
    * @protected
    */
    this.needTransformUpdate = true;

};

/**
 * Change rotation of the element.
 * @param {number} x Rotation on X.
 * @param {number} y Rotation on Y.
 * @param {number} z Rotation on Z.
 */
Core.Transformable.prototype.setRotation = function( x, y, z ) 
{
    goog.vec.Vec3.setFromValues( this.rotation, x, y, z );
    this.needTransformUpdate = true;
};

/**
 * Change position of the element.
 * @param {number} x Position on X.
 * @param {number} y Position on Y.
 * @param {number} z Position on Z.
 */
Core.Transformable.prototype.setPosition = function( x, y, z ) 
{
    goog.vec.Vec3.setFromValues( this.position, x, y, z );
    this.needTransformUpdate = true;
};

/**
 * Change scale of the element.
 * @param {number} x Position on X.
 * @param {number} y Position on Y.
 * @param {number} z Position on Z.
 */
Core.Transformable.prototype.setScale = function( x, y, z ) 
{
    goog.vec.Vec3.setFromValues( this.scale, x, y, z );
    this.needTransformUpdate = true;
};

/**
 * Return the matrix of the transformable.
 * @return {goog.vec.Mat4.Float32} A reference to the object's matrix.
 */
Core.Transformable.prototype.getMatrix = function()
{
    if ( this.needTransformUpdate )
    {
        goog.vec.Mat4.makeTranslate( this.matrix, this.position[0], this.position[1], this.position[2] );

        goog.vec.Mat4.scale( this.matrix, this.scale[0], this.scale[1], this.scale[2] );

        goog.vec.Mat4.rotateX( this.matrix, this.rotation[0] );
        goog.vec.Mat4.rotateY( this.matrix, this.rotation[1] );
        goog.vec.Mat4.rotateZ( this.matrix, this.rotation[2] );

        this.needTransformUpdate = false;
    }

    return this.matrix;
};

/**
 * Return the position.
 * @return {goog.vec.Vec3.Float32} Position of the transformable.
 */
Core.Transformable.prototype.getPosition = function() 
{
    return this.position;
};
