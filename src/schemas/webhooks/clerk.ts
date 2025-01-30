import { z } from "zod";

/** Base schema for common user data in Clerk webhooks */
const userDataSchema = z.object({
	id: z.string(),
	email_addresses: z.array(
		z.object({
			email_address: z.string().email(),
		}),
	),
	first_name: z.string().nullable(),
	last_name: z.string().nullable(),
});

/** Base schema for all Clerk webhook events */
const baseWebhookSchema = z.object({
	data: userDataSchema,
	object: z.literal("event"),
});

/** Schema for Clerk user.created webhook event */
export const userCreatedSchema = baseWebhookSchema.extend({
	type: z.literal("user.created"),
});

/** Schema for Clerk user.updated webhook event */
export const userUpdatedSchema = baseWebhookSchema.extend({
	type: z.literal("user.updated"),
});

/** Schema for Clerk user.deleted webhook event */
export const userDeletedSchema = baseWebhookSchema.extend({
	type: z.literal("user.deleted"),
});

/** Schema for Clerk user.signed_in webhook event */
export const userSignedInSchema = baseWebhookSchema.extend({
	type: z.literal("user.signed_in"),
});

/** Union type for all possible user webhook events */
export const userWebhookSchema = z.discriminatedUnion("type", [
	userCreatedSchema,
	userUpdatedSchema,
	userDeletedSchema,
	userSignedInSchema,
]);

/** Type for user.created webhook event */
export type UserCreatedWebhook = z.infer<typeof userCreatedSchema>;

/** Type for user.updated webhook event */
export type UserUpdatedWebhook = z.infer<typeof userUpdatedSchema>;

/** Type for user.deleted webhook event */
export type UserDeletedWebhook = z.infer<typeof userDeletedSchema>;

/** Type for user.signed_in webhook event */
export type UserSignedInWebhook = z.infer<typeof userSignedInSchema>;

/** Type for any user webhook event */
export type UserWebhook = z.infer<typeof userWebhookSchema>;
