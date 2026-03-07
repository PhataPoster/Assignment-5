let issues = [];
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

function showIssuesLength(length) {
    const issuesLength = document.getElementById("issues-length");
    issuesLength.innerText = length;

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
                class="issues-card p-4 flex flex-col gap-4 h-full bg-white rounded-md border-1 border-t-4 ${issue.status === "open" ? 'border-green-500' : 'border-purple-500'} shadow-lg">
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

