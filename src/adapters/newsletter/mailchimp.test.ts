// BEGIN: ed8c6549bwf9
export const addEmailToNewsletterList = async (email: string) => {
  try {
    const response = await mailchimp.lists.getListMember(
      newsletterList,
      md5(email)
    )
    if (response.status === "subscribed") {
      console.log("Email already subscribed")
      return
    }
    await mailchimp.lists.addListMember(newsletterList, {
      email_address: email,
      status: "subscribed",
      tags: ["articles", "portfolio", "newsletter"],
    })
  } catch (e) {
    throw new Error("Mailchimp API call failed")
  }
}
// END: ed8c6549bwf9
