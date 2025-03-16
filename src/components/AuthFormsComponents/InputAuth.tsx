import { Input, InputProps } from "@headlessui/react";
import { FieldValues, useController, UseControllerProps } from "react-hook-form";
import ErrorMessage from "./ErrorMessage";
import { ChangeEvent, RefObject} from "react";
import { cn } from "@/shared/utils/frontend/cn";

type TErrorFont = {
  errorFont?: string
  mask?: RefObject<HTMLInputElement>
}

type InputAuthProps<T extends FieldValues> = InputProps & UseControllerProps<T> & TErrorFont;

export default function AuthInput<T extends FieldValues>(props: InputAuthProps<T> ) {
  const { name, control, disabled, defaultValue, onChange, errorFont="sm", ...inputProps} = props;

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
        ref={props.mask}
        className={cn(
          `${fieldState.error ? "border-red-500" : "border-gray-400"} rounded px-3 py-2`,
        )}
        autoComplete="on"
      />
      {fieldState.error?.message && (
        <ErrorMessage text={fieldState.error?.message} font={errorFont} />
      )}
    </>
  );
}
