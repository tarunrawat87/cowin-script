/**
 * Author: Tarun Rawat
 */

const axios=require('axios');
const client=require('./call')
const twilloUrl= 'http://demo.twilio.com/docs/voice.xml';
const moment=require('moment');
/**
 *Imp:
 'to'  ----> No on which you want to get calls
 'from'---> Your twillo number
 */

const to= '+91XXXXXXXXX';
const from='+XXXXXXXXXX';
const district_id='318';//My state district Ujjain


async function script(coWinUrl){
const response=await axios.get(coWinUrl,
    /**
     * User-Agent is required else it throws 401
     */
{ headers: { 'User-Agent': 'Mozilla/5.0 (iPad; CPU OS 11_0 like Mac OS X) AppleWebKit/604.1.34 (KHTML, like Gecko) Version/11.0 Mobile/15A5341f Safari/604.1'} }
 );
const {centers}=response.data;
const availableSessions=[];


for(let center of centers){
/**
 * From all available centers
 */

 /**
  * Select centers with sessions 
  * where session 
  */
if(center.sessions&&Array.isArray(center.sessions)&&center.sessions.length>0){
   
    const {sessions}=center;
    /**
     * Create map of locations
     */ 
    const availSession={}; 

     let hasAvailableSessions=false 
    sessions.forEach((session)=>{
        /**
         * Wheere capacity is more than 0
         * and age limit is less than 45
         */
        if(session.available_capacity>0&&session.min_age_limit<45){
          
            if(!availSession[center.address])
            availSession[center.address]=[];
            availSession[center.address].push(session);
            hasAvailableSessions=true;
        }


    })   

  if(hasAvailableSessions){
    availableSessions.push(availSession);
   
  } 
}


}

return availableSessions;
}


/** 
 * Trying script after 5 seconds
 * Pleae do go below it
 * as it may cause rate limiting issue
*/
setInterval((async function(){
const currentDate=moment().format('DD-MM-YYYY');
const coWinUrl=`https://cdn-api.co-vin.in/api/v2/appointment/sessions/calendarByDistrict?district_id=${district_id}&date=${currentDate}`;

console.log(`********`);
const result=await  script(coWinUrl);
console.log(result)
/**
 * If slots are more than 0
 */
if(result.length>0){
    /**
     * Twillo client calling
     */
    client.calls
      .create({
         url:twilloUrl,
         to,
         from 
       })
      .then(call => console.log(call.sid));

}


}),5000);