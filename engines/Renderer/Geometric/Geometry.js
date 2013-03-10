goog.provide('Renderer.Geometric.Geometry');
goog.require('Renderer.Geometric.GeometryConfiguration');

/**
 * Geometry: Used to define a mesh's structure.
 * @constructor
 * @author Donovan ORHAN <dono@sybrix.fr>
 */
Renderer.Geometric.Geometry = function() 
{
    /**
    * Configuration of the geometry.
    * @type {Renderer.Geometric.GeometryConfiguration|null}
    * @private
    */
    this.configuration = null;

    /**
    * List of indices.
    * @type {Uint8Array|Uint16Array|Uint32Array|null}
    * @private
    */
    this.indices = null;

    /**
    * Indices counter.
    * @type {number}
    * @private
    */
    this.indiceCount = 0;

    /**
    * Create the geometry with an interleaved array.
    * @type {boolean}
    * @private
    */
    this.interleaved = false;

    /**
    * Indicate if the geometry need an update.
    * @type {boolean}
    * @private
    */
    this.needUpdate = false;

    /**
    * List of normals.
    * @type {Float32Array|null}
    * @private
    */
    this.normals = null;

    /**
    * Normals counter.
    * @type {number}
    * @private
    */
    this.normalCount = 0;

    /**
    * List of position.
    * @type {Float32Array|null}
    * @private
    */
    this.positions = null;

    /**
    * Position counter.
    * @type {number}
    * @private
    */
    this.positionCount = 0;

    /**
    * List of coordinates for texture.
    * @type {Float32Array|null}
    * @private
    */
    this.textureCoordinates= null;

    /**
    * Textures counter.
    * @type {number}
    * @private
    */
    this.textureCoordinateCount = 0;

    /**
    * List of vertex.
    * @type {ArrayBuffer|null}
    * @private
    */
    this.vertices = null;

};

/**
 * Add a vertex normal to the geometry.
 * @param {number} x Normal's position on X.
 * @param {number} y Normal's position on Y.
 * @param {number} z Normal's position on Z.
 */
Renderer.Geometric.Geometry.prototype.addVertexNormal = function( x, y, z ) 
{
    this.normals[this.normalCount++] = x;
    this.normals[this.normalCount++] = y;
    this.normals[this.normalCount++] = z;
};

/**
 * Add a vertex position to the geometry.
 * @param {number} x Vertex's position on X.
 * @param {number} y Vertex's position on Y.
 * @param {number} z Vertex's position on Z.
 */
Renderer.Geometric.Geometry.prototype.addVertexPosition = function( x, y, z ) 
{
    if( this.positions == null ) {
        // TODO: Indicate positions array is empty.
        return;
    }

    // Set values.
    var currentPosition = this.positionCount * Renderer.Geometric.GeometryConfiguration.DATACOUNT_POSITION;
    this.positions[currentPosition]   = x;
    this.positions[currentPosition+1] = y;
    this.positions[currentPosition+2] = z;
    this.positionCount++;
};

/**
 * Add vertex texture coordinates to the geometry.
 * @param {number} x Texture's coordinate on X.
 * @param {number} y Texture's coordinate on Y.
 */
Renderer.Geometric.Geometry.prototype.addVertexTextureCoordinates = function( x, y ) 
{
    this.textureCoordinates[this.textureCoordinateCount++] = x;
    this.textureCoordinates[this.textureCoordinateCount++] = y;
};

/**
 * Bind the geometry attributs [WebGL only].
 * @param {Array.<Object>} programAttributList List of attributs of the shader.
 */
Renderer.Geometric.Geometry.prototype.bind = function( programAttributList ) 
{
    this.configuration.bindGeometry( programAttributList );
};

/**
 * Build the geometry array.
 */
Renderer.Geometric.Geometry.prototype.build = function() 
{
    this.configuration = new Renderer.WebGL.GeometryConfiguration();

    // Calculate array size/array configuration.
    var hasNormals = (this.normalCount > 0);
    var hasTexture = (this.textureCoordinateCount > 0);

    // Array size.
    var vertexSize = 0;
    vertexSize += Renderer.Geometric.GeometryConfiguration.ElementLength.POSITION;
    vertexSize += Renderer.Geometric.GeometryConfiguration.ElementLength.COLOR;

    if( hasNormals )
    {
        vertexSize += Renderer.Geometric.GeometryConfiguration.ElementLength.NORMAL;
    }

    if( hasTexture )
    {
        vertexSize += Renderer.Geometric.GeometryConfiguration.ElementLength.TEXTURE;
    }

    // Create interleaved array.
    if( this.interleaved )
    {
        this.vertices = new ArrayBuffer( vertexSize );

        this.configuration.setAsInterleaved( this.vertices, this.indices, Renderer.Geometric.GeometryConfiguration.GeometryType.SMALL );
    }
    else
    {
        this.configuration.setAsNormal( this.indices, Renderer.Geometric.GeometryConfiguration.GeometryType.SMALL );

        this.configuration.add( 'aPosition', 
                                Renderer.Geometric.GeometryConfiguration.DATACOUNT_POSITION, 
                                goog.webgl.FLOAT,
                                0,
                                Renderer.Geometric.GeometryConfiguration.ElementLength.POSITION,
                                this.positions );

        this.configuration.add( 'aColor', 
                                Renderer.Geometric.GeometryConfiguration.DATACOUNT_COLOR, 
                                goog.webgl.UNSIGNED_BYTE,
                                0,
                                Renderer.Geometric.GeometryConfiguration.ElementLength.COLOR,
                                this.positions );

        if( hasTexture )
        {
            this.configuration.add( 'Texture', 
                                    Renderer.Geometric.GeometryConfiguration.DATACOUNT_TEXTURE, 
                                    goog.webgl.FLOAT,
                                    0,
                                    Renderer.Geometric.GeometryConfiguration.ElementLength.TEXTURE,
                                    this.textureCoordinates );
        }

        if( hasNormals )
        {
            this.configuration.add( 'Normal', 
                                    Renderer.Geometric.GeometryConfiguration.DATACOUNT_NORMAL, 
                                    goog.webgl.FLOAT,
                                    0,
                                    Renderer.Geometric.GeometryConfiguration.ElementLength.NORMAL,
                                    this.normals );
        }
    }
};

/**
 * Indicate if the geometry is dirty (waiting for update).
 * @return {boolean} State of the geometry.
 */
Renderer.Geometric.Geometry.prototype.isDirty = function() 
{
    return this.needUpdate;
};

/**
 * Update the geometry.
 */
Renderer.Geometric.Geometry.prototype.update = function() 
{

};

/**
 * Return geometry configuration.
 * @return {Renderer.Geometric.GeometryConfiguration} A reference to the configuration.
 */
Renderer.Geometric.Geometry.prototype.getConfiguration = function() 
{
    return this.configuration;
};

/**
 * Return indices count.
 * @return {number} Indices count.
 */
Renderer.Geometric.Geometry.prototype.getIndiceCount = function() 
{
    return this.indiceCount;
};

/**
 * Set directly geometry's indices.
 * @param {Array.<number>} indices Array of indices.
 */
Renderer.Geometric.Geometry.prototype.setIndices = function( indices ) 
{
    this.indiceCount = indices.length;

    if( this.indiceCount < Renderer.Geometric.GeometryConfiguration.GeometryType.SMALL ) 
    {
        this.indices = new Uint8Array( indices );
    }
    else if( this.indiceCount < Renderer.Geometric.GeometryConfiguration.GeometryType.MEDIUM ) 
    {
        this.indices = new Uint16Array( indices );
    }
    else
    {
        this.indices = new Uint32Array( indices );
    }
};

/**
 * Set number of normal, resize normals array.
 * @param {number} normalCount Normal count.
 */
Renderer.Geometric.Geometry.prototype.setVertexNormalCount = function( normalCount ) 
{
    this.normals       = new Float32Array( normalCount * Renderer.Geometric.GeometryConfiguration.DATACOUNT_NORMAL );
    this.normalCount   = 0;
};

/**
 * Set directly geometry's normals.
 * @param {Array.<number>} normals Array of normals.
 */
Renderer.Geometric.Geometry.prototype.setVertexNormals = function( normals ) 
{
    this.normals       = new Float32Array( normals );
    this.normalCount   = normals.length;
};

/**
 * Set number of positions, resize array position.
 * @param {number} positionsCount Position count.
 */
Renderer.Geometric.Geometry.prototype.setVertexPositionCount = function( positionsCount ) 
{
    this.positions       = new Float32Array( positionsCount * Renderer.Geometric.GeometryConfiguration.DATACOUNT_POSITION );
    this.positionCount   = 0;
};

/**
 * Set directly geometry's positions.
 * @param {Array.<number>} positions Array of positions.
 */
Renderer.Geometric.Geometry.prototype.setVertexPositions = function( positions ) 
{
    this.positions       = new Float32Array( positions);
    this.positionCount   = positions.length;
};

/**
 * Set number of coordinate, resize coordinate array.
 * @param {number} coordinateCount Texture coordiate count.
 */
Renderer.Geometric.Geometry.prototype.setVertexTextureCoordinateCount = function( coordinateCount ) 
{
    this.textureCoordinates       = new Float32Array( coordinateCount * Renderer.Geometric.GeometryConfiguration.DATACOUNT_TEXTURE );
    this.textureCoordinateCount   = 0;
};

/**
 * Set directly geometry's texture coordinates.
 * @param {Array.<number>} coordinates Array of coordinates.
 */
Renderer.Geometric.Geometry.prototype.setVertexTextureCoordinates = function( coordinates ) 
{
    this.textureCoordinates       = new Float32Array( coordinates );
    this.textureCoordinateCount   = coordinates.length;
};