import { useWeb3Context } from "@/context/Web3Context";
import React, { useState, useEffect } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { FaEthereum } from "react-icons/fa";

const Patient: React.FC = () => {
  const { addPatient, getPatient, patient, account } = useWeb3Context();
  const [name, setName] = useState<string>("");
  const [age, setAge] = useState<string>("");
  const [height, setHeight] = useState<string>("");
  const [weight, setWeight] = useState<string>("");

  useEffect(() => {
    if (account) {
      const fetchPatientData = async () => {
        const patientData = await getPatient(account);
        if (patientData) {
          console.log("Patient Data:", patientData);
        }
      };
      fetchPatientData();
    }
  }, [account, getPatient]);

  const handleAddPatient = async () => {
    if (!name || !age || !height || !weight) {
      alert("Please fill out all fields.");
      return;
    }
    try {
      await addPatient(name, Number(age), Number(height), Number(weight));
      alert("Patient added successfully!");
    } catch (error) {
      console.error("Error adding patient:", error);
      alert("There was an error adding the patient.");
    }
  };

  if (patient && patient.name) {
    return (
      <>
        <div className="max-w-md mx-auto my-20 bg-gradient-to-r rounded-3xl border bg-slate-50 hover:bg-muted p-8 shadow-lg">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-2xl font-semibold">My Wallet</h3>
            <FaEthereum className="text-3xl ml-2" />
          </div>

          <div className="space-y-4">
            <div className="flex justify-between">
              <p className="text-lg font-medium">UID:</p>
              <p className="text-lg">{account ? `${account.slice(0, 10)}...${account.slice(-10)}` : 'Not connected'}</p>
            </div>
            <div className="flex justify-between">
              <p className="text-lg font-medium">Name:</p>
              <p className="text-lg">{patient.name}</p>
            </div>

            <div className="flex justify-between">
              <p className="text-lg font-medium">Age:</p>
              <p className="text-lg">{Number(patient.age)}</p>
            </div>

            <div className="flex justify-between">
              <p className="text-lg font-medium">Height:</p>
              <p className="text-lg">{Number(patient.height)} cm</p>
            </div>

            <div className="flex justify-between">
              <p className="text-lg font-medium">Weight:</p>
              <p className="text-lg">{Number(patient.weight)} kg</p>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <div className="max-w-md mx-auto my-20 bg-gradient-to-r rounded-3xl border bg-slate-50 p-8 shadow-lg">
      <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">Patient Registration</h2>

      <div className="space-y-4">
        <Input
          type="text"
          placeholder="Patient Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-3 border rounded-lg shadow-sm"
        />
        <Input
          type="number"
          placeholder="Age"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          className="w-full p-3 border rounded-lg shadow-sm"
        />
        <Input
          type="number"
          placeholder="Height (in cm)"
          value={height}
          onChange={(e) => setHeight(e.target.value)}
          className="w-full p-3 border rounded-lg shadow-sm"
        />
        <Input
          type="number"
          placeholder="Weight (in kg)"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
          className="w-full p-3 border rounded-lg shadow-sm"
        />
        <Button
          onClick={handleAddPatient}
          className="w-full py-3 rounded-lg shadow-md"
        >
          Register as Patient
        </Button>
      </div>
    </div>
  );
};

export default Patient;
