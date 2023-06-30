import { addEmailToNewsletterList } from "./mailchimp"

export const subscribeEmailToNewsletter = async (email: string) => {
  await addEmailToNewsletterList(email)
}
