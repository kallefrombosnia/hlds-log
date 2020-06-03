/*jshint esversion: 6 */

//const {HLDS_Log}= require('hlds-log');
const HLDS_Log = require('../app');

logger = new HLDS_Log(27050, true);

// Start logger
logger.start();

// Increase listeners limit to avoid warning
logger.setMaxListeners(15);

logger.once('hlds_connect', (info) => {
    console.log('Server connected!' + info.address);
});

logger.on('kill', info =>{
    console.log(info);
});

logger.on('raw', raw => {
    console.log(raw);
});

logger.on('say_team', info => {
    console.log(info);
});

logger.on('say', info => {
    console.log(info);
}); 

logger.on('join', info => {
    console.log(info);
});

logger.on('leave', info => {
    console.log(info);
});

logger.on('enter', info => {
    console.log(info);
});

logger.on('end_score', info => {
    console.log(info);
});

logger.on('player_action', info => {
    console.log(info);
});

logger.on('server_action', info => {
    console.log(info);
});

logger.on('round_end', info => {
    console.log(info);
});

logger.on('connect', info => {
    console.log(info);
});

logger.on('map_change', info => {
    console.log(info);
});

logger.on('map_start', info => {
    console.log(info);
});

logger.on('suicide', info => {
    console.log(info);
});

logger.on('shutdown', info => {
    console.log(info);
});

logger.on('log_off', info => {
    console.log(info);
});