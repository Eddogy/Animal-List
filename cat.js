"use strict";

import Animal from "./animal.js";

// Cat Class
  class Cat extends Animal {
    constructor(animalType, breed, furColor, petName, petOwner, ownerPhone, microChip) {
      super(animalType, petName, petOwner, ownerPhone, microChip);
      this.breed = breed;
      this.furColor = furColor;
    }
}

// UI Class: Handle UI Tasks
class UI {
    static displayCats() {
        const cats = Store.getCats();
        cats.forEach((cat) => UI.addCatToList(cat));
    }

    static addCatToList(cat) {
       

        const catParentTable = document.querySelector("#delete-cat");
        

        const catTable = document.createElement("thead");
        catTable.id = "cat-table";
        catParentTable.append(catTable);
       
        const catTableRow = document.createElement("tr");
        catTable.append(catTableRow);
     
        const catTableHeadAnimalType = document.createElement("th");
        catTableHeadAnimalType.textContent = "Animal Type";
        catTableRow.append(catTableHeadAnimalType);

        const catTableHeadBreed = document.createElement("th");
        catTableHeadBreed.textContent = "Breed";
        catTableRow.append(catTableHeadBreed);

        const catTableHeadFurColor = document.createElement("th");
        catTableHeadFurColor.textContent = "Fur color";
        catTableRow.append(catTableHeadFurColor);

        const catTableHeadPetName = document.createElement("th");
        catTableHeadPetName.textContent = "Pet Name"
        catTableRow.append(catTableHeadPetName);

        const catTableHeadPetOwner = document.createElement("th");
        catTableHeadPetOwner.textContent = "Pet Owner";
        catTableRow.append(catTableHeadPetOwner);

        const catTableHeadOwnerPhone = document.createElement("th");
        catTableHeadOwnerPhone.textContent = "Owner Phone";
        catTableRow.append(catTableHeadOwnerPhone);

        const catTableHeadMicrochipNumber = document.createElement("th");
        catTableHeadMicrochipNumber.textContent = "Microchip Number";
        catTableRow.append(catTableHeadMicrochipNumber);

        const catTableBodyList = document.createElement("tbody");
        catTableBodyList.id = "cat-list";
        catParentTable.append(catTableBodyList);

        const catTableBodyListRow = document.createElement("tr");
        catTableBodyList.append(catTableBodyListRow);

        const catDataAnimalType = document.createElement("td");
        catTableBodyListRow.append(catDataAnimalType);
        catDataAnimalType.append(cat.animalType);

        const catDataBreed = document.createElement("td");
        catTableBodyListRow.append(catDataBreed);
        catDataBreed.append(cat.breed);

        const catDataFurcolor = document.createElement("td");
        catTableBodyListRow.append(catDataFurcolor);
        catDataFurcolor.append(cat.furColor);

        const catDataPetName = document.createElement("td");
        catTableBodyListRow.append(catDataPetName);
        catDataPetName.append(cat.petName);

        const catDataPetOwner = document.createElement("td");
        catTableBodyListRow.append(catDataPetOwner);
        catDataPetOwner.append(cat.petOwner);

        const catDataOwnerPhone = document.createElement("td");
        catTableBodyListRow.append(catDataOwnerPhone);
        catDataOwnerPhone.append(cat.ownerPhone);

        const catDataMicrochip = document.createElement("td");
        catTableBodyListRow.append(catDataMicrochip);
        catDataMicrochip.append(cat.microChip);

        const catDataDelete = document.createElement("td");
        catTableBodyListRow.append(catDataDelete);
        const catDataDeleteLink = document.createElement("a");
        catDataDelete.append(catDataDeleteLink);
        catDataDeleteLink.setAttribute("href", "#");
        catDataDeleteLink.className = "btn btn-danger btn-sm delete";
        catDataDeleteLink.textContent = "X";
        
    }
    static deleteCat(el) {
        if(el.classList.contains('delete')) {
            el.parentElement.parentElement.remove();
            const catTable = document.querySelector("#cat-table");
            catTable.remove();
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
        document.querySelector("#cat-breed").value = "";
        document.querySelector("#cat-fur-color").value = "";
        document.querySelector("#cat-pet-name").value = "";
        document.querySelector("#cat-pet-owner").value = "";
        document.querySelector("#cat-owner-phone").value = "";
        document.querySelector("#cat-microchip-number").value = "";
    }
}


// Store CLass: Handle Storage
class Store {
    static getCats() {
        let cats;
        if(localStorage.getItem("cats") === null) {
            cats = [];
        } else {
            cats = JSON.parse(localStorage.getItem("cats"));
        }

        return cats;
    }

    static addCat(cat) {
        const cats = Store.getCats();
        cats.push(cat);

        localStorage.setItem("cats", JSON.stringify(cats));
    }

    static removeCat(microChip) {
        const cats = Store.getCats();

        cats.forEach((cat, index) => {
            if(cat.microChip === microChip) {
                cats.splice(index, 1);
            }
        });

        localStorage.setItem("cats", JSON.stringify(cats));
    }
}

// Event: Display Cat
document.addEventListener("DOMContentLoaded", UI.displayCats);

// Event: Add a Cat
document.querySelector("#animal-form").addEventListener("submit", (e) => {
    // Prevent actual submit
    e.preventDefault();

    // Get form values
    const animalType = document.querySelector("#animal-type").value;
    const breed = document.querySelector("#cat-breed").value;
    const furColor = document.querySelector("#cat-fur-color").value;
    const petName = document.querySelector("#cat-pet-name").value;
    const petOwner = document.querySelector("#cat-pet-owner").value;
    const ownerPhone = document.querySelector("#cat-owner-phone").value;
    const microChip = document.querySelector("#cat-microchip-number").value;

    // Validate
    if(animalType === "" || breed === "" || furColor === "" || petName === "" || petOwner === "" || ownerPhone === "" || microChip === "") {
        // UI.showAlert("Please fill in all fields", "danger");
    } else {
         // Instatiate Cat
    const cat = new Cat(animalType, breed, furColor, petName, petOwner, ownerPhone, microChip);

    // Add Cat to UI
    UI.addCatToList(cat);

    // Add Cat to store
    Store.addCat(cat);

    // Show success message
    UI.showAlert("Cat Added", "success");

    // Clear Fields
    UI.clearFields();
    }
});

// Event: Remove a Cat
document.querySelector("#delete-cat").addEventListener("click", (e) => {
    // Remove cat from UI
    UI.deleteCat(e.target);

    // Remove cat from store
    Store.removeCat(e.target.parentElement.previousElementSibling.textContent);

   UI.showAlert("Cat Removed", "success");
});

// Display Cat Fields
const sourceCat = document.querySelector("#animal-type");
const targetCat = document.querySelector("#cat-input");

const displayCatFieldsWhenSelected = (sourceCat, value, targetCat) => {
    const selectedIndex = sourceCat.selectedIndex;
    const isSelected = sourceCat[selectedIndex].value === value;
    targetCat.classList[isSelected
        ? "add"
        : "remove"
    ]("show");
};
sourceCat.addEventListener("change", (evt) =>
    displayCatFieldsWhenSelected(sourceCat, "Cat", targetCat)
);