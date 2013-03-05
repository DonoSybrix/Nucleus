goog.provide('Nucleus.ResourceManager');
goog.require('Nucleus.Resource');

/**
 * A resource manager.
 * @constructor
 * @author Donovan ORHAN <dono@sybrix.fr>
 */
Nucleus.ResourceManager = function() 
{
    /**
    * List of resources.
    * @type {Array.<Nucleus.Resource>}
    * @protected
    */
    this.resources = [];

};
goog.addSingletonGetter( Nucleus.ResourceManager );

/**
 * Add a resource to the manager.
 * @param {string} name Name of the resource.
 * @param {!Nucleus.Resource} resource Resource to add.
 */
Nucleus.ResourceManager.prototype.add = function( name, resource ) 
{
    this.resources[name] = resource;
};

/**
 * Get a resource in the manager by his name.
 * @param  {!string} resourceName Name of the resource.
 * @return {?Nucleus.Resource} The resource or Null.
 */
Nucleus.ResourceManager.prototype.get = function( resourceName ) 
{
    var element = this.resources[resourceName];
    if( element == undefined ) {
        return null;
    }

    return /** @type {!Nucleus.Resource} */  (element);
};

/**
 * Get a resource in the manager by his name.
 * @param  {!string} type Type of resource.
 * @param  {!string} resourceName Name of the resource.
 */
Nucleus.ResourceManager.prototype.remove = function( type, resourceName ) 
{
    for ( var i = 0, len = this.resources.length; i < len; i++ )
    {
        if ( this.resources[i].getName() == resourceName )
        {            
            var element = /** @type {!Nucleus.Resource} */ (this.resources[i][i]);
            if( element.release() )
            {
                this.resources.splice( i, 1 );
            }
            break;
        } 
    }
};
