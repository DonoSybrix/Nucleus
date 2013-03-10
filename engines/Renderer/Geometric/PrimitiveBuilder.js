goog.provide('Renderer.PrimitiveBuilder');
goog.require('Renderer.Geometric.Geometry');

/**
 * Create a plane geometry.
 * @return {Renderer.Geometric.Geometry} A plane geometry.
 */
Renderer.PrimitiveBuilder.Plane = function() 
{
    var geometry = new Renderer.Geometric.Geometry();

    var size = 0.5;
    geometry.setVertexPositions([
         size, -size, 0,
         size,  size, 0,
        -size,  size, 0,
        -size, -size, 0
    ]);

    geometry.setIndices([
         0, 1, 2,
         2, 3, 0
    ]);

    /*geometry.setVertexNormals([
       0.0,  0.0,  0.0,
       0.0,  0.0,  0.0,
       0.0,  0.0,  0.0,
       0.0,  0.0,  0.0
    ]);*/

    // Update buffers.
    geometry.build();

    return geometry;
};

/**
 * Return a triangle geometry.
 * @return {Renderer.Geometric.Geometry} A triangle geometry.
 */
Renderer.PrimitiveBuilder.Triangle = function() 
{
    var geometry = new Renderer.Geometric.Geometry();

    var size = 0.5;
    geometry.setVertexPositions([
        -size, -size, 0,
            0,  size, 0,
         size, -size, 0
    ]);
    geometry.setIndices([
         0, 1, 2
    ]);
    geometry.build();

    return geometry;
};
