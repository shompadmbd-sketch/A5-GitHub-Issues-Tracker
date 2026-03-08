
const issuesWrapper = document.getElementById('issues-wrapper');
const spinner = document.getElementById('spinner');
const searchInput = document.getElementById('search-input');


function loadIssues(status = 'all') {
    spinner.classList.remove('hidden');
    issuesWrapper.innerHTML = '';

    fetch('https://phi-lab-server.vercel.app/api/v1/lab/issues')
        .then(res => res.json())
        .then(data => {
            let issues = data.data;

            if (status !== 'all') {
                issues = issues.filter(issue => issue.status.toLowerCase() === status.toLowerCase());
            }

            const countElement = document.getElementById('issue-count');
            if (countElement) {
                countElement.innerText = `${issues.length} Issues`;
            }

            displayIssues(issues);

           
            spinner.classList.add('hidden');
        });
};


function displayIssues(issues) {
    issuesWrapper.innerHTML = '';
    
    issues.forEach(issue => {
        const currentStatus = issue.status.toLowerCase();
        const borderColor = currentStatus === 'open' ? 'bg-[#10B981]' : 'bg-[#A855F7]';
        const statusIcon = currentStatus === 'open' ? './assets/Open-Status.png' : './assets/closed-status.png';

       
        const labelsHtml = issue.labels.map(label => {
            const isBug = label.toLowerCase() === 'bug';
            const bgColor = isBug ? 'bg-[#FECACA]' : 'bg-[#FDE68A]';
            const textColor = isBug ? 'text-[#EF4444]' : 'text-[#D97706]';
            const borderColor = isBug ? 'border-[#EF4444]' : 'border-[#D97706]';
            const icon = isBug ? './assets/Vector.png' : './assets/Vector (1).png';

            return `
                <div class="inline-flex items-center gap-1 px-2.5 py-1 ${bgColor} border ${borderColor} rounded-full">
                    <img src="${icon}" alt="${label}" class="w-3.5 h-3.5">
                    <span class="text-[11px] ${textColor} font-bold uppercase tracking-tight">${label}</span>
                </div>
            `;
        }).join('');

        const card = document.createElement('div');
        card.onclick = () => showIssueDetails(issue.id);
        card.className = "w-full bg-white shadow-md border border-gray-100 rounded-xl overflow-hidden cursor-pointer hover:shadow-lg transition-all";
        
        card.innerHTML = `
            <div class="h-1 ${borderColor}"></div>
            <div class="p-4">
                <div class="flex justify-between items-start">
                    <div class="w-8 h-8">
                        <img src="${statusIcon}" alt="${issue.status}" class="w-full h-full object-contain">
                    </div>
                    <button class="bg-[#FEF2F2] px-[20px] py-[4px] rounded-full text-[10px] text-[#EF4444] font-bold uppercase">
                        ${issue.priority}
                    </button>
                </div>
                <div class="mt-4">
                    <h3 class="text-[15px] text-[#1F2937] font-bold line-clamp-1">${issue.title}</h3>
                    <p class="text-[13px] text-[#64748B] mt-2 line-clamp-2">${issue.description}</p>
                </div>

                <div class="flex flex-wrap gap-2 mt-5">
                    ${labelsHtml} </div>

                <div class="my-4 border-t border-gray-50"></div>
                <div class="text-[12px] text-[#64748B]">
                    <p class="font-medium">#${issue.id} by ${issue.author}</p>
                    <p>${new Date(issue.createdAt).toLocaleDateString()}</p>
                </div>
            </div>
        `;
        issuesWrapper.appendChild(card);
    });
};


function switchTab(status) {
    const tabs = ['all', 'open', 'closed'];
    
    tabs.forEach(tabId => {
        const btn = document.getElementById(`tab-${tabId}`);
        if (tabId === status) {
            btn.className = "bg-[#4A00FF] py-[12px] px-[50px] text-white text-[16px] font-semibold mr-[8px] cursor-pointer rounded-[8px]";
        } else {
            btn.className = "bg-white py-[12px] px-[50px] text-[#64748bFF] text-[16px] font-semibold mr-[8px] border border-[#e4e4e7FF] cursor-pointer rounded-[8px]";
        }
    });

    loadIssues(status);
};


const searchForm = document.getElementById('search-form');

searchForm.addEventListener('submit', function(e) {
    e.preventDefault(); 
    
    const query = document.getElementById('search-input').value;

    if (query.trim() !== "") {
        spinner.classList.remove('hidden');
        issuesWrapper.innerHTML = '';

        fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${query}`)
            .then(res => res.json())
            .then(data => {
                spinner.classList.add('hidden');

                if (data.data && data.data.length > 0) {
                    displayIssues(data.data);
                } else {
                    alert("No Data Found! Please search with another keyword.");
                    loadIssues(); 
                }
            })
            .catch(err => {
                console.error("Error fetching data:", err);
                spinner.classList.add('hidden');
            });
    } else {
        loadIssues(); 
    }
});

// modal
async function showIssueDetails(id) {
    const res = await fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`);
    const data = await res.json();
    const issue = data.data;

    document.getElementById('modal-title').innerText = issue.title;
    document.getElementById('modal-description').innerText = issue.description;
    document.getElementById('modal-author-name').innerText = `Opened by ${issue.author}`;
    document.getElementById('modal-date').innerText = new Date(issue.createdAt).toLocaleDateString();
    
    // এখানে কন্ডিশন চেক করা হয়েছে: assignee থাকলে সেটা দেখাবে, না থাকলে "N/A"
    document.getElementById('modal-assignee').innerText = issue.assignee ? issue.assignee : "N/A"; 
    
    document.getElementById('modal-priority').innerText = issue.priority.toUpperCase();

    const statusEl = document.getElementById('modal-status');
    statusEl.innerText = issue.status.toUpperCase();
    
    if (issue.status.toLowerCase() === 'open') {
        statusEl.className = "bg-[#00A96E] text-white px-4 py-1 rounded-full text-[12px] font-medium";
    } else {
        statusEl.className = "bg-[#A855F7] text-white px-4 py-1 rounded-full text-[12px] font-medium";
    }

    my_modal_5.showModal();
};

function switchTab(status) {
    const tabs = ['all', 'open', 'closed'];
    
    tabs.forEach(tabId => {
        const btn = document.getElementById(`tab-${tabId}`);
        if (tabId === status) {
            btn.className = "bg-[#4A00FF] py-[12px] px-[50px] text-white text-[16px] font-semibold mr-[8px] cursor-pointer rounded-[8px]";
        } else {
            btn.className = "bg-white py-[12px] px-[50px] text-[#64748bFF] text-[16px] font-semibold mr-[8px] border border-[#e4e4e7FF] cursor-pointer rounded-[8px]";
        }
    });

    loadIssues(status);
};



function loadIssues(status = 'all') {
    spinner.classList.remove('hidden');
    issuesWrapper.innerHTML = '';

   
    fetch('https://phi-lab-server.vercel.app/api/v1/lab/issues')
        .then(res => res.json())
        .then(data => {
            let issues = data.data;
            if (status !== 'all') {
                issues = issues.filter(issue => issue.status.toLowerCase() === status.toLowerCase());
            }
            const countElement = document.getElementById('issue-count');
            if (countElement) {
                countElement.innerText = `${issues.length} Issues`;
            }

            displayIssues(issues);

           
            spinner.classList.add('hidden');
        });
}

loadIssues();