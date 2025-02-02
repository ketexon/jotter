"use client";

import { useForm } from "react-hook-form";
import { placeJot } from "./placeJot";
import { PlaceJotFormData, PlaceJotSchema } from "./schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormField } from "../../../components/FormFIeld";

export default function PlaceJotRenderer() {
	const {
		register,
		handleSubmit,
		formState: { errors },
		setError,
	} = useForm<PlaceJotFormData>({
		resolver: zodResolver(PlaceJotSchema), // Apply the zodResolver
	});

	return <form
		className="max-w-lg mx-auto flex flex-col"
		action={placeJot}
		onSubmit={handleSubmit(d => console.log(d))}
	>
		<FormField
			name="description"
			displayName="Description"
			type="text"
			register={register}
			error={errors.description}
			placeholder="Description"
		/>
		<input className="button" type="submit"/>
	</form>
}