goog.provide('Renderer.Camera');
goog.require('Core.Transformable');
goog.require('goog.vec.Mat3');

/**
 * A camera.
 * @constructor
 * @param {string} cameraType Type of camera ("2D" or "3D").
 * @extends Core.Transformable
 * @author Donovan ORHAN <dono@sybrix.fr>
 */
Renderer.Camera = function( cameraType ) 
{
    Core.Transformable.call( this );

    /**
    * View matrix.
    * @type {goog.vec.Mat4.Float32}
    * @protected
    */
    this.viewMatrix = goog.vec.Mat4.createFloat32();

    /**
    * Projection matrix.
    * @type {goog.vec.Mat4.Float32}
    * @protected
    */
    this.projectionMatrix = goog.vec.Mat4.createFloat32();

    /**
    * Normal matrix.
    * @type {goog.vec.Mat4.Float32}
    * @protected
    */
    this.normalMatrix = goog.vec.Mat3.createFloat32();

    /**
    * Top of the camera.
    * @type {goog.vec.Mat4.Float32}
    * @protected
    */
    this.up = goog.vec.Vec3.createFloat32FromValues( 0.0, 1.0, 0.0 );

    /**
    * Set the default type.
    */
    this.changeType( cameraType );

};
goog.inherits( Renderer.Camera, Core.Transformable );

/**
 * Set the look direction.
 * @param {number} centerX Center of the eye on X.
 * @param {number} centerY Center of the eye on Y.
 * @param {number} centerZ Center of the eye on Z.
 */
Renderer.Camera.prototype.lookAt = function( centerX, centerY, centerZ ) 
{
    this.viewMatrix =  /** @type {!goog.vec.Mat4.Float32} */ (
                            goog.vec.Mat4.makeLookAt( goog.vec.Mat4.createFloat32(), 
                            this.position,
                            [centerX, centerY, centerZ],
                            this.up ) );

};

/**
 * Set the camera as a perspective camera.
 * @param {number} fovy Field of view.
 * @param {number} ratio Ration of the perspective.
 * @param {number} near Distance of near objects.
 * @param {number} far Distance of far objects.
 */
Renderer.Camera.prototype.makePerspective = function( fovy, ratio, near, far ) 
{
    this.projectionMatrix = /** @type {!goog.vec.Mat4.Float32} */ (
                            goog.vec.Mat4.makePerspective( goog.vec.Mat4.createFloat32(), fovy, ratio, near, far ) );
};

/**
 * Set the camera as a orthographic camera.
 * @param {number} left Left position.
 * @param {number} right Right position.
 * @param {number} bottom Bottom position.
 * @param {number} top Top position.
 * @param {number} near Distance of near objects.
 * @param {number} far Distance of far objects.
 */
Renderer.Camera.prototype.makeOrthographic = function( left, right, bottom, top, near, far ) 
{
    this.projectionMatrix = /** @type {!goog.vec.Mat4.Float32} */ (
                            goog.vec.Mat4.makeOrtho( goog.vec.Mat4.createFloat32(), left, right, bottom, top, near, far ) );
};

/**
 * Set the camera as a frustum camera.
 * @param {number} left Left position.
 * @param {number} right Right position.
 * @param {number} bottom Bottom position.
 * @param {number} top Top position.
 * @param {number} near Distance of near objects.
 * @param {number} far Distance of far objects.
 */
Renderer.Camera.prototype.makeFrustum = function( left, right, bottom, top, near, far ) 
{
    this.projectionMatrix = /** @type {!goog.vec.Mat4.Float32} */ (
                            goog.vec.Mat4.makeFrustum( goog.vec.Mat4.createFloat32(), left, right, bottom, top, near, far ) );
};

/**
 * Auto configure the camera with the given type.
 * @param {string} type Type asked, 2D or 3D.
 */
Renderer.Camera.prototype.changeType = function( type ) 
{
    // Default view direction.
    this.lookAt( 0, 0, -5 ); 

    // Projection.
    switch( type )
    {
        case '2D':
            this.makeOrthographic( -1, 1, -1, 1, 1, 100 );
            break;
        case '3D':
        default:
            this.makePerspective( 45, 800 / 600, 1, 100 );
            break;
    }
};

/**
 * Return the matrix of the camera.
 * @return {goog.vec.Mat4.Float32} A reference to the object's matrix.
 * @override
 */
Renderer.Camera.prototype.getMatrix = function()
{
    if( this.needTransformUpdate ) 
    {
        this.matrix = /** @type {!goog.vec.Mat4.Float32} */ (goog.vec.Mat4.cloneFloat32( this.viewMatrix ) ); 

        goog.vec.Mat4.translate( this.matrix, this.position[0], this.position[1], this.position[2] );

        goog.vec.Mat4.scale( this.matrix, this.scale[0], this.scale[1], this.scale[2] );

        goog.vec.Mat4.rotateX( this.matrix, this.rotation[0] );
        goog.vec.Mat4.rotateY( this.matrix, this.rotation[1] );
        goog.vec.Mat4.rotateZ( this.matrix, this.rotation[2] );

        goog.vec.Mat4.multMat( this.projectionMatrix, this.matrix, this.matrix );

        this.needTransformUpdate = false;
    }

    return this.matrix;
};

/**
 * Return the normal matrix of the camera.
 * @return {goog.vec.Mat3.Float32} A reference to the normals matrix.
 */
Renderer.Camera.prototype.getNormalMatrix = function()
{
    goog.vec.Mat4.invert( this.matrix, this.normalMatrix );
    goog.vec.Mat3.transpose( this.normalMatrix, this.normalMatrix );

    return this.normalMatrix;
};

/**
 * Return the projection matrix.
 * @return {goog.vec.Mat3.Float32} A reference to the projection matrix.
 */
Renderer.Camera.prototype.getProjectionMatrix = function()
{
    return this.projectionMatrix;
};

/**
 * Return the view matrix.
 * @return {goog.vec.Mat3.Float32} A reference to the view matrix.
 */
Renderer.Camera.prototype.getViewMatrix = function()
{
    return this.viewMatrix;
};
