import React, { useState } from "react";
import { FormSchema } from "../utils/schemaTypes";
import MonacoEditor from "@monaco-editor/react";
import toastr from "toastr";

interface JSONEditorProps {
  schema: FormSchema | null;
  setSchema: (schema: FormSchema | null) => void;
  setError: (error: string | null) => void;
}

const validateSchema = (schema: any): boolean => {
  if (!schema || typeof schema !== "object") {
    toastr.error("Schema must be a valid JSON object.");
    return false;
  }
  if (!schema.fields || !Array.isArray(schema.fields)) {
    toastr.error("Schema must contain a 'fields' array.");
    return false;
  }
  for (const field of schema.fields) {
    if (!field.id || !field.type || !field.label) {
      toastr.error("Each field must have 'id', 'type', and 'label'.");
      return false;
    }
  }
  return true;
};

const JSONEditor: React.FC<JSONEditorProps> = ({
  schema,
  setSchema,
  setError,
}) => {
  const [editorValue, setEditorValue] = useState<string>(
    JSON.stringify(schema, null, 2)
  );

  const handleEditorChange = (value: string | undefined) => {
    if (!value) return;

    setEditorValue(value);
    try {
      const parsedSchema = JSON.parse(value);
      if (validateSchema(parsedSchema)) {
        setSchema(parsedSchema);
        setError(null); // Clear errors on valid schema
      } else {
        setSchema(null);
      }
    } catch (error) {
      setError("Invalid JSON format");
      toastr.error("Invalid JSON format.");
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(editorValue);
    toastr.success("Form JSON copied to clipboard!");
  };

  return (
    <div className="h-full w-full border-r">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-xl font-bold">JSON Editor</h2>
        <button
          onClick={copyToClipboard}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Copy Form JSON
        </button>
      </div>
      <MonacoEditor
        height="80vh"
        language="json"
        theme="vs-dark"
        value={editorValue}
        onChange={handleEditorChange}
      />
    </div>
  );
};

export default JSONEditor;
