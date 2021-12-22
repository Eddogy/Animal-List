"use strict";

import Animal from "./animal.js";

// Bird Class
  class Bird extends Animal {
    constructor(animalType, species, beakColor, featherColor, petName, petOwner, ownerPhone, microChip) {
        super(animalType, petName, petOwner, ownerPhone, microChip);
        this.species = species;
        this.beakColor = beakColor;
        this.featherColor = featherColor;
    }
}

// UI Class: Handle UI Tasks
class UI {
    static displayBirds() {
        const birds = Store.getBirds();
        birds.forEach((bird) => UI.addBirdToList(bird));
    }

    static addBirdToList(bird) {
      

        const birdParentTable = document.querySelector("#delete-bird");
        

        const birdTable = document.createElement("thead");
        birdTable.id = "bird-table";
        birdParentTable.append(birdTable);
       
        const birdTableRow = document.createElement("tr");
        birdTable.append(birdTableRow);
     
        const birdTableHeadAnimalType = document.createElement("th");
        birdTableHeadAnimalType.textContent = "Animal Type";
        birdTableRow.append(birdTableHeadAnimalType);

        const birdTableHeadSpecies = document.createElement("th");
        birdTableHeadSpecies.textContent = "Species";
        birdTableRow.append(birdTableHeadSpecies);

        const birdTableHeadBeakColor = document.createElement("th");
        birdTableHeadBeakColor.textContent = "Beak Color";
        birdTableRow.append(birdTableHeadBeakColor);

        const birdTableHeadFeatherColor = document.createElement("th");
        birdTableHeadFeatherColor.textContent = "Feather Color"
        birdTableRow.append(birdTableHeadFeatherColor);

        const birdTableHeadPetName = document.createElement("th");
        birdTableHeadPetName.textContent = "Pet Name"
        birdTableRow.append(birdTableHeadPetName);

        const birdTableHeadPetOwner = document.createElement("th");
        birdTableHeadPetOwner.textContent = "Pet Owner";
        birdTableRow.append(birdTableHeadPetOwner);

        const birdTableHeadOwnerPhone = document.createElement("th");
        birdTableHeadOwnerPhone.textContent = "Owner Phone";
        birdTableRow.append(birdTableHeadOwnerPhone);

        const birdTableHeadMicrochipNumber = document.createElement("th");
        birdTableHeadMicrochipNumber.textContent = "Microchip Number";
        birdTableRow.append(birdTableHeadMicrochipNumber);

        const birdTableBodyList = document.createElement("tbody");
        birdTableBodyList.id = "bird-list";
        birdParentTable.append(birdTableBodyList);

        const birdTableBodyListRow = document.createElement("tr");
        birdTableBodyList.append(birdTableBodyListRow);

        const birdDataAnimalType = document.createElement("td");
        birdTableBodyListRow.append(birdDataAnimalType);
        birdDataAnimalType.append(bird.animalType);

        const birdDataSpecies = document.createElement("td");
        birdTableBodyListRow.append(birdDataSpecies);
        birdDataSpecies.append(bird.species);

        const birdDataBeakColor = document.createElement("td");
        birdTableBodyListRow.append(birdDataBeakColor);
        birdDataBeakColor.append(bird.beakColor);

        const birdDataFeatherColor = document.createElement("td");
        birdTableBodyListRow.append(birdDataFeatherColor);
        birdDataFeatherColor.append(bird.featherColor);

        const birdDataPetName = document.createElement("td");
        birdTableBodyListRow.append(birdDataPetName);
        birdDataPetName.append(bird.petName);

        const birdDataPetOwner = document.createElement("td");
        birdTableBodyListRow.append(birdDataPetOwner);
        birdDataPetOwner.append(bird.petOwner);

        const birdDataOwnerPhone = document.createElement("td");
        birdTableBodyListRow.append(birdDataOwnerPhone);
        birdDataOwnerPhone.append(bird.ownerPhone);

        const birdDataMicrochip = document.createElement("td");
        birdTableBodyListRow.append(birdDataMicrochip);
        birdDataMicrochip.append(bird.microChip);

        const birdDataDelete = document.createElement("td");
        birdTableBodyListRow.append(birdDataDelete);
        const birdDataDeleteLink = document.createElement("a");
        birdDataDelete.append(birdDataDeleteLink);
        birdDataDeleteLink.setAttribute("href", "#");
        birdDataDeleteLink.className = "btn btn-danger btn-sm delete";
        birdDataDeleteLink.textContent = "X";
        
    }
    static deleteBird(el) {
        if(el.classList.contains('delete')) {
            el.parentElement.parentElement.remove();
            const birdTable = document.querySelector("#bird-table");
            birdTable.remove();
        }
    }

    static showAlert(message, className) {
        const div = document.createElement("div");
        div.className = `alert alert-${className}`;
        div.appendChild(document.createTextNode(message));
        const container = document.querySelector(".container");
        const form = document.querySelector("#animal-form");
        container.insertBefore(div, form);
        // Vanish in 3 seconds
        setTimeout(() => document.querySelector(".alert").remove(), 3000);
    }

    static clearFields() {
        document.querySelector("#animal-type").value = "";
        document.querySelector("#bird-species").value = "";
        document.querySelector("#bird-beak-color").value = "";
        document.querySelector("#bird-feather-color").value = "";
        document.querySelector("#bird-pet-name").value = "";
        document.querySelector("#bird-pet-owner").value = "";
        document.querySelector("#bird-owner-phone").value = "";
        document.querySelector("#bird-microchip-number").value = "";
    }
}


// Store CLass: Handle Storage
class Store {
    static getBirds() {
        let birds;
        if(localStorage.getItem("birds") === null) {
            birds = [];
        } else {
            birds = JSON.parse(localStorage.getItem("birds"));
        }

        return birds;
    }

    static addBird(bird) {
        const birds = Store.getBirds();
        birds.push(bird);

        localStorage.setItem("birds", JSON.stringify(birds));
    }

    static removeBird(microChip) {
        const birds = Store.getBirds();

        birds.forEach((bird, index) => {
            if(bird.microChip === microChip) {
                birds.splice(index, 1);
            }
        });

        localStorage.setItem("birds", JSON.stringify(birds));
    }
}

// Event: Display bird
document.addEventListener("DOMContentLoaded", UI.displayBirds);

// Event: Add a bird
document.querySelector("#animal-form").addEventListener("submit", (e) => {
    // Prevent actual submit
    e.preventDefault();

    // Get form values
    const animalType = document.querySelector("#animal-type").value;
    const species = document.querySelector("#bird-species").value;
    const beakColor = document.querySelector("#bird-beak-color").value;
    const featherColor = document.querySelector("#bird-feather-color").value;
    const petName = document.querySelector("#bird-pet-name").value;
    const petOwner = document.querySelector("#bird-pet-owner").value;
    const ownerPhone = document.querySelector("#bird-owner-phone").value;
    const microChip = document.querySelector("#bird-microchip-number").value;

    // Validate
    if(animalType === "" || species === "" || beakColor === "" || featherColor === "" || petName === "" || petOwner === "" || ownerPhone === "" || microChip === "") {
        // UI.showAlert("Please fill in all fields", "danger");
    } else {
         // Instatiate bird
    const bird = new Bird(animalType, species, beakColor, featherColor, petName, petOwner, ownerPhone, microChip);

    // Add bird to UI
    UI.addBirdToList(bird);

    // Add bird to store
    Store.addBird(bird);

    // Show success message
    UI.showAlert("Bird Added", "success");

    // Clear Fields
    UI.clearFields();
    }
});

// Event: Remove a bird
document.querySelector("#delete-bird").addEventListener("click", (e) => {
    // Remove bird from UI
    UI.deleteBird(e.target);

    // Remove bird from store
    Store.removeBird(e.target.parentElement.previousElementSibling.textContent);

   UI.showAlert("Bird Removed", "success");
});

// Display bird Fields
const sourceBird = document.querySelector("#animal-type");
const targetBird = document.querySelector("#bird-input");

const displayBirdFieldsWhenSelected = (sourceBird, value, targetBird) => {
    const selectedIndex = sourceBird.selectedIndex;
    const isSelected = sourceBird[selectedIndex].value === value;
    targetBird.classList[isSelected
        ? "add"
        : "remove"
    ]("show");
};
sourceBird.addEventListener("change", (evt) =>
    displayBirdFieldsWhenSelected(sourceBird, "Bird", targetBird)
);
