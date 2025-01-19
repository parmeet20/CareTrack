import React, { useEffect, useState } from "react";
import { Record, useWeb3Context } from "@/context/Web3Context";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { jsPDF } from "jspdf";
import { Button } from "../ui/button";
import { FaUserDoctor } from "react-icons/fa6";

const UserRecords: React.FC = () => {
  const { account, getRecords } = useWeb3Context();
  const [records, setRecords] = useState<Record[]>([]);

  useEffect(() => {
    if (account) {
      const fetchRecords = async () => {
        try {
          const fetchedRecords = await getRecords(account);
          setRecords(fetchedRecords);
        } catch (error) {
          console.error("Error fetching records:", error);
        }
      };
      fetchRecords();
    }
  }, [account, getRecords]);

  const generatePDF = (record: Record) => {
    const doc = new jsPDF();

    doc.setFontSize(22);
    doc.setFont("helvetica", "bold");
    doc.text(`Medical Record - ${record.patient.name}`, 20, 20);

    doc.setFontSize(14);
    doc.setFont("helvetica", "normal");
    doc.text(`Visited Doctor: Dr. ${record.visitedDoctor.name}`, 20, 40);

    doc.setFontSize(12);
    doc.text(
      `Visited Date: ${new Date(
        Number(record.visitedDate) * 1000
      ).toLocaleDateString()}`,
      20,
      50
    );
    doc.setFontSize(12);
    doc.text("Diagnosis:", 20, 70);
    doc.setFont("helvetica", "normal");
    doc.text(record.diagnosis, 60, 70, { maxWidth: 150 });

    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.text("Prescription:", 20, 90);
    doc.setFont("helvetica", "normal");
    doc.text(record.prescription, 60, 90, { maxWidth: 150 });

    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.text(`Patient: ${record.patient.name}`, 20, 110);

    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.text("Generated using CareTrack", 20, 280);
    doc.save(`Medical_Record_${record.patient.name}_${record.visitedDate}.pdf`);
  };

  return (
    <div className="space-y-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {records.length > 0 ? (
        records.map((record, index) => (
          <Card
            key={index}
            className="w-full min-h-[300px] flex flex-col hover:bg-muted mx-auto shadow-xl rounded-lg p-6 bg-white overflow-hidden"
          >
            <CardHeader className="border-b border-gray-200 pb-4">
              <CardTitle className="text-lg font-semibold">{`Record ${
                index + 1
              }`}</CardTitle>
              <CardDescription className="text-gray-500 space-y-5 flex">
                <FaUserDoctor className="text-xl mr-2" />
                {`Visited Doctor: Dr. ${record.visitedDoctor.name}`}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 py-5 flex-grow">
              <p>
                <strong>Diagnosis:</strong> {record.diagnosis}
              </p>
              <p>
                <strong>Prescription:</strong>{" "}
                {record.prescription.length > 50
                  ? `${record.prescription.slice(0, 60)}...`
                  : record.prescription}
              </p>
              <p>
                <strong>Visited Date:</strong>{" "}
                {new Date(
                  Number(record.visitedDate) * 1000
                ).toLocaleDateString()}
              </p>
            </CardContent>
            <CardFooter className="pt-4 flex flex-col border-t border-gray-200">
              <div className="block mb-2 text-gray-700">{`Patient: ${record.patient.name}`}</div>
              <Button
                onClick={() => generatePDF(record)}
              >
                Download Receipt
              </Button>
            </CardFooter>
          </Card>
        ))
      ) : (
        <p>No records found for this user.</p>
      )}
    </div>
  );
};

export default UserRecords;
