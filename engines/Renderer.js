goog.provide('Renderer.main');
goog.require('Renderer.Geometric.Geometry');
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
	var camera = new Renderer.Camera("3D");

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
	var mesh = new Renderer.Mesh();
	//mesh.setGeometry( new Renderer.Primitive.Triangle() );

	var geometry = new Renderer.Geometric.Geometry();
	geometry.setVertexPositionCount( 2 );
	geometry.addVertexPosition( 0, 1, 2 );
	geometry.addVertexPosition( 3, 4, 5 );

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