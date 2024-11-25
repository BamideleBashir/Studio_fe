import * as Tabs from "@radix-ui/react-tabs";
import { useState } from "react";
import { IScapeState } from "../../../types";
import Tab1 from "./tabs/Tab1";
import Tab2 from "./tabs/Tab2";
import Tab3 from "./tabs/Tab3";
import SuccessTab from "./tabs/SuccessTab";

const CreateScapes = () => {
  const [scapeState, setScapeState] = useState<IScapeState>({
    scapeTitle: "sample scape",
    about: "lorem ipsum",
    category: "lorem",
    objectClass: [],
    objectApplication: [],
    view: {
      level: "public",
      users: [],
    },
    pinComments: {
      level: "public",
      users: [],
    },
    pinObjects: {
      level: "public",
      users: [],
    },
    spatialDomain: {
      enabled: "true",
      domains: [],
      limitPinningToDomain: false,
    },
    searchEngine: {
      enabled: true,
      keyword: [],
    },
    comment: true,
    scapeIcon: "a",
    scapeOwnershipLabel: {
      ownerName: "francis",
      ownerUrl: "",
    },
  });


  const [selectedTab, setSelectedTab] = useState("tab1");
  const [selectedObjects, setSelectedObjects] = useState<any[]>([]);

  return (
    <div>
      <div className="text-center">
        <h2 className="text-3xl font-bold">Studio</h2>
        <p>Create Scapes, map-based virtual worlds for real world activities</p>
      </div>
      

      <div>
        <Tabs.Root
          defaultValue="tab1"
          value={selectedTab}
          onValueChange={(value) => setSelectedTab(value)}
        >
          <Tabs.Content value="tab1">
            <Tab1
              scapeState={scapeState}
              setScapeState={setScapeState}
              setSelectedTab={setSelectedTab}
              selectedObjects={selectedObjects}
              setSelectedObjects={setSelectedObjects}
            />
          </Tabs.Content>

          <Tabs.Content value="tab2">
            <Tab2
              scapeState={scapeState}
              setScapeState={setScapeState}
              setSelectedTab={setSelectedTab}
              // selectedObjects={selectedObjects}
            />
          </Tabs.Content>

          <Tabs.Content value="tab3">
            <Tab3
              scapeState={scapeState}
              setScapeState={setScapeState}
              setSelectedTab={setSelectedTab}
              selectedObjects={selectedObjects}
            />
          </Tabs.Content>

          <Tabs.Content value="tab4">
            <SuccessTab />
          </Tabs.Content>
        </Tabs.Root>
      </div>
    </div>
  );
};

export default CreateScapes;
