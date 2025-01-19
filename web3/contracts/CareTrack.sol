// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;

contract CareTrack{

    struct Doctor {
        string name;
        string specialization;
        uint256 registrationDate;
    }

    struct Person {
        string name;
        uint16 age;
        uint16 height;
        uint16 weight;
    }

    struct Record {
        Person patient;
        uint256 visitedDate;
        Doctor visitedDoctor;
        string diagnosis;
        string prescription;
    }

    address public owner;
    
    constructor(){
        owner = msg.sender;
    }

    mapping(address => Doctor) public doctors;
    mapping(address => Person) public patients;
    mapping(address => Record[]) public records;

    event DoctorRegistered(address doctorAddress, string name, string specialization);
    event RecordAdded(address patientAddress, string doctorName, uint256 visitedDate);

    modifier onlyOwner(){
        require(owner == msg.sender);
        _;
    }

function addDoctor(address _doctorAddress, string memory _name, string memory _specialization) public onlyOwner {
    Doctor memory newDoctor = Doctor(_name, _specialization, block.timestamp);
    doctors[_doctorAddress] = newDoctor;
    emit DoctorRegistered(_doctorAddress, _name, _specialization);
}


    function getDoctor(address _doctorAddress) public view returns (Doctor memory) {
        return doctors[_doctorAddress];
    }

    function addPatient(string memory _name, uint16 _age, uint16 _height, uint16 _weight) public{
        Person memory newPatient = Person(_name, _age, _height, _weight);
        patients[msg.sender] = newPatient;
    }

    function getPatient(address _getPatitent) public view returns (Person memory) {
        return patients[_getPatitent];
    }

    function addRecord(
        address _doctorAddress,
        address _patientAddress,
        string memory _diagnosis,
        string memory _prescription
    ) public {
        require(bytes(doctors[_doctorAddress].name).length > 0, "Only registered doctor can perform this action");
        Record memory newRecord = Record({
            patient: patients[_patientAddress],
            visitedDate: block.timestamp,
            visitedDoctor: doctors[msg.sender],
            diagnosis: _diagnosis,
            prescription: _prescription
        });

        records[_patientAddress].push(newRecord);
        emit RecordAdded(_patientAddress, doctors[msg.sender].name, block.timestamp);
    }

    function getRecords(address _patientAddress) public view returns (Record[] memory) {
        return records[_patientAddress];
    }
}
