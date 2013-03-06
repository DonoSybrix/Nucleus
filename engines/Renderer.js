goog.provide('Renderer.main');

goog.require('Renderer.Camera');
goog.require('Renderer.Scene');
goog.require('Renderer.WebGL.Texture');
goog.require('Renderer.WebGLRenderer');
goog.require('Renderer.WebGLRenderer.Program');

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
	var textureFactory = renderer.getTextureFactory();

	/**
	* Create a first texture.
	*/
	var texture = textureFactory.create();
	texture.loadFromFile("data/magpie.png");

	/**
	* Create custom program.
	*/
	var program = new Renderer.WebGLRenderer.Program();
	program.loadFromFolder("data/shaders/basic");


	/**
	* Finally draw.
	*/
	renderer.render( scene, camera );

};

window['application'] = Renderer.main;