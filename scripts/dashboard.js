let issues = [];

if(!localStorage.getItem("user")){
  window.location.href = "index.html";
}

const url = "https://phi-lab-server.vercel.app/api/v1/lab/issues";

let allIssuesBtn = document.getElementById("all-issues-btn");
let openIssuesBtn = document.getElementById("open-issues-btn");
let closedIssuesBtn = document.getElementById("closed-issues-btn");
toggleActiveButton("all-issues-btn");

async function toggleActiveButton(id) {
    allIssuesBtn.classList.remove("bg-blue-700", "text-white");
    openIssuesBtn.classList.remove("bg-blue-700", "text-white");
    closedIssuesBtn.classList.remove("bg-blue-700", "text-white");

    const button = document.getElementById(id);
    button.classList.add("bg-blue-700", "text-white");


    const res = await fetch(url);
    const data = await res.json();
    // console.log(data.data);
    const issues = data.data;

    
        if(id === "open-issues-btn") {
            const openIssues = issues.filter(issue => issue.status === "open");
            let issuesLength = openIssues.length;
            showIssuesLength(issuesLength);
            console.log(openIssues);
            showAllIssues(openIssues);
        }
        else if(id === "closed-issues-btn") {
            const closedIssues = issues.filter(issue => issue.status === "closed");
            let issuesLength = closedIssues.length;
            showIssuesLength(issuesLength);
            console.log(closedIssues);
            showAllIssues(closedIssues);
        }
        else{
            let issuesLength = issues.length;
            showIssuesLength(issuesLength);
            showAllIssues(issues);
        }



}

const searchInput = document.getElementById("search-input");
searchInput.addEventListener("input",async ()=>{
    const searchText = searchInput.value.trim().toLowerCase();
    // console.log(searchText);
    const url = `https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${searchText}`;
    const res = await fetch(url);
    const data = await res.json();
    const searchedIssues = data.data;
    if(searchedIssues.length > 0) {
        showAllIssues(searchedIssues);
        showIssuesLength(searchedIssues.length);
    }
    else{
        toggleActiveButton("all-issues-btn");
    }
})



function showIssuesLength(length) {
    const issuesLength = document.getElementById("issues-length");
    issuesLength.innerText = length;

}

const loadIssueDetails = async (id) => {
    const url = `https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`;

    const res = await fetch(url);
    const data = await res.json();
    // console.log(data.data);

    displayIssueDetails(data.data);



}

const displayIssueDetails = (issue) => {
    const modalDetailsContainer = document.getElementById("modal-details-container");
    modalDetailsContainer.innerHTML = "";
    const div = document.createElement("div");
    div.innerHTML = `<div class="flex flex-col gap-4 ">
            <h1 class="font-bold text-xl">
                    ${issue.title}
            </h1>
            <div class="text-sm font-semibold flex items-center gap-2 text-gray-500">
                <p class="px-2 py-1 rounded-full text-xs ${issue.status === "open" ? 'bg-green-100 text-green-700 border border-green-500' : 'bg-purple-100 text-purple-700 border border-purple-500'}">${issue.status === "open" ? 'Open' : 'Closed'}</p>
                <span class="w-1 h-1 bg-gray-500 rounded-full"></span>

                <p>Opened by ${issue.author}</p>
                <span class="w-1 h-1 bg-gray-500 rounded-full"></span>
                <p>${issue.createdAt}</p>
            </div>

            <div class="flex gap-2">
                 ${issue.labels.includes("bug") ? `
                <div class="p-2 rounded-full  bg-red-200 text-red-500 text-sm flex items-center">
                        <i class="fa-solid fa-bug"></i>
                        <p class="ml-1">bug</p>
                    </div>`: ""}

                ${issue.labels.includes("help wanted") ? `
                <div class="p-2 rounded-full bg-yellow-200 text-yellow-600 text-sm flex items-center">
                        <i class="fa-solid fa-hand-holding-medical"></i>
                        <p class="ml-1">help wanted</p>
                    </div>`: ""}

                ${issue.labels.includes("documentation") ? `
                <div class="p-2 rounded-full bg-gray-200 text-gray-600 text-sm flex items-center">
                        <i class="fa-solid fa-book"></i>
                        <p class="ml-1">documentation</p>
                    </div>`: ""}
                
                ${issue.labels.includes("enhancement") ? `
                <div class="p-2 rounded-full bg-green-200 text-green-600 text-sm flex items-center">
                        <i class="fa-solid fa-wand-magic-sparkles"></i>
                        <p class="ml-1">enhancement</p>
                    </div>`: ""}
                    
                </div>

                <p class="text-gray-400 text-sm">${issue.description}</p>
                <div class="grid grid-cols-2 bg-gray-100 rounded-lg p-2">
                    <div>
                        <p class="text-gray-500">Assigned:</p>
                        <p class="font-bold">${issue.assignee || "Unassigned"}</p>
                    </div>
                    <div>
                        <p class="text-gray-500">Priority:</p>
                        <h2 class="w-20 py-1 rounded-full text-red-600 bg-red-200 text-center text-sm">${issue.priority?.toUpperCase() || "LOW"}</h2>
                    </div>
                </div>
        </div>`
        modalDetailsContainer.appendChild(div);
    document.getElementById("my_modal_5").showModal();
}


function showAllIssues(issues) {
    console.log(issues);
    const issuesContainer = document.getElementById("issues-container");
    issuesContainer.innerHTML = "";
    issues.forEach((issue) => {
        // console.log(issue);
        
        const div = document.createElement("div");
        div.innerHTML = `
            <div
                onclick="loadIssueDetails(${issue.id})" class="issues-card p-4 flex flex-col gap-4 h-full bg-white rounded-md border-1 border-t-4 ${issue.status === "open" ? 'border-green-500' : 'border-purple-500'} shadow-lg">
                <div class="flex justify-between">
                    <div>
                    ${issue.status === "open" ? '<img src="./B13-A5-Github-Issue-Tracker-main/B13-A5-Github-Issue-Tracker-main/assets/Open-Status.png" alt="Open">' : '<img src="./B13-A5-Github-Issue-Tracker-main/B13-A5-Github-Issue-Tracker-main/assets/Closed-Status .png" alt="Closed">'}
                    </div>
                    <div>
                        ${issue.priority === "high" ? '<h2 class="w-20 py-1 rounded-full text-red-600 bg-red-200 text-center text-sm">HIGH</h2>' : issue.priority === "medium" ? '<h2 class="w-20 py-1 rounded-full  text-yellow-600 bg-yellow-200 text-center text-sm">MEDIUM</h2>' : '<h3 class="w-20 py-1 rounded-full text-gray-600 bg-gray-200 text-center text-sm">LOW</h3>'}
                    </div>
                </div>
                <h1 class="font-bold">
                    ${issue.title}
                </h1>
                <p class="font-semibold text-sm text-gray-500">
                    ${issue.description}
                </p>
                <div class="flex gap-2">
                 ${issue.labels.includes("bug") ? `
                <div class="p-2 rounded-full  bg-red-200 text-red-500 text-sm flex items-center">
                        <i class="fa-solid fa-bug"></i>
                        <p class="ml-1">bug</p>
                    </div>`: ""}

                ${issue.labels.includes("help wanted") ? `
                <div class="p-2 rounded-full bg-yellow-200 text-yellow-600 text-sm flex items-center">
                        <i class="fa-solid fa-hand-holding-medical"></i>
                        <p class="ml-1">help wanted</p>
                    </div>`: ""}

                ${issue.labels.includes("documentation") ? `
                <div class="p-2 rounded-full bg-gray-200 text-gray-600 text-sm flex items-center">
                        <i class="fa-solid fa-book"></i>
                        <p class="ml-1">documentation</p>
                    </div>`: ""}
                
                ${issue.labels.includes("enhancement") ? `
                <div class="p-2 rounded-full bg-green-200 text-green-600 text-sm flex items-center">
                        <i class="fa-solid fa-wand-magic-sparkles"></i>
                        <p class="ml-1">enhancement</p>
                    </div>`: ""}
                    
                </div>
                <hr>
                <div class="text-gray-500 text-sm">
                    <p>#${issue.id} by <span>${issue.author}</span></p>
                    <p>${issue.createdAt}</p>
                </div>
            </div>
        
        
        `
        issuesContainer.appendChild(div);
    });
}

