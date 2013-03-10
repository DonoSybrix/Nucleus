goog.provide('Renderer.WebGL.Private.GeometryAttribut');
goog.require('Renderer.Geometric.GeometryConfiguration');

/**
 * Represent a geometry attribut (normal, vertex, texture, color, …)
 * @constructor
 * @author Donovan ORHAN <dono@sybrix.fr>
 */
Renderer.WebGL.Private.GeometryAttribut = function() 
{
    /**
    * Normals counter.
    * @type {Renderer.WebGL.Buffer}
    * @public
    */
    this.buffer = null;

    /**
    * Name of the attribut, will be converted to equivalent in shader. 
    * @type {string}
    * @public
    */
    this.name = '';

    /**
    * Indicate if the attribut will be normalized by WebGL.
    * @type {boolean}
    * @public
    */
    this.normalize = false;

    /**
    * List of indices.
    * @type {number}
    * @public
    */
    this.offset = 0;

    /**
    * Size in bytes.
    * @type {number}
    * @public
    */
    this.size = 0;

    /**
    * Type of data.
    * @type {number}
    * @public
    */
    this.type = goog.webgl.FLOAT;

    /**
    * Indicate if the element use another buffer.
    * @type {boolean}
    * @public
    */
    this.useAnotherBuffer = false;

};

/**
* Prepare the attribut to be used.
* @param {string} name Name of the attribut. (ex: Position, Normal, …)
* @param {number} count Element count for a vertex attribut.
* @param {number=} type Type of the data.
* @param {number=} offset Offset if the attribut depend of a parent structure.
* @param {number=} size Total size if the attribut depend of a parent structure.
* @param {Uint8Array|Uint16Array|Uint32Array|Float32Array=} data Data to push isn't the attribut.
*/
Renderer.WebGL.Private.GeometryAttribut.prototype.prepare = function( name, count, type, offset, size, data )
{
    // Offset is specified? Attribut didn't required parent buffer.
    if( offset != undefined && data != undefined ) {
        this.buffer = new Renderer.WebGL.DataBuffer();
        this.buffer.fill( /** @type {ArrayBuffer} */(data) );
    }

    this.count  = count;
    this.name   = name;
    this.offset = offset || this.offset;
    this.type   = type   || this.type;
    this.size   = size   || this.size;
}