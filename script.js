const tierName = document.getElementById("tier-name");
const tierItem = document.getElementById("tier-item");
const tierNameSubmitBtn = document.getElementById("tier-name-submit-btn");
const imageSubmitBtn = document.getElementById("image-submit-btn");

const tierNameForm = document.getElementById("tier-name-form");
const tierImageForm = document.getElementById("image-form");

const tierListSection = document.getElementById("tier-list-section");
const nonTierListSection =  document.getElementById("non-tier-list-section");

let currentlyDraggedItemContainer;
const tierListItemContainers = document.getElementsByClassName("tier-list-item-container");
//const tierListItem = document.getElementsByClassName("tier-list-item");

//console.log(tierListItemContainers);
//console.log(tierListItem);

for(const tierListItemContainer of tierListItemContainers){
    setupTierListItemcontainerForDrag(tierListItemContainer);
}

const colorArray = ['#ff0000', '#ff4500', '#ffa500', '#ffff00'];



tierNameForm.addEventListener("submit", (event) => {
    let newTierName = tierName.value;
    event.preventDefault();

    if(newTierName === ""){
        alert("Enter a tier name...");
        return;
    }

    createTierList(newTierName);
    tierName.value = '';
})

function createTierList(newTierName){
    const newTierList = document.createElement("div");
    newTierList.classList.add("tier-list");

    const heading = document.createElement("div");
    heading.classList.add("heading");
    heading.style.backgroundColor = colorArray[Number(Math.trunc((Math.random())*4))];

    const textContainer = document.createElement("div")
    textContainer.classList.add("text-container");
    textContainer.textContent = newTierName;
    heading.appendChild(textContainer);

    const newTierListItem = document.createElement("div");
    newTierListItem.classList.add("tier-list-item")

    newTierList.appendChild(heading);
    newTierList.appendChild(newTierListItem);

    //console.log(newTierListItem);

    setUpDropZoneInTierListItem(newTierListItem);


    tierListSection.append(newTierList);

    
}





tierImageForm.addEventListener("submit", (event) => {
    event.preventDefault();
    let imageUrl = tierItem.value;

    if(imageUrl === ""){
        alert("Enter a valid url...");
        return;
    }

    createTierItem(imageUrl);
    tierItem.value = "";
})


function createTierItem(imageUrl){
    const newTierListItemContainer = document.createElement("div");
    newTierListItemContainer.classList.add("tier-list-item-container");
    newTierListItemContainer.setAttribute("draggable", "true");

    setupTierListItemcontainerForDrag(newTierListItemContainer);

    const image = document.createElement("img");
    image.src = imageUrl;

    newTierListItemContainer.appendChild(image);
    nonTierListSection.appendChild(newTierListItemContainer);

}


function setupTierListItemcontainerForDrag(newTierListItemContainer){
    newTierListItemContainer.addEventListener("dragstart", (event) => {
        //console.log("Dragging started");
        //console.log(event.target.parentNode);

        currentlyDraggedItemContainer = newTierListItemContainer;
        //console.log(currentlyDraggedItemContainer);
    })

    newTierListItemContainer.addEventListener("dblclick", (event) => {
        nonTierListSection.appendChild(event.target.parentNode);
    })
}



function setUpDropZoneInTierListItem(tierListItem){
    tierListItem.addEventListener("drop", function (event){
        event.preventDefault();
        if(this !== currentlyDraggedItemContainer){// this = event.target because here callsite is event.target which is tierItemList
            this.appendChild(currentlyDraggedItemContainer);
        }
    })

    tierListItem.addEventListener("dragover", function (event) {
        //console.log("draggging over...");
        event.preventDefault();
        //event.target.appendChild(currentDraggedItem);
    })
}
