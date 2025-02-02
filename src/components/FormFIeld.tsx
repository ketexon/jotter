import React from "react";
import { FieldError, FieldPath, UseFormRegister, UseFormRegisterReturn } from "react-hook-form";
import { ZodSchema } from "zod";

export type FormFieldProps<T> = {
	type: string,
	placeholder: string,
	name: FieldPath<T>,
	displayName: string,
	register: UseFormRegister<T>,
	error?: FieldError,
	valueAsNumber?: boolean,
};

export function FormField<T>(props: FormFieldProps<T>) {
	const {
		type,
		placeholder,
		name,
		displayName,
		register,
		error,
		valueAsNumber,
	} = props;
	return <div className="flex flex-col">
		<span className="text-sm text-gray-500">
			{displayName}
		</span>
		<input
			className="border-2 border-blue-500"
			type={type}
			placeholder={placeholder}
			{...register(name, { valueAsNumber })}
		/>
		{error &&
			<span
				className="text-sm text-red-500"
			>
				{error.message}
			</span>
		}
	</div>
}