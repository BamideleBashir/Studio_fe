/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { NucleusApi } from "../../../api/nucleusApi";
import * as Tabs from "@radix-ui/react-tabs";
import AddAttributes from "./components/AddAttributes";
import AddAssociations from "./components/AddAssociations";
import AddVisuals from "./components/AddVisuals";
import SuccessPage from "./components/SuccessPage";
import { DigitizerApi } from "../../../api/digitizerApi";

interface INucleus {
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

interface Field {
  value: any;
  label: string;
  type: string;
}

const DigitizeObject = () => {
  const { object } = useParams();
  console.log(object);

  const [nucleus, setNucleus] = useState<INucleus>();

  useEffect(() => {
    if (!object) return;

    NucleusApi.getNucleusById(object)
      .then((res) => {
        console.log(res);
        setNucleus(res.data);
        setFields(res.data.fields);
      })
      .catch((err) => {
        console.log(err);
        alert("Error fetching nucleus");
        window.location.href = "/home";
      });
  }, [object]);

  const [selectedTab, setSelectedTab] = useState("add_attributes");

  const [fields, setFields] = useState<Field[]>(nucleus?.fields || []);
  const [images, setImages] = useState<File[]>([]);

  if (!nucleus) return <div>Loading...</div>;

  const handleCreateObject = () => {
    const payload = {
      templateId: nucleus._id,
      fields,
      images,
    };

    console.log(payload);
    // setSelectedTab("success");

    // return

    DigitizerApi.createDigitizer(payload)
      .then((res) => {
        console.log(res);
        setSelectedTab("success");
      })
      .catch((err) => {
        console.log(err);
        alert("Error creating object");
      });
  };

  return (
    <div className="px-4">
      <Tabs.Root
        defaultValue={selectedTab}
        value={selectedTab}
        onValueChange={(value) => setSelectedTab(value)}
      >
        <Tabs.Content value="add_attributes">
          <AddAttributes
            nucleus={nucleus}
            setSelectedTab={setSelectedTab}
            fields={fields}
            setFields={setFields}
          />
        </Tabs.Content>

        <Tabs.Content value="add_associations">
          <AddAssociations nucleus={nucleus} setSelectedTab={setSelectedTab} />
        </Tabs.Content>

        <Tabs.Content value="add_visuals">
          <AddVisuals
            nucleus={nucleus}
            setSelectedTab={setSelectedTab}
            handleCreateObject={handleCreateObject}
            images={images}
            setImages={setImages}
          />
        </Tabs.Content>

        <Tabs.Content value="success">
          <SuccessPage nucleus={nucleus} />
        </Tabs.Content>
      </Tabs.Root>
    </div>
  );
};

export default DigitizeObject;
