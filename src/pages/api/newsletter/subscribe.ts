import { Body, ValidationPipe, createHandler, Post, Catch } from "next-api-decorators";
import { NewsletterSubscriptionInput } from "./_types";
import { subscribeEmailToNewsletter } from "@/adapters/newsletter";
import { successMessage } from "../_response-messages";
import { exceptionHandler } from "../_exceptions-handler";

@Catch(exceptionHandler)
class NewsletterSubscriptionHandler {
  @Post()
  async subscribe(@Body(ValidationPipe) body: NewsletterSubscriptionInput) {
    await subscribeEmailToNewsletter(body.email);
    return successMessage;
  }
}

export default createHandler(NewsletterSubscriptionHandler);