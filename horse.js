"use strict";

import Animal from "./animal.js";

// Horse Class
  class Horse extends Animal {
    constructor(animalType, breed, hairColor, horseShoes, petName, petOwner, ownerPhone, microChip) {
        super(animalType, petName, petOwner, ownerPhone, microChip);
        this.breed = breed;
        this.hairColor = hairColor;
        this.horseShoes = horseShoes;
    }
}

// UI Class: Handle UI Tasks
class UI {
    static displayHorses() {
        const horses = Store.getHorses();
        horses.forEach((horse) => UI.addHorseToList(horse));
    }

    static addHorseToList(horse) {
       

        const horseParentTable = document.querySelector("#delete-horse");
        

        const horseTable = document.createElement("thead");
        horseTable.id = "horse-table";
        horseParentTable.append(horseTable);
       
        const horseTableRow = document.createElement("tr");
        horseTable.append(horseTableRow);
     
        const horseTableHeadAnimalType = document.createElement("th");
        horseTableHeadAnimalType.textContent = "Animal Type";
        horseTableRow.append(horseTableHeadAnimalType);

        const horseTableHeadBreed = document.createElement("th");
        horseTableHeadBreed.textContent = "Breed";
        horseTableRow.append(horseTableHeadBreed);

        const horseTableHeadHairColor = document.createElement("th");
        horseTableHeadHairColor.textContent = "Hair color";
        horseTableRow.append(horseTableHeadHairColor);

        const horseTableHeadHorseShoes = document.createElement("th");
        horseTableHeadHorseShoes.textContent = "Horse Shoes";
        horseTableRow.append(horseTableHeadHorseShoes);

        const horseTableHeadHorseName = document.createElement("th");
        horseTableHeadHorseName.textContent = "Horse Name";
        horseTableRow.append(horseTableHeadHorseName);

        const horseTableHeadOwner = document.createElement("th");
        horseTableHeadOwner.textContent = "Horse Owner";
        horseTableRow.append(horseTableHeadOwner);

        const horseTableHeadOwnerPhone = document.createElement("th");
        horseTableHeadOwnerPhone.textContent = "Owner Phone";
        horseTableRow.append(horseTableHeadOwnerPhone);

        const horseTableHeadMicrochip = document.createElement("th");
        horseTableHeadMicrochip.textContent = "Microchip Number";
        horseTableRow.append(horseTableHeadMicrochip);

        const horseTableBodyList = document.createElement("tbody");
        horseTableBodyList.id = "horse-list";
        horseParentTable.append(horseTableBodyList);

        const horseTableBodyListRow = document.createElement("tr");
        horseTableBodyList.append(horseTableBodyListRow);

        const horseDataAnimalType = document.createElement("td");
        horseTableBodyListRow.append(horseDataAnimalType);
        horseDataAnimalType.append(horse.animalType);

        const horseDataBreed = document.createElement("td");
        horseTableBodyListRow.append(horseDataBreed);
        horseDataBreed.append(horse.breed);

        const horseDataHairColor = document.createElement("td");
        horseTableBodyListRow.append(horseDataHairColor);
        horseDataHairColor.append(horse.hairColor);

        const horseDataHorseShoes = document.createElement("td");
        horseTableBodyListRow.append(horseDataHorseShoes);
        horseDataHorseShoes.append(horse.horseShoes);

        const horseDataHorseName = document.createElement("td");
        horseTableBodyListRow.append(horseDataHorseName);
        horseDataHorseName.append(horse.petName);

        const horseDataOwner = document.createElement("td");
        horseTableBodyListRow.append(horseDataOwner);
        horseDataOwner.append(horse.petOwner);

        const horseDataOwnerPhone = document.createElement("td");
        horseTableBodyListRow.append(horseDataOwnerPhone);
        horseDataOwnerPhone.append(horse.ownerPhone);

        const horseDataMicrochip = document.createElement("td");
        horseTableBodyListRow.append(horseDataMicrochip);
        horseDataMicrochip.append(horse.microChip);

        const horseDataDelete = document.createElement("td");
        horseTableBodyListRow.append(horseDataDelete);
        const horseDataDeleteLink = document.createElement("a");
        horseDataDelete.append(horseDataDeleteLink);
        horseDataDeleteLink.setAttribute("href", "#");
        horseDataDeleteLink.className = "btn btn-danger btn-sm delete";
        horseDataDeleteLink.textContent = "X";
        
    }
    static deleteHorse(el) {
        if(el.classList.contains('delete')) {
            el.parentElement.parentElement.remove();
            const horseTable = document.querySelector("#horse-table");
            horseTable.remove();
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
        document.querySelector("#horse-breed").value = "";
        document.querySelector("#horse-hair-color").value = "";
        document.querySelector("#horse-shoes").value = "";
        document.querySelector("#horse-yes").value = "";
        document.querySelector("#horse-no").value = "";
        document.querySelector("#horse-name").value = "";
        document.querySelector("#horse-owner").value = "";
        document.querySelector("#horse-owner-phone").value = "";
        document.querySelector("#horse-microchip-number").value = "";
    }
}


// Store CLass: Handle Storage
class Store {
    static getHorses() {
        let horses;
        if(localStorage.getItem("horses") === null) {
            horses = [];
        } else {
            horses = JSON.parse(localStorage.getItem("horses"));
        }

        return horses;
    }

    static addHorse(horse) {
        const horses = Store.getHorses();
        horses.push(horse);

        localStorage.setItem("horses", JSON.stringify(horses));
    }

    static removeHorse(microChip) {
        const horses = Store.getHorses();

        horses.forEach((horse, index) => {
            if(horse.microChip === microChip) {
                horses.splice(index, 1);
            }
        });

        localStorage.setItem("horses", JSON.stringify(horses));
    }
}

// Event: Display Horse
document.addEventListener("DOMContentLoaded", UI.displayHorses);

// Event: Add a Horse
document.querySelector("#animal-form").addEventListener("submit", (e) => {
    // Prevent actual submit
    e.preventDefault();

    // Get form values
    const animalType = document.querySelector("#animal-type").value;
    const breed = document.querySelector("#horse-breed").value;
    const hairColor = document.querySelector("#horse-hair-color").value;
    const horseShoes = document.querySelector("#horse-shoes").value;
    const horseName = document.querySelector("#horse-name").value;
    const horseOwner = document.querySelector("#horse-owner").value;
    const ownerPhone = document.querySelector("#horse-owner-phone").value;
    const microChip = document.querySelector("#horse-microchip-number").value;

    // Validate
    if(animalType === "" || breed === "" || hairColor === "" || horseShoes === "" || horseName === "" || horseOwner === "" || ownerPhone === "" || microChip === "") {
        // UI.showAlert("Please fill in all fields", "danger");
    } else {
         // Instatiate Horse
    const horse = new Horse(animalType, breed, hairColor, horseShoes, horseName, horseOwner, ownerPhone, microChip);

    // Add Horse to UI
    UI.addHorseToList(horse);

    // Add Horse to store
    Store.addHorse(horse);

    // Show success message
    UI.showAlert("Horse Added", "success");

    // Clear Fields
    UI.clearFields();
    }
});

// Event: Remove a Horse
document.querySelector("#delete-horse").addEventListener("click", (e) => {
    // Remove horse from UI
    UI.deleteHorse(e.target);

    // Remove horse from store
    Store.removeHorse(e.target.parentElement.previousElementSibling.textContent);

   UI.showAlert("Horse Removed", "success");
});

// Display Horse Fields
const sourceHorse = document.querySelector("#animal-type");
const targetHorse = document.querySelector("#horse-input");

const displayHorseFieldsWhenSelected = (sourceHorse, value, targetHorse) => {
    const selectedIndex = sourceHorse.selectedIndex;
    const isSelected = sourceHorse[selectedIndex].value === value;
    targetHorse.classList[isSelected
        ? "add"
        : "remove"
    ]("show");
};
sourceHorse.addEventListener("change", (evt) =>
    displayHorseFieldsWhenSelected(sourceHorse, "Horse", targetHorse)
);