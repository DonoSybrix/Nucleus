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
    * @type {Renderer.Spacial|null}
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
    * @type {Core.Transformable}
    * @public
    */
    this.transformable = transformable || new Core.Transformable();

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

/**
 * Return the children of this spacial element.
 * @return {Array.<Renderer.Spacial>} A reference to the children.
 */
Renderer.Spacial.prototype.getChildren = function() 
{
    return this.children;
};

/**
 * Return the element parent.
 * @return {Renderer.Spacial|null} A reference to the parent or null.
 */
Renderer.Spacial.prototype.getParent = function() 
{
    return this.parent;
};