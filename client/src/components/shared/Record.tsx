import React, { useState } from "react";
import { useWeb3Context } from "@/context/Web3Context";
import { Button } from "../ui/button";

const Record: React.FC = () => {
  const { addRecord, isDoctor } = useWeb3Context();
  const [patientAddress, setPatientAddress] = useState<string>("");
  const [diagnosis, setDiagnosis] = useState<string>("");
  const [prescription, setPrescription] = useState<string>("");

  const handleAddRecord = async () => {
    if (!isDoctor) {
      alert("You must be a registered doctor to add records.");
      return;
    }
    if (!patientAddress || !diagnosis || !prescription) {
      alert("Please fill all fields.");
      return;
    }
    try {
      await addRecord(patientAddress, diagnosis, prescription);
      alert("Record added successfully!");
    } catch (error) {
      console.error("Error adding record:", error);
      alert("Failed to add record. Please try again.");
    }
  };
  if(!isDoctor){
    return null;
  }
  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold mb-4">Add Medical Record</h2>
      <div className="space-y-4">
        <div>
          <label className="block text-lg font-medium">Patient Address</label>
          <input
            type="text"
            className="w-full p-3 border rounded-lg"
            placeholder="Enter patient address"
            value={patientAddress}
            onChange={(e) => setPatientAddress(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-lg font-medium">Diagnosis</label>
          <input
            type="text"
            className="w-full p-3 border rounded-lg"
            placeholder="Enter diagnosis"
            value={diagnosis}
            onChange={(e) => setDiagnosis(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-lg font-medium">Prescription</label>
          <input
            type="text"
            className="w-full p-3 border rounded-lg"
            placeholder="Enter prescription"
            value={prescription}
            onChange={(e) => setPrescription(e.target.value)}
          />
        </div>
        <Button
        className="w-full"
          onClick={handleAddRecord}
        >
          Add Record
        </Button>
      </div>
    </div>
  );
};

export default Record;
