# Digital Identity and Medical Records DApp

## Project Overview
This blockchain-based decentralized application (DApp) allows users to create and manage their digital identity cards and securely store medical records on the blockchain. The key features include:

- **Digital Identity Cards**: Users can store personal information such as name, age, weight, and height.
- **Medical Records**: Medical records include details of the doctor and the patient. Only registered doctors can add records to a user's profile.
- **Role-Based Access**:
  - Contract owner can register new users.
  - Only registered doctors can add medical records.
- **Downloadable Records**: Users can download their medical records as PDF files for offline use.

This DApp ensures transparency, immutability, and security for sensitive medical data.

---

## Features
1. **User Management**:
   - Contract owner registers new users.
   - Users can view and manage their personal information.

2. **Medical Records**:
   - Only registered doctors can add new medical records to a user's profile.
   - Medical records contain detailed information about the doctor and the user.

3. **PDF Downloads**:
   - Users can download any of their medical records as a PDF for offline use.

4. **Secure Blockchain Storage**:
   - All data is securely stored on the blockchain, ensuring immutability and transparency.

---

## Installation

<p>Follow the steps below to install the dependencies:</p>

```bash
cd client
npm i
cd ..
cd web3
npm i
cd ..
```

---

## Running the Project

<p>Follow these commands to start the application:</p>

```bash
cd web3
npx hardhat node
npx hardhat run ignition/modules/Dappazon.ts --network localhost # Run this in another terminal window
cd client
npm run dev
cd ..
```

---

## Project Structure

- **`web3/`**: Contains the smart contracts written in Solidity.
- **`client/`**: Contains the frontend application built with React.

---

## Technologies Used

- **Frontend**: React.js with TypeScript
- **Backend**: Solidity (Smart Contracts)
- **Blockchain Framework**: Hardhat
- **PDF Generation**: jsPDF (JavaScript library for generating PDF documents)

---

## Final Preview

<h2>Screenshots</h2>

<img width="960" alt="image" src="https://github.com/user-attachments/assets/2c792405-496f-4413-8765-5563a621f175"/>
<img width="960" alt="image" src="https://github.com/user-attachments/assets/a4d6ea4c-dc6c-4473-8095-93542e25f0e5"/>

---

## Contribution

If you'd like to contribute to this project, feel free to open a pull request or raise an issue. We welcome all contributions!

---

## License

This project is licensed under the [MIT License](LICENSE).
