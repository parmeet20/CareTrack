import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Doctor from "./components/shared/Doctor";
import Patient from "./components/shared/Patient";
import Record from "./components/shared/Record";
import UserRecords from "./components/shared/UserRecords";
import { useWeb3Context } from "./context/Web3Context";

const App: React.FC = () => {
  const { isDoctor } = useWeb3Context();
  return (
    <div className="mt-20 max-w-7xl mx-auto px-6">
      <Tabs defaultValue="patient" className="space-y-8 w-full">
        <TabsList className={`flex justify-around space-x-4 ${isDoctor ? 'w-[370px]' : 'w-[300px]'} mb-6`}>
          <TabsTrigger value="patient">Patient</TabsTrigger>
          <TabsTrigger value="doctor">Doctor</TabsTrigger>
          {isDoctor && <TabsTrigger value="record">Record</TabsTrigger>}
          <TabsTrigger value="user-records">User Records</TabsTrigger>
        </TabsList>

        <TabsContent value="patient">
          <Patient />
        </TabsContent>

        <TabsContent value="doctor">
          <Doctor />
        </TabsContent>


        {isDoctor && (
          <TabsContent value="record">
            <Record />
          </TabsContent>
        )}
        <TabsContent value="user-records">
          <UserRecords />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default App;
