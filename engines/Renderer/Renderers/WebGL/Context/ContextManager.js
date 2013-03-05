goog.provide('Renderer.WebGL.ContextManager');
goog.require('Renderer.WebGL.ContextFactory');

/**
 * WebGL contexts manager.
 * @constructor
 * @author Donovan ORHAN <dono@sybrix.fr>
 */
Renderer.WebGL.ContextManager = function()
{
    /**
    * Context factory.
    * @type {Renderer.WebGL.ContextFactory}
    * @private
    */
    this.contextFactory = new Renderer.WebGL.ContextFactory();

    /**
    * List of WebGL contexts available.
    * @type {Array.<WebGLRenderingContext>}
    * @private
    */
    this.contexts = [];

    /**
    * Stock the current used context.
    * @type {?WebGLRenderingContext}
    * @private
    */
    this.currentContext = null;

};
goog.addSingletonGetter( Renderer.WebGL.ContextManager );

/**
 * Return the current context used.
 * @return {WebGLRenderingContext} A WebGL context.
 */
Renderer.WebGL.ContextManager.prototype.getCurrentContext = function() 
{
    return this.currentContext;
};

/**
 * Create a new context.
 * @param {HTMLElement} canvas Canvas to use as a renderer.
 * @return {WebGLRenderingContext} A WebGL context.
 */
Renderer.WebGL.ContextManager.prototype.create = function( canvas ) 
{
    var context = this.contextFactory.create( canvas );

    // Register it in the list of context.
    this.register( context );

    // Activate the first context as default context.
    if( this.currentContext == null ) {
        this.setCurrentContext( context );
    }

    return context;
};

/**
 * Register a new context.
 * @param {WebGLRenderingContext} context Context to register.
 */
Renderer.WebGL.ContextManager.prototype.register = function(  context ) 
{
    this.contexts[this.contexts.length] = context;
};

/**
 * Set the current context used.
 * @param {WebGLRenderingContext} context A WebGL context.
 */
Renderer.WebGL.ContextManager.prototype.setCurrentContext = function( context ) 
{
    this.currentContext = context;
};