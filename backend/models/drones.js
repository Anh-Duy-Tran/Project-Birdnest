/**
 * Run-time data to store all the drone information and history logs.
 * 
 * The data schema of DRONES: 
 * 
 * {
 * 
 *  <drone's serial number> : {
 *    info : {
 *      serialNumber : String,
 *      model : String,
 *      manufacturer : String,  
 *      mac : String,  
 *      ipv4 : String,  
 *      ipv6 : String,  
 *      firmware : String,
 *    },
 *    coords : [
 *      {
 *        timestamp : Date String
 *        coord : {
 *          x : Number, 
 *          y : Number, 
 *          z : Number, 
 *        }
 *        violated : Boolean,
 *        distance : Number
 *      }, {...}
 *    ],
 *    violationCount : Number,
 *    pilot : Object ( only if violationCount > 0 )
 *    closestDistance : Number
 *   
 *  }, ...
 *    
 * }
 */

export const DRONES = {};