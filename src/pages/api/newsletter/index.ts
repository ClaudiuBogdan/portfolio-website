import { Body, ValidationPipe, createHandler, Post } from "next-api-decorators";
import { NewsletterSubscriptionInput } from "./_types";
import { subscribeEmailToNewsletter } from "@/adapters/newsletter";
import { successMessage } from "../_response-messages";


class NewsletterSubscriptionHandler {
  @Post()
  async subscribe(@Body(ValidationPipe) body: NewsletterSubscriptionInput) {
    await subscribeEmailToNewsletter(body.email);
    return successMessage;
  }
}

export default createHandler(NewsletterSubscriptionHandler);