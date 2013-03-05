goog.provide('Nucleus.File');
goog.require('Nucleus.Resource');

/**
 * A file.
 * @constructor
 * @param {string=} fileName Name of the resource.
 * @param {function(string, string)=} callback Function to execute when loading is done.
 * @extends Nucleus.Resource
 * @author Donovan ORHAN <dono@sybrix.fr>
 */
Nucleus.File = function( fileName, callback ) 
{
    Nucleus.Resource.call( this );

    /**
    * Load the asked file.
    */
    if( fileName )
    {
        this.loadFromFile( fileName, callback );
    }
};
goog.inherits( Nucleus.File, Nucleus.Resource );

/**
 * Load a file from another file.
 * @param {!string} fileName Name of the resource.
 * @param {function(string, string)=} callback Function to execute when loading is done.
 * @override
 */
Nucleus.File.prototype.loadFromFile = function( fileName, callback ) 
{
    var thisCopy = this;

    var client   = new XMLHttpRequest();
    client.open( 'GET', fileName, true );

    client.onreadystatechange = function() 
    {
        if( this.status == 200 && this.readyState == 4 )
        {
            callback( fileName, client.responseText );
        }
    };

    client.send();
};