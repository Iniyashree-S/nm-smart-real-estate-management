// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract PropertyDetail{
    address public owner;

    struct Property {
        string propertyId;
        string name;
        string location;
        string discription;
        address currentOwner;
    }

    mapping(string => Property) public properties;
    mapping(address => mapping(string => bool)) public hasAccess;

    event PropertyAdded(
        string indexed propertyId,
        string name,
        string location,
        address indexed owner
    );
    event PropertyTransferred(
        string indexed propertyId,
        address indexed from,
        address indexed to
    );

    constructor() {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only contract owner can call this");
        _;
    }

    modifier hasPropertyAccess(string memory propertyId) {
        require(
            hasAccess[msg.sender][propertyId],
            "You don't have access to this property"
        );
        _;
    }

    function addProperty(
        string memory propertyId,
        string memory name,
        string memory location,
        string memory _description
    ) external onlyOwner {
        require(
            bytes(properties[propertyId].propertyId).length == 0,
            "Property already exists"
        );

        properties[propertyId] = Property({
            propertyId: propertyId,
            name: name,
            location: location,
            discription : _description,
            currentOwner: owner
        });

        hasAccess[owner][propertyId] = true;

        emit PropertyAdded(propertyId, name, location, owner);
    }

    function transferProperty(
        string memory propertyId,
        address newOwner
    ) external hasPropertyAccess(propertyId) {
        require(newOwner != address(0), "Invalid new owner");

        address currentOwner = properties[propertyId].currentOwner;
        properties[propertyId].currentOwner = newOwner;

        hasAccess[currentOwner][propertyId] = false;
        hasAccess[newOwner][propertyId] = true;

        emit PropertyTransferred(propertyId, currentOwner, newOwner);
    }

    function getPropertyDetails(
        string memory propertyId
    ) external view returns (string memory, string memory, address) {
        Property memory prop = properties[propertyId];
        return (prop.name, prop.location, prop.currentOwner);
    }
}
