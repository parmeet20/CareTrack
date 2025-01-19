import { useWeb3Context } from "@/context/Web3Context";
import React, { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";

interface Dr {
  name: string;
  specialization: string;
  registrationDate: number;
}

const Doctor: React.FC = () => {
  const { addDoctor, getDoctor, doctor, account, owner } = useWeb3Context();
  const [doctorAddress, setDoctorAddress] = useState("");
  const [name, setName] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [doctorData, setDoctorData] = useState<Dr | null>(null);

  const handleAddDoctor = async () => {
    await addDoctor(doctorAddress, name, specialization);
  };

  const handleGetDoctor = async () => {
    const doctorDetails = await getDoctor(doctorAddress);
    setDoctorData(doctorDetails);
  };

  return (
    <div className="p-8 mx-auto">
      {owner?.toLowerCase() !== account?.toLowerCase() ? (
        <>
          <div className="max-w-md w-full space-y-4 p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold text-center text-gray-800">Get Doctor Details</h2>
            <Input
              type="text"
              placeholder="Enter Doctor Address"
              value={doctorAddress}
              onChange={(e) => setDoctorAddress(e.target.value)}
              className="w-full p-3 border rounded-lg shadow-sm"
            />
            <Dialog open={doctorData !== null} onOpenChange={(open) => open || setDoctorData(null)}>
              <DialogTrigger asChild>
                <Button
                  onClick={handleGetDoctor}
                  className="w-full"
                >
                  Get Doctor
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle className="text-lg font-semibold text-gray-700">Doctor Information</DialogTitle>
                </DialogHeader>
                {doctorData ? (
                  <div className="text-gray-700">
                    <DialogDescription>
                      <p className="mb-2"><strong>Name:</strong> {doctorData.name}</p>
                      <p><strong>Specialization:</strong> {doctorData.specialization}</p>
                    </DialogDescription>
                  </div>
                ) : (
                  <DialogDescription>
                    <p className="text-red-500">No doctor data available.</p>
                  </DialogDescription>
                )}
              </DialogContent>
            </Dialog>
          </div>
        </>
      ) : (
        <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">Doctor Registration</h2>
          <Input
            type="text"
            placeholder="Doctor Address"
            value={doctorAddress}
            onChange={(e) => setDoctorAddress(e.target.value)}
            className="w-full p-3 border rounded-lg shadow-sm mb-4"
          />
          <Input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-3 border rounded-lg shadow-sm mb-4"
          />
          <Input
            type="text"
            placeholder="Specialization"
            value={specialization}
            onChange={(e) => setSpecialization(e.target.value)}
            className="w-full p-3 border rounded-lg shadow-sm mb-6"
          />
          <div className="space-y-3">
            <Button
              onClick={handleAddDoctor}
              className="w-full"
            >
              Add Doctor
            </Button>
            <Button
              onClick={handleGetDoctor}
              className="w-full"
            >
              Get Doctor Details
            </Button>
          </div>

          {doctor && (
            <div className="mt-6 text-gray-700">
              <p><strong>Name:</strong> {doctor.name}</p>
              <p><strong>Specialization:</strong> {doctor.specialization}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Doctor;
