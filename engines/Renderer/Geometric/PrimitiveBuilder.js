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

    geometry.setVertexNormals([
       0.0,  0.0,  0.0,
       0.0,  0.0,  0.0,
       0.0,  0.0,  0.0,
       0.0,  0.0,  0.0
    ]);

    geometry.setVertexColors([
       1.0,  1.0,  1.0, 1.0,
       1.0,  1.0,  1.0, 1.0,
       1.0,  1.0,  1.0, 1.0,
       1.0,  1.0,  1.0, 1.0 
    ]);

    geometry.setVertexTextureCoordinates([
        1.0,  0.0,
        1.0,  1.0,
        0.0,  1.0,
        0.0,  0.0
    ]);

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

/**
 * Return a cube geometry.
 * @return {Renderer.Geometric.Geometry} A cube geometry.
 */
Renderer.PrimitiveBuilder.Cube = function() 
{
    var geometry = new Renderer.Geometric.Geometry();

    var size = 0.5;

    geometry.setIndices([
        0,  1,  2,
        0,  2,  3,
        4,  5,  6,
        4,  6,  7,
        8,  9, 10,
        8, 10, 11,
       12, 13, 14,
       12, 14, 15,
       16, 17, 18,
       16, 18, 19,
       20, 21, 22,
       20, 22, 23 
    ]);

    geometry.setVertexPositions([
        -size, -size,  size,
         size, -size,  size,
         size,  size,  size,
        -size,  size,  size,

        -size, -size, -size,
        -size,  size, -size,
         size,  size, -size,
         size, -size, -size,

        -size,  size, -size,
        -size,  size,  size,
         size,  size,  size,
         size,  size, -size,

        -size, -size, -size,
         size, -size, -size,
         size, -size,  size,
        -size, -size,  size,

         size, -size, -size,
         size,  size, -size,
         size,  size,  size,
         size, -size,  size,

        -size, -size, -size,
        -size, -size,  size,
        -size,  size,  size,
        -size,  size, -size
    ]);

    // Texture positions.
    geometry.setVertexTextureCoordinates([

        // Front
        0.0,  0.67,
        0.33, 0.67,
        0.33, 1.0,
        0.0,  1.0,

        // Back
        1.0, 0.67,
        1.0, 1.0,
        0.67, 1.0,
        0.67, 0.67,

        // Top
        0.0,  0.67,
        0.33, 0.67,
        0.33, 1.0,
        0.0,  1.0,

        // Bottom
        0.0,  0.67,
        0.33, 0.67,
        0.33, 1.0,
        0.0,  1.0,

        // Right
        0.33, 0.34,
        0.33, 0.666,
        0.0,  0.666,
        0.0,  0.34,

        // Left
        0.34, 0.67,
        0.66, 0.67,
        0.66, 1.0,
        0.34, 1.0

    ]);

    // Normals positions.
    geometry.setVertexNormals([

      // Front
       0.0,  0.0,  1.0,
       0.0,  0.0,  1.0,
       0.0,  0.0,  1.0,
       0.0,  0.0,  1.0,
       
      // Back
       0.0,  0.0, -1.0,
       0.0,  0.0, -1.0,
       0.0,  0.0, -1.0,
       0.0,  0.0, -1.0,
       
      // Top
       0.0,  1.0,  0.0,
       0.0,  1.0,  0.0,
       0.0,  1.0,  0.0,
       0.0,  1.0,  0.0,
       
      // Bottom
       0.0, -1.0,  0.0,
       0.0, -1.0,  0.0,
       0.0, -1.0,  0.0,
       0.0, -1.0,  0.0,
       
      // Right
       1.0,  0.0,  0.0,
       1.0,  0.0,  0.0,
       1.0,  0.0,  0.0,
       1.0,  0.0,  0.0,
       
      // Left
      -1.0,  0.0,  0.0,
      -1.0,  0.0,  0.0,
      -1.0,  0.0,  0.0,
      -1.0,  0.0,  0.0
    ]);

    geometry.setVertexColors([

       1.0,  1.0,  1.0, 1.0,
       1.0,  1.0,  1.0, 1.0,
       1.0,  1.0,  1.0, 1.0,
       1.0,  1.0,  1.0, 1.0,

       1.0,  1.0,  1.0, 1.0,
       1.0,  1.0,  1.0, 1.0,
       1.0,  1.0,  1.0, 1.0,
       1.0,  1.0,  1.0, 1.0,

       1.0,  1.0,  1.0, 1.0,
       1.0,  1.0,  1.0, 1.0,
       1.0,  1.0,  1.0, 1.0,
       1.0,  1.0,  1.0, 1.0,

       1.0,  1.0,  1.0, 1.0,
       1.0,  1.0,  1.0, 1.0,
       1.0,  1.0,  1.0, 1.0,
       1.0,  1.0,  1.0, 1.0,

       1.0,  1.0,  1.0, 1.0,
       1.0,  1.0,  1.0, 1.0,
       1.0,  1.0,  1.0, 1.0,
       1.0,  1.0,  1.0, 1.0,

       1.0,  1.0,  1.0, 1.0,
       1.0,  1.0,  1.0, 1.0,
       1.0,  1.0,  1.0, 1.0,
       1.0,  1.0,  1.0, 1.0

    ]);

    geometry.build();

    return geometry;
};

