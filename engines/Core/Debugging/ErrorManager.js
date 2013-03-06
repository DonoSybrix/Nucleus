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
Nucleus.ErrorManager.warning = function( errorName ) 
{
    if( Nucleus.Config.DEBUG == true ) {
        window['console']['warn']( 'Nucleus log: ' + errorName );
    }
};

/**
 * Log an error.
 * @param {string} errorName Error's name.
 */
Nucleus.ErrorManager.error = function( errorName ) 
{
    if( Nucleus.Config.DEBUG == true ) {
        window['console']['error']( 'Nucleus log: ' + errorName );
    }
};