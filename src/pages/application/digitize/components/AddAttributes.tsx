/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";

export interface INucleus {
  _id: string; // Unique identifier for the category
  title: string; // Title of the category (e.g., "Mobile Phones")
  category?: string; // Optional: Parent category ID (if applicable)
  icon?: string; // Optional: URL for the category icon
  natureOfObject?: string; // Optional: Description of the category's nature (e.g., "artificial")
  objectDescription?: string; // Optional: Description of the category's objects
  primaryClass?: string; // Optional: Primary classification of the category's objects (e.g., "static")
  states?: string[]; // Optional: Array of states associated with the category (if applicable)
  fields?: Field[]; // Array of fields defining the category's objects (structure may vary)
  user?: string; // Optional: ID of the user who created the category
  createdAt: string; // Date and time the category was created (ISO 8601 format)
  updatedAt: string; // Date and time the category was last updated (ISO 8601 format)
  __v?: number; // Optional: Mongoose version field (if applicable)
}

// const FieldTypes = [
//   { value: "text", label: "Small Copy" },
//   { value: "textarea", label: "Long Copy" },
//   { value: "number", label: "Number" },
//   { value: "date", label: "Date" },
//   { value: "tel", label: "Phone" },
//   { value: "url", label: "URL" },
//   { value: "color", label: "Color" },
//   { value: "file", label: "File" },
//   // { value: "select", label: "Select" },
// ];

interface Field {
  value: any; // supposed to be empty initially
  label: string;
  type: string;
}

type Props = {
  nucleus: INucleus;
  setSelectedTab: React.Dispatch<React.SetStateAction<string>>;
  fields: Field[];
  setFields: React.Dispatch<React.SetStateAction<Field[]>>;
};

const AddAttributes = ({ nucleus, setSelectedTab, fields, setFields }: Props) => {

  const handleContinue = () => {
    console.log(fields);

    // make sure all fields are filled
    // const emptyFields = fields.filter((field) => !field.value);
    // if (emptyFields.length > 0) {
    //   alert("Please fill all fields");
    //   return;
    // }

    // for (const key in fields) {
    //   if (!fields[key].value) {
    //     alert(`Please fill in the ${fields[key].label} field`);
    //     return;
    //   }
    // }

    setSelectedTab("add_associations")
  };

  return (
    <div>
      <div>
        <h2 className="text-3xl font-semibold text-gray-800 mb-4">
          Add Attributes for{" "}
          <span className="text-blue-500">{nucleus?.title}</span>
        </h2>

        <p>{nucleus?.objectDescription}</p>
      </div>

      <div className="mt-8">
        <h3 className="text-2xl font-semibold text-gray-800 mb-4">
          Add Attributes
        </h3>

        {fields.map((field, index) => (
          <div key={index} className=" items-center mb-4">
            <label className="w-full text-gray-600">{field.label}</label>
            <input
              type={field.type}
              className="w-full bg-[#fdfeff] p-2 rounded-lg border border-gray-300"
              value={field.value}
              onChange={(e) => {
                const newFields = [...fields];
                newFields[index].value = e.target.value;
                setFields(newFields);
              }}
            />
          </div>
        ))}
      </div>

      <div className="mb-10">
        <div className="mt-6">
          <button
            onClick={() => handleContinue()}
            className="bg-primary text-white p-2 px-4 rounded-lg block w-full"
          >
            Continue
          </button>
        </div>

        <div className="mt-6">
          <button
            onClick={() => window.history.back()}
            className="bg-white text-black p-2 px-4 rounded-lg block w-full font-medium"
          >
            Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddAttributes;
