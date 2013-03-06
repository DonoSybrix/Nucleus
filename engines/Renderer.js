goog.provide('Renderer.main');

goog.require('Renderer.Cameras.Camera');
goog.require('Renderer.Scene');
goog.require('Renderer.WebGL.Texture');
goog.require('Renderer.WebGLRenderer');

Renderer.main = function() 
{
	/**
	* Create a rendering area.
	*/
	var renderer = new Renderer.WebGLRenderer( document.getElementById("test") );

	/**
	* Get the texture factory for this kind of rendererer.
	*/
	var textureFactory = renderer.getTextureFactory();

	/**
	* Create a first texture.
	*/
	var texture = textureFactory.create();
	texture.loadFromFile("data/magpie.png");


	var texture2 = textureFactory.create();
	texture2.loadFromFile("data/bunny.ogg");
	texture2.getSource().play();

};

window['application'] = Renderer.main;