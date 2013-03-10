goog.provide('Renderer.main');
goog.require('Renderer.Geometric.Geometry');
goog.require('Renderer.PrimitiveBuilder');
goog.require('Renderer.WebGL.Texture');
goog.require('Renderer.WebGLRenderer');
goog.require('Renderer.WebGL.ProgramLibrary');
goog.require('Renderer.Mesh');


Renderer.main = function() 
{
	/**
	* Create a rendering area.
	*/
	var renderer = new Renderer.WebGLRenderer( document.getElementById("test") );

	/**
	* Create a camera.
	*/
	var camera = new Renderer.Camera("3D" );
    camera.setPosition( 0, 0, 2 );
    camera.lookAt( 0, 0, -5 );
    camera.setPosition( 0, 0, 0 );

	/**
	* Create a scene.
	*/
	var scene = new Renderer.Scene();

	/**
	* Get the texture factory for this kind of rendererer.
	*/
	// var textureFactory = renderer.getTextureFactory();

	/**
	* Create a first texture.
	*/
	// var texture = textureFactory.create();
	// texture.loadFromFile("data/magpie.png");

	/**
	* Create a simple object.
	*/
	var mesh = new Renderer.Mesh( 	Renderer.PrimitiveBuilder.Plane(), 
									new Renderer.Materials.Material() );

        mesh.transformable.setScale( 1, 1, 1 );

	/**
	* Add mesh to the scene.
	*/
	scene.add( mesh );

	var program = Renderer.WebGL.ProgramLibrary.getInstance().getDefaultProgram();

	/**
	* Finally draw.
	*/
	renderer.render( scene, camera );
};

window['application'] = Renderer.main;