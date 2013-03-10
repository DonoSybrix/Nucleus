goog.provide('Renderer.Geometric.GeometryConfiguration');

/**
 * Used to define a geometric configuration (attributs offset).
 * @constructor
 * @author Donovan ORHAN <dono@sybrix.fr>
 */
Renderer.Geometric.GeometryConfiguration = function() { };

/**
 * Element count per vertex (x, y, z).
 * @const
 * @type {number}
 */
Renderer.Geometric.GeometryConfiguration.DATACOUNT_POSITION = 3;

/**
 * Element count per color (r, g, b, a).
 * @const
 * @type {number}
 */
Renderer.Geometric.GeometryConfiguration.DATACOUNT_COLOR = 4;

/**
 * Element count per normal (x, y, z).
 * @const
 * @type {number}
 */
Renderer.Geometric.GeometryConfiguration.DATACOUNT_NORMAL = 3;

/**
 * Element count per texture coordinates (x, y).
 * @const
 * @type {number}
 */
Renderer.Geometric.GeometryConfiguration.DATACOUNT_TEXTURE = 2;

/**
 * Enum for types's size.
 * @enum {number}
 */
Renderer.Geometric.GeometryConfiguration.TypeSize = {
    FLOAT : 4,
    SHORT : 1,
};

/**
 * Enum for types's size.
 * @enum {number}
 */
Renderer.Geometric.GeometryConfiguration.GeometryType = {
    HIGH        : 2147483647,
    MEDIUM      : 65535,
    SMALL       : 255
};

/**
 * Enum for element's total length.
 * @enum {number}
 */
Renderer.Geometric.GeometryConfiguration.ElementLength = {
    COLOR    : Renderer.Geometric.GeometryConfiguration.DATACOUNT_COLOR    * Renderer.Geometric.GeometryConfiguration.TypeSize.SHORT,
    NORMAL   : Renderer.Geometric.GeometryConfiguration.DATACOUNT_NORMAL   * Renderer.Geometric.GeometryConfiguration.TypeSize.FLOAT,
    POSITION : Renderer.Geometric.GeometryConfiguration.DATACOUNT_POSITION * Renderer.Geometric.GeometryConfiguration.TypeSize.FLOAT,
    TEXTURE  : Renderer.Geometric.GeometryConfiguration.DATACOUNT_TEXTURE  * Renderer.Geometric.GeometryConfiguration.TypeSize.FLOAT
};