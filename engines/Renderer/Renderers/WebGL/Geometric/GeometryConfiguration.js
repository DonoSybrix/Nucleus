goog.provide('Renderer.WebGL.GeometryConfiguration');
goog.require('Renderer.Geometric.GeometryConfiguration');
goog.require('Renderer.WebGL.DataBuffer');
goog.require('Renderer.WebGL.IndexBuffer');
goog.require('Renderer.WebGL.Private.GeometryAttribut');

/**
 * Represent a geometry attribut (normal, vertex, texture, color, …)
 * @constructor
 * @extends Renderer.Geometric.GeometryConfiguration
 * @author Donovan ORHAN <dono@sybrix.fr>
 */
Renderer.WebGL.GeometryConfiguration = function() 
{
    Renderer.Geometric.GeometryConfiguration.call( this );

    /**
    * Normals counter.
    * @type {Renderer.WebGL.Buffer}
    * @public
    */
    this.vertexBuffer = new Renderer.WebGL.DataBuffer();

    /**
    * Name of the attribut, will be converted to equivalent in shader. 
    * @type {Renderer.WebGL.IndexBuffer}
    * @public
    */
    this.indexBuffer  = new Renderer.WebGL.IndexBuffer();

    /**
    * Name of the attribut, will be converted to equivalent in shader. 
    * @type {Array.<Renderer.WebGL.Private.GeometryAttribut>}
    * @private
    */
    this.attributs = [];

    /**
    * Attribut count. 
    * @type {number}
    * @private
    */
    this.attributCount = 0;

};
goog.inherits( Renderer.WebGL.GeometryConfiguration, Renderer.Geometric.GeometryConfiguration );

/**
* Prepare the attribut to be used.
* @param {ArrayBuffer} vertexData Array with all vertex.
* @param {Uint8Array|Uint16Array|Uint32Array} indexData Array with indices.
* @param {Renderer.Geometric.GeometryConfiguration.GeometryType} geometryType Type of geometry.
*/
Renderer.WebGL.GeometryConfiguration.prototype.setAsInterleaved = function( vertexData, indexData, geometryType )
{
    this.buffer = new Renderer.WebGL.DataBuffer();
    this.buffer.fill( vertexData );

    this.setAsNormal( indexData, geometryType );
};

/**
* Prepare the attribut to be used.
* @param {Uint8Array|Uint16Array|Uint32Array} indexData Array with indices.
* @param {Renderer.Geometric.GeometryConfiguration.GeometryType} geometryType Type of geometry.
*/
Renderer.WebGL.GeometryConfiguration.prototype.setAsNormal = function( indexData, geometryType )
{
    this.indexBuffer.fill( indexData );
    this.indexBuffer.setType( geometryType );
};

/**
* Add an attribut.
* @param {string} name Name of the attribut. (ex: Position, Normal, …)
* @param {number} count Element count for a vertex attribut.
* @param {number=} type Type of the data.
* @param {number=} offset Offset if the attribut depend of a parent structure.
* @param {number=} size Total size if the attribut depend of a parent structure.
* @param {Uint8Array|Uint16Array|Uint32Array|Float32Array=} data Data to push isn't the attribut.
*/
Renderer.WebGL.GeometryConfiguration.prototype.add = function( name, count, type, offset, size, data )
{
    var attribut = new Renderer.WebGL.Private.GeometryAttribut();
    attribut.prepare( name, count, type, offset, size, data );
    this.attributs[this.attributCount] = attribut;
    this.attributCount++;
};

/**
* Bind the attribut.
* @param {Array.<Object>} programAttributList List of atributs.
* @param {WebGLRenderingContext} context A reference to the context.
*/
Renderer.WebGL.GeometryConfiguration.prototype.bindGeometry = function( programAttributList, context )
{
    // Usefull variables.
    var attribut        = null;
    var programAttribut = null;

    // Global buffer? Used when the array is interleaved.
    if( this.buffer) {
        this.buffer.bind();
    }

    // Index buffer.
    this.indexBuffer.bind();

    // Fetching attributs.
    for( var i = 0, len = this.attributs.length; i < len; ++i )
    {
        attribut        = this.attributs[i];
        programAttribut = programAttributList[attribut.name];

        if( programAttribut == undefined || programAttribut.id == -1 ) {
            continue;
        }

        if( attribut.buffer != null ) {
            attribut.buffer.bind();
        }

        context.enableVertexAttribArray( /** @type {number} */(programAttribut.id) );
        context.vertexAttribPointer( /** @type {number} */(programAttribut.id), attribut.count, attribut.type, attribut.normalize, attribut.size, attribut.offset );
    }
};