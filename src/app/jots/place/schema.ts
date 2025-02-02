import { z } from "zod";

export const PlaceJotSchema = z
	.object({
		description: z.string({ description: "Description" })
			.min(1, { message: "Required" }),
	})
	.required();

export type PlaceJotFormData = z.infer<typeof PlaceJotSchema>;
