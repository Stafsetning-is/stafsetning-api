import twilio from "twilio";
//import twilio from "twilio";
// Download the helper library from https://www.twilio.com/docs/node/install
// Your Account Sid and Auth Token from twilio.com/console
// DANGER! This is insecure. See http://twil.io/secure
const accountSid = "ACd4f085851e864a68aa4770ed7ea5d5bb";
const authToken = "5188de8f5b6dd2896ac64991a15db8fe";
const client = twilio(accountSid, authToken);

client.messages
  .create({
     body: "This is the ship that made the Kessel Run in fourteen parsecs?",
     from: "+14075834467",
     to: "+3546180021"
   })
  .then(message => console.log(message.sid));
