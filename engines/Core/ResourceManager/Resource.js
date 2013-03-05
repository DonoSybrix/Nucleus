goog.provide('Nucleus.Resource');

/**
 * An abstract resource.
 * @constructor
 * @author Donovan ORHAN <dono@sybrix.fr>
 */
Nucleus.Resource = function() 
{
    /**
    * Name of the resource.
    * @type {string}
    * @protected
    */
    this.name = '';

    /**
    * Reference counter.
    * @type {number}
    * @protected
    */
    this.referenceCounter = 0;

    /**
    * State of the resource.
    * @type {boolean}
    */
    this.ready = false;

};

/**
 * Load a resource from the website.
 * @param {!string} fileName Name of the resource.
 * @param {function(string, string)=} callback Function to execute when loading is done.
 */
Nucleus.Resource.prototype.loadFromFile = function( fileName, callback ) { };

/**
 * Load a resource from the given data.
 * @param {Object|string} data Data to load in the resource.
 */
Nucleus.Resource.prototype.loadFromData = function( data ) { };

/**
 * Method called when a resource is ready to be used.
 * @param {string} fileName Name of the resource.
 * @param {*} fileContent Content of the file loaded.
 */
Nucleus.Resource.prototype.onFileLoaded = function( fileName, fileContent ) { };

/**
 * Add a reference.
 */
Nucleus.Resource.prototype.addReference = function() 
{ 
    this.referenceCounter++;
};

/**
 * Release the resource.
 * @return {number} References coutner value.
 */
Nucleus.Resource.prototype.release = function() 
{ 
    this.referenceCounter--;
    return this.referenceCounter;
};

/**
 * Return the name of the resource.
 * @return {string} Name of the resource.
 */
Nucleus.Resource.prototype.getName = function() 
{
    return this.name;
};