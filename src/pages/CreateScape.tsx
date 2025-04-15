import { useState } from "react";
import * as Tabs from "@radix-ui/react-tabs";
import ScapeBasicInfo from "./components/ScapeBasicInfo";
import ScapeObjects from "./components/ScapeObjects";
import ScapeMetadata from "./components/ScapeMetadata";

export interface ScapeOwner {
  name?: string;
  link?: string;
}

export interface INucleus {
  _id: string;
  userId: string;
  primaryNature: string;
  category: string;
  parentTemplate: string;
  title: string;
  description: string;
  mobilityType: string;
  icon: {
    url: string;
    publicId: string;
  }
}

export interface ScapeObject {
  nucleus: INucleus;
  objectFunctions: string[];
  pinAccess?: 'public' | 'private' | 'admins';
  users?: string[];
}

export interface IScapeFormState {
  title: string;
  description: string;
  category: string;
  owner?: ScapeOwner;
  enableSearchEngine: boolean;
  keywords: string[];
  viewingAccess: 'public' | 'private' | 'admins' | string;
  commentAccess: 'disabled' | 'public' | 'private' | 'admins' | string;
  admins: string[];
  objects: ScapeObject[];
  geometry: {
    type: 'Point' | 'LineString' | 'Polygon' | 'MultiPoint' | 'MultiLineString' | 'MultiPolygon' | 'GeometryCollection';
    coordinates: number[][];
  }
}

const CreateScape = () => {
  const [selectedTab, setSelectedTab] = useState("basic_info");

  const [formData, setFormData] = useState<IScapeFormState>({
    title: '',
    description: '',
    category: '',
    owner: {
      name: '',
      link: '',
    },
    enableSearchEngine: false,
    keywords: [],
    viewingAccess: 'public',
    commentAccess: 'disabled',
    admins: [],
    objects: [],
    geometry: {
      type: 'Polygon',
      coordinates: [], 
    }
  })

  return (
    <div className="px-4">
      <Tabs.Root
        defaultValue={selectedTab}
        value={selectedTab}
        onValueChange={(value) => setSelectedTab(value)}
      >
        <Tabs.Content value="basic_info">
          <ScapeBasicInfo
            formData={formData}
            setFormData={setFormData}
            setSelectedTab={setSelectedTab}
          />
        </Tabs.Content>

        <Tabs.Content value="scape_objects">
          <ScapeObjects
            formData={formData}
            setFormData={setFormData}
            setSelectedTab={setSelectedTab}
          />
        </Tabs.Content>

        <Tabs.Content value="scape_metadata">
          <ScapeMetadata
            formData={formData}
            setFormData={setFormData}
            setSelectedTab={setSelectedTab}
          />
        </Tabs.Content>
      </Tabs.Root>
    </div>
  )
}

export default CreateScape