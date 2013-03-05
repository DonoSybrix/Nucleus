goog.provide('Renderer.Spacial');
goog.require('Core.Transformable');

/**
 * A spacial element : Base of elements.
 * @constructor
 * @param {Core.Transformable=} transformable The transformable to use.
 * @author Donovan ORHAN <dono@sybrix.fr>
 */
Renderer.Spacial = function( transformable ) 
{
    /**
    * Parent element.
    * @type {Core.Transformable|null}
    * @protected
    */
    this.parent = null;

    /**
    * Spacial's Children.
    * @type {Array.<Renderer.Spacial>}
    * @protected
    */
    this.children = [];

    /**
    * Spacial's transformable, define position, scale, rotation, ….
    * @type {Renderer.Transformable}
    * @public
    */
    this.transformable = transformable || new Nucleus.Transformable();

};

/**
 * Add a children to the spacial element.
 * @param {Renderer.Spacial} object Element to add.
 */
Renderer.Spacial.prototype.add = function( object ) 
{
    this.children[this.children.length] = object;
};

/**
 * Change the transformable linked to the spacial element.
 * @param {Core.Transformable} transformable A Transformable object.
 */
Renderer.Spacial.prototype.setTransformable = function( transformable ) 
{
    this.transformable = transformable;
};
