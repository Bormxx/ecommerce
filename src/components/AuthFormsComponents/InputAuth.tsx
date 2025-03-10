import { Input, InputProps } from "@headlessui/react";
import { FieldValues, useController, UseControllerProps } from "react-hook-form";
import ErrorMessage from "./ErrorMessage";
import { ChangeEvent } from "react";
import { cn } from "@/shared/utils/frontend/cn";

type InputAuthProps<T extends FieldValues> = InputProps & UseControllerProps<T>;

export default function AuthInput<T extends FieldValues>(props: InputAuthProps<T> ) {
  const { name, control, disabled, defaultValue, onChange, ...inputProps} = props;

  const { field, fieldState  } = useController({name, control, disabled, defaultValue});

  const fieldOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    field.onChange(e);
  
    if(onChange) {
      onChange(e);
    }
  }

  return (
    <>
      <Input
        {...field}{...inputProps}
        onChange={fieldOnChange}
        className={cn(
          `${fieldState.error ? "border-red-500" : "border-gray-400"} rounded px-3 py-2`,
        )}
        autoComplete="on"
      />
      {fieldState.error?.message && (
        <ErrorMessage text={fieldState.error?.message} />
      )}
    </>
  );
}
