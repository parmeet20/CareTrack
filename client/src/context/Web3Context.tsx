import React, { createContext, useContext, useState, useEffect } from "react";
import { ethers } from "ethers";
import abi from "../assets/CareTrack.json";
import { contractAddress } from "@/assets/contractAddress";

interface Doctor {
  name: string;
  specialization: string;
  registrationDate: number;
}

export interface Person {
  name: string;
  age: number;
  height: number;
  weight: number;
}

export interface Record {
  patient: Person;
  visitedDate: number;
  visitedDoctor: Doctor;
  diagnosis: string;
  prescription: string;
}

interface Web3ContextType {
  account: string | null;
  provider: ethers.BrowserProvider | null;
  contract: ethers.Contract | null;
  owner: string | null;
  doctor: Doctor | null;
  isDoctor: boolean;
  patient: Person | null;
  connectWallet: () => Promise<void>;
  disconnectWallet: () => void;
  addDoctor: (doctorAddress: string, name: string, specialization: string) => Promise<void>;
  addPatient: (name: string, age: number, height: number, weight: number) => Promise<void>;
  getDoctor: (doctorAddress: string) => Promise<Doctor | null>;
  getPatient: (patientAddress: string) => Promise<Person | null>;
  addRecord: (patientAddress: string, diagnosis: string, prescription: string) => Promise<void>;
  getRecords: (patientAddress: string) => Promise<Record[]>;
  getOwner: () => Promise<void>;
}

const Web3Context = createContext<Web3ContextType | undefined>(undefined);

interface Web3ContextProps {
  children: React.ReactNode;
}

export const Web3Provider: React.FC<Web3ContextProps> = ({ children }) => {
  const [account, setAccount] = useState<string | null>(null);
  const [provider, setProvider] = useState<ethers.BrowserProvider | null>(null);
  const [contract, setContract] = useState<ethers.Contract | null>(null);
  const [owner, setOwner] = useState<string | null>(null);
  const [doctor, setDoctor] = useState<Doctor | null>(null);
  const [isDoctor, setIsDoctor] = useState<boolean>(false);
  const [patient, setPatient] = useState<Person | null>(null);


  const connectWallet = async () => {
    if (window) {
      const _provider = new ethers.BrowserProvider(window.ethereum);
      const accounts = await _provider.send("eth_requestAccounts", []);
      setAccount(accounts[0]);
      setProvider(_provider);

      const _contract = new ethers.Contract(contractAddress, abi.abi, await _provider.getSigner());
      setContract(_contract);
    } else {
      alert("MetaMask is not installed");
    }
  };

  const disconnectWallet = () => {
    setAccount(null);
    setProvider(null);
    setContract(null);
    setDoctor(null);
    setPatient(null);
    setOwner(null);
    setIsDoctor(false);
  };

  const addDoctor = async (doctorAddress: string, name: string, specialization: string) => {
    if (contract && account) {
      try {
        const tx = await contract.addDoctor(doctorAddress, name, specialization);
        await tx.wait();
      } catch (err) {
        console.error("Error adding doctor:", err);
      }
    }
  };

  const getDoctor = async (doctorAddress: string) => {
    if (contract && account) {
      const doctorData = await contract.getDoctor(doctorAddress);
      if (doctorData.name) {
        setDoctor({
          name: doctorData.name,
          specialization: doctorData.specialization,
          registrationDate: doctorData.registrationDate,
        });
        setIsDoctor(true);
        return {
          name: doctorData.name,
          specialization: doctorData.specialization,
          registrationDate: doctorData.registrationDate,
        };
      } else {
        setIsDoctor(false);
        return null;
      }
    }
    return null;
  };

  const addPatient = async (name: string, age: number, height: number, weight: number) => {
    if (contract && account) {
      const tx = await contract.addPatient(name, age, height, weight);
      await tx.wait();
    }
  };

  const getPatient = async (patientAddress: string) => {
    if (contract && account) {
      const patientData = await contract.getPatient(patientAddress);
      setPatient({
        name: patientData.name,
        age: patientData.age,
        height: patientData.height,
        weight: patientData.weight,
      });
      return {
        name: patientData.name,
        age: patientData.age,
        height: patientData.height,
        weight: patientData.weight,
      };
    }
    return null;
  };

  const addRecord = async (patientAddress: string, diagnosis: string, prescription: string) => {
    console.log("Sending transaction...");
    const tx = await contract!.addRecord(account, patientAddress, diagnosis, prescription);
    console.log("Transaction sent:", tx);
    await tx.wait();
    console.log("Transaction confirmed:", tx);
  };

  const getRecords = async (patientAddress: string) => {
    if (contract && account) {
      const recordsData = await contract.getRecords(patientAddress);
      return recordsData.map((record: Record) => ({
        patient: {
          name: record.patient.name,
          age: record.patient.age,
          height: record.patient.height,
          weight: record.patient.weight,
        },
        visitedDate: record.visitedDate,
        visitedDoctor: record.visitedDoctor,
        diagnosis: record.diagnosis,
        prescription: record.prescription,
      }));
    }
    return [];
  };

  const getOwner = async () => {
    if (contract) {
      const ownerAddress = await contract.owner();
      setOwner(ownerAddress);
    }
  };

  useEffect(() => {
    connectWallet();
  }, [account]);

  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", (accounts: string[]) => {
        setAccount(accounts[0]);
        connectWallet();
      });
    }

    return () => {
      if (window.ethereum) {
        window.ethereum.removeListener("accountsChanged", () => {});
      }
    };
  }, []);

  useEffect(() => {
    if (contract) {
      getOwner();
      getDoctor(account!);
    }
  }, [contract]);

  return (
    <Web3Context.Provider
      value={{
        account,
        provider,
        contract,
        owner,
        doctor,
        isDoctor,
        patient,
        connectWallet,
        disconnectWallet,
        addDoctor,
        addPatient,
        getDoctor,
        getPatient,
        addRecord,
        getRecords,
        getOwner,
      }}
    >
      {children}
    </Web3Context.Provider>
  );
};

export const useWeb3Context = () => {
  const context = useContext(Web3Context);
  if (!context) {
    throw new Error("useWeb3Context must be used within a Web3Provider");
  }
  return context;
};
