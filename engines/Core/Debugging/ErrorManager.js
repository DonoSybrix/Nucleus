goog.provide('Nucleus.ErrorManager');
goog.require('Nucleus.Config');

/**
 * The error manager.
 * @constructor
 * @author Donovan ORHAN <dono@sybrix.fr>
 */
Nucleus.ErrorManager = function() 
{

};

/**
 * Log an error.
 * @param {string} errorName Error's name.
 */
Nucleus.ErrorManager.log = function( errorName ) 
{
    if( Nucleus.Config.DEBUG == true ) {
        window['console']['log']( errorName );
    }
};