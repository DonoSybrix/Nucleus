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
    * Viewport dimensions.
    * @type {Object}
    * @public
    */
    this.viewport = { x: 0, y: 0, width: 800, height: 600 };

    /**
    * Field of view.
    * @type {number}
    * @public
    */
    this.fieldOfView = 45;

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
/*
    var forward = [ 0, 0, 0 ];
    var _phi = 0;
    var _theta = 0;

    if (_phi > 89)
        _phi = 89;
    else if (_phi < -89)
        _theta = -89;

    var r_temp = Math.cos(_phi*Math.PI/180);
    forward[0] = Math.sin(_phi*Math.PI/180);
    forward[1] = r_temp*Math.cos(_theta*Math.PI/180);
    forward[2] = r_temp*Math.sin(_theta*Math.PI/180);

    var left = [];
    left[0] = (this.up[1] * forward[2]) - (this.up[2] * forward[1]);
    left[1] = (this.up[2] * forward[0]) - (this.up[0] * forward[2]);
    left[2] = (this.up[0] * forward[1]) - (this.up[1] * forward[0]);

    var l = Math.sqrt( ( left[0] * left[0]) + ( left[1] * left[1]) + (left[2] * left[2]) ); 
    left[0] /= l; 
    left[1] /= l; 
    left[2] /= l; 

 var p = [this.position[0] + forward[0], this.position[1] + forward[1], this.position[2] + forward[2]];

 console.log( p );*/
 var p = [0, 0, 0];


    this.viewMatrix =  /** @type {!goog.vec.Mat4.Float32} */ (
                            goog.vec.Mat4.makeLookAt( goog.vec.Mat4.createFloat32(), 
                            this.position,
                            p,
                            this.up ) );

    this.needTransformUpdate = true;

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

    this.needTransformUpdate = true;
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

    this.needTransformUpdate = true;
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

    this.needTransformUpdate = true;
};

/**
 * Auto configure the camera with the given type.
 * @param {string} type Type asked, 2D or 3D.
 */
Renderer.Camera.prototype.changeType = function( type ) 
{
    // Default view direction.
    this.setPosition( 0, 0, 2 );
    this.lookAt( 0, 0, -5 );
    this.setPosition( 0, 0, 0 );

    // Projection.
    switch( type )
    {
        case '2D':
            this.makeOrthographic( -1, 1, -1, 1, 1, 100 );
            break;
        case '3D':
        default:
            this.makePerspective( this.fieldOfView, this.viewport.width / this.viewport.height, 1, 100 );
            break;
    }
};

/**
 * Change camera viewport.
 * @param {number} x  Position on X.
 * @param {number} y  Position on Y.
 * @param {number} width  Width.
 * @param {number} height Height.
 */
Renderer.Camera.prototype.setViewport = function( x, y, width, height ) 
{
    this.viewport = { x: x, y: y, width: width, height: height };
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
/*
        goog.vec.Mat4.scale( this.matrix, this.scale[0], this.scale[1], this.scale[2] );

        goog.vec.Mat4.rotateX( this.matrix, -this.rotation[0] );
        goog.vec.Mat4.rotateY( this.matrix, -this.rotation[1] );
        goog.vec.Mat4.rotateZ( this.matrix, -this.rotation[2] );

        goog.vec.Mat4.translate( this.matrix, -this.position[0], -this.position[1], -this.position[2] );*/

        goog.vec.Mat4.multMat( this.projectionMatrix, this.matrix, this.matrix );

        this.needTransformUpdate = false;
    }

    return this.matrix;
};


/**
 * Change position of the element.
 * @param {number} x Position on X.
 * @param {number} y Position on Y.
 * @param {number} z Position on Z.
 * @override
 */
Renderer.Camera.prototype.setPosition = function( x, y, z ) 
{
    Core.Transformable.prototype.setPosition.call( this, x, y, z );
    this.lookAt( 0, 0, 0 );

    this.needTransformUpdate = true;
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
