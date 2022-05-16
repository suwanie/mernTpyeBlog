import { Twilio } from "twilio";

// 굳이.. 변수 불러오는걸로 안해도 되지 않나?
const accountSid = `${process.env.TWILIO_ACCOUNT_SID}`;
const authToken = `${process.env.TWILIO_AUTH_TOKEN}`;
const from = `${process.env.TWILIO_PHONE_NUMBER}`;
const client = new Twilio(accountSid, authToken);

export const sendSms = (to: string, body: string, txt: string) => {
  try {
    client.messages
      .create({
        body: `BFY ${txt} - ${body}`,
        from,
        to,
      })
      .then((message) => console.log(message.sid));
  } catch (err) {
    console.log(err);
  }
};
