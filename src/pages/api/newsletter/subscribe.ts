import {
  Body,
  Catch,
  Post,
  ValidationPipe,
  createHandler,
} from "next-api-decorators"
import { subscribeEmailToNewsletter } from "@/adapters/newsletter"
import { NewsletterSubscriptionInput } from "./_types"
import { exceptionHandler } from "../_exceptions-handler"
import { successMessage } from "../_response-messages"

@Catch(exceptionHandler)
class NewsletterSubscriptionHandler {
  @Post()
  async subscribe(@Body(ValidationPipe) body: NewsletterSubscriptionInput) {
    await subscribeEmailToNewsletter(body.email)
    return successMessage
  }
}

export default createHandler(NewsletterSubscriptionHandler)
