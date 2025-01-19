import { useWeb3Context } from "@/context/Web3Context";
import React from "react";
import { Button } from "../ui/button";
import { MdOutlineMedicalInformation } from "react-icons/md";


const Navbar: React.FC = () => {
  const { connectWallet, account } = useWeb3Context();

  return (
    <nav className="w-full fixed top-0 left-0 z-10 px-6 py-4 backdrop-blur-lg bg-white/30 shadow-lg">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="text-2xl flex font-extrabold items-center">
         <MdOutlineMedicalInformation className="mr-1 text-3xl"/>
          <p>CareTrack</p>
        </div>

        <div className="flex items-center space-x-6">
          <Button onClick={connectWallet}>
            {account
              ? `Connected: ${account.slice(0, 6)}...${account.slice(-4)}`
              : "Connect Wallet"}
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
