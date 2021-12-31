'use strict';
require('dotenv').config()
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

  var publishTextPromise = new AWS.SNS({ apiVersion: '2010-03-31' }).publish(params).promise();

  try {
    const r = await publishTextPromise;
    console.log('result::', r);

  } catch (e) {
    console.error('Error when sending sms:', e);
  }

}

module.exports.hello = async (event) => {
  // console.log('xhello');
  // return {
  //   statusCode: 200,
  //   body: JSON.stringify(
  //     {
  //       message: 'Go Serverless v1.0! Your function executed successfully!',
  //       input: event,
  //     },
  //     null,
  //     2
  //   ),
  // };

  const results = await cypress
  .run({
    // the path is relative to the current working directory
    spec: './cypress/integration/ph_renewal_scraper_spec.js',
  });

  // If theres is a failure in the test, that means there is an available slots
  // Since we are testing for no available time slot
  if (results && results.totalFailed >= 1) {
      // send a text message
      console.log('Appointment available');
  } else {
      console.log('No appointment available');
      await sendSms('No appointment available');
  }

  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: 'Go Serverless v1.0! Your function executed successfully!',
        input: event,
      },
      null,
      2
    ),
  };

  // .then(async (results) => {
  //   // console.log('result::', results)

  //   // If theres is a failure in the test, that means there is an available slots
  //   // Since we are testing for no available time slot
  //   if (results && results.totalFailed >= 1) {
  //       // send a text message
  //       console.log('Appointment available');
  //   } else {
  //       console.log('No appointment available');
  //       await sendSms('No appointment available');
  //   }

  //   return {
  //     statusCode: 200,
  //     body: JSON.stringify(
  //       {
  //         message: 'Go Serverless v1.0! Your function executed successfully!',
  //         input: event,
  //       },
  //       null,
  //       2
  //     ),
  //   };
  // })
  // .catch((err) => {
  //   console.error('err::', err)
  // })



};
