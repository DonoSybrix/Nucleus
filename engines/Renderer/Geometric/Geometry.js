goog.provide('Renderer.Geometric.Geometry');

/**
 * Geometry: Used to define a mesh's structure.
 * @constructor
 * @author Donovan ORHAN <dono@sybrix.fr>
 */
Renderer.Geometric.Geometry = function() 
{
    /**
    * List of indices.
    * @type {Array.<number>}
    * @private
    */
    this.indices = [];

    /**
    * Indices counter.
    * @type {number}
    * @private
    */
    this.indiceCount = 0;

    /**
    * List of normals.
    * @type {Array.<number>}
    * @private
    */
    this.normals = [];

    /**
    * Normals counter.
    * @type {number}
    * @private
    */
    this.normalCount = 0;

    /**
    * List of vertices.
    * @type {Array.<number>}
    * @private
    */
    this.vertices = [];

    /**
    * Vertices counter.
    * @type {number}
    * @private
    */
    this.verticeCount = 0;

    /**
    * List of coordinates for texture.
    * @type {Array.<number>}
    * @private
    */
    this.textureCoordinates= [];

    /**
    * Textures counter.
    * @type {number}
    * @private
    */
    this.textureCoordinateCount = 0;

};

/**
 * Add a vertex to the geometry.
 * @param {number} x Vertex's position on X.
 * @param {number} y Vertex's position on Y.
 * @param {number} z Vertex's position on Z.
 */
Renderer.Geometric.Geometry.prototype.addVertex = function( x, y, z ) 
{
    this.vertices[this.verticeCount++] = x;
    this.vertices[this.verticeCount++] = y;
    this.vertices[this.verticeCount++] = z;
};

/**
 * Add a normal to the geometry.
 * @param {number} x Normal's position on X.
 * @param {number} y Normal's position on Y.
 * @param {number} z Normal's position on Z.
 */
Renderer.Geometric.Geometry.prototype.addNormal = function( x, y, z ) 
{
    this.normals[this.normalCount++] = x;
    this.normals[this.normalCount++] = y;
    this.normals[this.normalCount++] = z;
};

/**
 * Add texture coordinates to the geometry.
 * @param {number} x Texture's coordinate on X.
 * @param {number} y Texture's coordinate on Y.
 */
Renderer.Geometric.Geometry.prototype.addTextureCoordinates = function( x, y ) 
{
    this.textureCoordinates[this.textureCoordinateCount++] = x;
    this.textureCoordinates[this.textureCoordinateCount++] = y;
};

/**
 * Set directly geometry's indices.
 * @param {Array.<number>} indices Array of indices.
 */
Renderer.Geometric.Geometry.prototype.setIndices = function( indices ) 
{
    this.indices       = indices;
    this.indiceCount   = indices.length;
};

/**
 * Set directly geometry's normals.
 * @param {Array.<number>} normals Array of normals.
 */
Renderer.Geometric.Geometry.prototype.setNormals = function( normals ) 
{
    this.normals       = normals;
    this.normalCount   = normals.length;
};

/**
 * Set directly geometry's texture coordinates.
 * @param {Array.<number>} coordinates Array of coordinates.
 */
Renderer.Geometric.Geometry.prototype.setTextureCoordinates = function( coordinates ) 
{
    this.textureCoordinates       = coordinates;
    this.textureCoordinateCount   = coordinates.length;
};

/**
 * Set directly geometry's vertices.
 * @param {Array.<number>} vertices Array of vertices.
 */
Renderer.Geometric.Geometry.prototype.setVertices = function( vertices ) 
{
    this.vertices       = vertices;
    this.verticeCount   = vertices.length;
};