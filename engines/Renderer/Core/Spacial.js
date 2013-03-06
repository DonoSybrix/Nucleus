goog.provide('Renderer.Core.Spacial');
goog.require('Core.Transformable');

/**
 * A spacial element : Base of elements.
 * @constructor
 * @param {Core.Transformable=} transformable The transformable to use.
 * @author Donovan ORHAN <dono@sybrix.fr>
 */
Renderer.Core.Spacial = function( transformable ) 
{
    /**
    * Parent element.
    * @type {Renderer.Core.Spacial|null}
    * @protected
    */
    this.parent = null;

    /**
    * Spacial's Children.
    * @type {Array.<Renderer.Core.Spacial>}
    * @protected
    */
    this.children = [];

    /**
    * Children counter.
    * @type {number}
    * @protected
    */
    this.childrenCounter = 0;

    /**
    * Spacial's transformable, define position, scale, rotation, ….
    * @type {Core.Transformable}
    * @public
    */
    this.transformable = transformable || new Core.Transformable();

};

/**
 * Add a children to the spacial element.
 * @param {Renderer.Core.Spacial} object Element to add.
 */
Renderer.Core.Spacial.prototype.add = function( object ) 
{
    this.children[this.childrenCounter] = object;
    this.childrenCounter++;
};

/**
 * Change the transformable linked to the spacial element.
 * @param {Core.Transformable} transformable A Transformable object.
 */
Renderer.Core.Spacial.prototype.setTransformable = function( transformable ) 
{
    this.transformable = transformable;
};

/**
 * Return the children of this spacial element.
 * @return {Array.<Renderer.Core.Spacial>} A reference to the children.
 */
Renderer.Core.Spacial.prototype.getChildren = function() 
{
    return this.children;
};

/**
 * Return the number of children of this spacial element.
 * @return {number} Children counter.
 */
Renderer.Core.Spacial.prototype.getChildrenCount = function() 
{
    return this.childrenCounter;
};

/**
 * Return the element parent.
 * @return {Renderer.Core.Spacial|null} A reference to the parent or null.
 */
Renderer.Core.Spacial.prototype.getParent = function() 
{
    return this.parent;
};