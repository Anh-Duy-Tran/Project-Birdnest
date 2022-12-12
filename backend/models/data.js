/**
 * Run-time data to store all the fetched data
 * 
 * The data schema of DATA: 
 * 
 * {
 * 
 *  report {
 *    deviceInformation : {
 *      listenRange : Number,
 *      deviceStarted : String date,
 *      uptimeSeconds : Number,
 *      updateIntervalMs : Number
 *    }
 * 
 *    capture : {
 *      drone : [
 *        {
 *          serialNumber : String,
 *          model : String,  
 *          manufacturer : String,  
 *          mac : String,  
 *          ipv4 : String,  
 *          ipv6 : String,  
 *          firmware : String,  
 *          positionY : Number,  
 *          positionX : Number,  
 *          altitude : Number,  
 *        }, {...}
 *      ]
 *    }
 *    
 * }
 */

export const DATA = [];