import mailchimp from '@mailchimp/mailchimp_marketing';
import crypto from 'crypto';

// TODO: create config file
const apiKey = process.env.MAILCHIMP_API_KEY
const server = process.env.MAILCHIMP_SERVER_PREFIX // e.g. us1
const newsletterList = process.env.MAILCHIMP_LIST_ID || '' // the audience needs to be created in mailchimp https://mailchimp.com/help/find-audience-id/
 
 
mailchimp.setConfig({
  apiKey,
  server,
});

export const addEmailToNewsletterList = async (email: string) => {
    try{
      // check if email is already subscribed or pending
      const encryptedEmail = crypto.createHash('md5').update(email).digest("hex");
      const response = await mailchimp.lists.getListMember(newsletterList, encryptedEmail);
      if(response.status === 'subscribed' || response.status === 'pending') {
        return;
      }
    }
    catch(e){
      const error = e as {status: number}
      if( error.status === undefined || error.status !== 404){
        throw new Error('Mailchimp API call failed')
      }
    }

    try{
      await mailchimp.lists.addListMember(newsletterList, {
        email_address: email,
        status: 'subscribed',
        tags: ['articles', 'portfolio', 'newsletter'],
      });
    }
    catch(e){
      throw new Error('Mailchimp API call failed')
    }
}
