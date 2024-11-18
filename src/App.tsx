import React, { useState } from 'react';

import JSONEditor from './Components/JSONEditor';
import FormGenerator from './Components/FormGenerator';
import { FormSchema } from './utils/schemaTypes';
import './index.css';
import "toastr/build/toastr.min.css";
import { initialSchemaValue } from './utils/constants';

const App: React.FC = () => {
  const [schema, setSchema] = useState<FormSchema | any>(initialSchemaValue);
  const [error, setError] = useState<string | null>(null);
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => setDarkMode((prev) => !prev);

  return (
    <div className={darkMode ? 'dark' : ''}>
      <div className="flex h-screen bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100">
        <div className="w-1/2 p-4">
          <div className="flex justify-between mb-4">
            <h1 className="text-2xl font-bold">Dynamic Form Generator</h1>
            <button
              onClick={toggleDarkMode}
              className="bg-gray-300 dark:bg-gray-700 text-black dark:text-white px-4 py-2 rounded"
            >
              Enable {darkMode ? 'Light' : 'Dark'} Mode
            </button>
          </div>
          <JSONEditor schema={schema} setSchema={setSchema} setError={setError} />
          {error && <p className="text-red-500 mt-2">{error}</p>}
        </div>
        <div className="w-1/2 p-4">
          <FormGenerator schema={schema} />
        </div>
      </div>
    </div>
  );
};

export default App;