import mailchimp from '@mailchimp/mailchimp_marketing';

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