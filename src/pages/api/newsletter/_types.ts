import { IsEmail } from "class-validator";

export class NewsletterSubscriptionInput {
    @IsEmail()
    email!: string;
}