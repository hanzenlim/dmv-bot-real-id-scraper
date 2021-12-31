'use strict';
require('dotenv').config()
var cron = require('node-cron');

var AWS = require('aws-sdk');
const cypress = require('cypress')

async function sendSms(msg) {
  var params = {
      Message: msg,
      PhoneNumber: '+14158061102',
      MessageAttributes: {
          'AWS.SNS.SMS.SenderID': {
              'DataType': 'String',
              'StringValue': 'Test'
          }
      }
  };

  var publishTextPromise = new AWS.SNS({ apiVersion: '2010-03-31',
	  region: "us-east-1" }).publish(params).promise();

  try {
    const r = await publishTextPromise;
    console.log('result::', r);

  } catch (e) {
    console.error('Error when sending sms:', e);
  }

}

const execute = async (event) => {

  const results = await cypress
  .run({
    // the path is relative to the current working directory
    spec: './cypress/integration/dmv_plainfield_real_id_scraper_spec.js',
  });

  // If theres is a failure in the test, that means there is an available slots
  // Since we are testing for no available time slot
  if (results && results.totalFailed >= 1) {
      // send a text message
      console.log('No Appointment available');
      await sendSms('No Appointment available');
  } else {
      console.log('DMV Plainfield appointment available');
      await sendSms('DMV Plainfield Appointment available');
  }
};

cron.schedule('*/5 * * * *', () => {
	execute();
});