// utils/smsService.js
export const sendSMS = async (number, message) => {
  console.log(`SMS to ${number}: ${message}`);
  // Plug Twilio / local SMS gateway here
};
