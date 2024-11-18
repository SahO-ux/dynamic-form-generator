import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { FormSchema } from "../utils/schemaTypes";
import toastr from "toastr";

interface FormGeneratorProps {
  schema: FormSchema | null;
}

const FormGenerator: React.FC<FormGeneratorProps> = ({ schema }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit: SubmitHandler<any> = (data) => {
    console.log("Form Submitted Data:", data);

    toastr.success("Form is Submitted");

    // Create a JSON file and download it
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'form-submission.json';
    link.click();
  };

  if (!schema || !schema?.fields) {
    toastr.error("No valid form schema provided.");
    return <p>No form schema provided.</p>;
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <h2 className="text-2xl font-bold">{schema.formTitle || "Form"}</h2>
      <p className="mb-4">{schema.formDescription || ""}</p>

      {schema.fields.map((field) => (
        <div key={field.id} className="flex flex-col">
          <label htmlFor={field.id} className="font-semibold">
            {field.label} {field.required && "*"}
          </label>

          {field.type === "text" ||
          field.type === "email" ||
          field.type === "textarea" ? (
            <input
              id={field.id}
              type={field.type}
              placeholder={field.placeholder}
              {...register(field.id, {
                required: field.required ? `${field.label} is required` : false,
                pattern: field.validation?.pattern
                  ? {
                      value: new RegExp(field.validation.pattern),
                      message: field.validation.message || "Invalid format",
                    }
                  : undefined,
              })}
              className={`border p-2 rounded ${
                errors[field.id] ? "border-red-500" : "border-gray-300"
              }`}
            />
          ) : null}

          {field.type === "select" && (
            <select
              id={field.id}
              {...register(field.id, {
                required: field.required ? `${field.label} is required` : false,
              })}
              className={`border p-2 rounded ${
                errors[field.id] ? "border-red-500" : "border-gray-300"
              }`}
            >
              <option value="">Select an option</option>
              {field.options?.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          )}

          {field.type === "radio" && (
            <div>
              {field.options?.map((option) => (
                <label key={option.value} className="mr-4">
                  <input
                    type="radio"
                    value={option.value}
                    {...register(field.id, {
                      required: field.required
                        ? `${field.label} is required`
                        : false,
                    })}
                    className="mr-1"
                  />
                  {option.label}
                </label>
              ))}
            </div>
          )}

          {errors[field.id] && (
            <p className="text-red-500 text-sm mt-1">
              {(errors[field.id] as any).message}
            </p>
          )}
        </div>
      ))}

      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
        Submit & Download form as JSON
      </button>
    </form>
  );
};

export default FormGenerator;
