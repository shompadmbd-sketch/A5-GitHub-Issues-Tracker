const issuesWrapper = document.getElementById('issues-wrapper');
const spinner = document.getElementById('spinner');


let currentFilter = 'all'; 


function loadIssues(status = 'all') {
    currentFilter = status; 
    spinner.classList.remove('hidden');
    issuesWrapper.innerHTML = '';

    fetch('https://phi-lab-server.vercel.app/api/v1/lab/issues')
        .then(res => res.json())
        .then(data => {
            let issues = data.data;

           
            if (currentFilter !== 'all') {
                issues = issues.filter(issue => issue.status.toLowerCase() === currentFilter.toLowerCase());
            }

            const countElement = document.getElementById('issue-count');
            if (countElement) {
                countElement.innerText = `${issues.length} Issues`;
            }

            displayIssues(issues); 
            spinner.classList.add('hidden');
        })
        .catch(err => {
            console.error("Fetch Error:", err);
            spinner.classList.add('hidden');
        });
}


function displayIssues(issues) {
    issuesWrapper.innerHTML = '';
    
    issues.forEach(issue => {
        const currentStatus = issue.status.toLowerCase();
        const borderColor = currentStatus === 'open' ? 'bg-[#10B981]' : 'bg-[#A855F7]';
        const statusIcon = currentStatus === 'open' ? './assets/Open-Status.png' : './assets/closed-status.png';

        let priorityBg, priorityText;
        const priority = issue.priority.toLowerCase();

        if (priority === 'high') {
            priorityBg = 'bg-[#FEF2F2]'; priorityText = 'text-[#EF4444]';
        } else if (priority === 'medium') {
            priorityBg = 'bg-[#FFF6D1]'; priorityText = 'text-[#F59E0B]';
        } else {
            priorityBg = 'bg-[#E5E7EB]'; priorityText = 'text-[#6B7280]';
        }

        const labelsHtml = issue.labels.map(label => {
            const labelLower = label.toLowerCase().trim();
            let bgColor, textColor, borderCol, icon, iconColor;

            if (labelLower === 'bug') {
                bgColor = 'bg-[#FECACA]'; textColor = 'text-[#EF4444]'; borderCol = 'border-[#EF4444]';
                icon = 'fa-bug'; iconColor = '#EF4444';
            } else if (labelLower === 'enhancement') {
                bgColor = 'bg-[#BBF7D0]'; textColor = 'text-[#00A96E]'; borderCol = 'border-[#00A96E]';
                icon = 'fa-wand-magic-sparkles'; iconColor = '#00A96E';
            } else if (labelLower === 'documentation') {
                bgColor = 'bg-[#EEEFF2]'; textColor = 'text-[#9CA3AF]'; borderCol = 'border-[#9CA3AF]';
                icon = 'fa-file-lines'; iconColor = '#9CA3AF';
            } else if (labelLower === 'good first issue') {
                bgColor = 'bg-[#F0E2FF]'; textColor = 'text-[#A855F7]'; borderCol = 'border-[#A855F7]';
                icon = 'fa-seedling'; iconColor = '#A855F7';
            } else {
                bgColor = 'bg-[#FDE68A]'; textColor = 'text-[#D97706]'; borderCol = 'border-[#D97706]';
                icon = 'fa-regular fa-life-ring'; iconColor = '#D97706';
            }

            const iconPrefix = icon.includes('fa-regular') ? 'fa-regular' : 'fa-solid';

            return `
                <div class="inline-flex items-center gap-1 px-2.5 py-1 ${bgColor} border ${borderCol} rounded-full">
                    <i class="${iconPrefix} ${icon} text-[12px]" style="color: ${iconColor}"></i>
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
                    <button class="${priorityBg} ${priorityText} px-[20px] py-[4px] rounded-full text-[10px] font-bold uppercase">
                        ${issue.priority}
                    </button>
                </div>
                <div class="mt-4">
                    <h3 class="text-[15px] text-[#1F2937] font-bold ">${issue.title}</h3>
                    <p class="text-[13px] text-[#64748B] mt-2 line-clamp-2">${issue.description}</p>
                </div>
                <div class="flex flex-wrap gap-2 mt-5">${labelsHtml}</div>
                <div class="my-4 border-t border-[#E4E4E7] pt-[16px] mt-[16px]">
                    <div class="text-[12px] text-[#64748B]">
                        <p class="font-medium">#${issue.id} by ${issue.author}</p>
                        <p>${new Date(issue.createdAt).toLocaleDateString()}</p>
                    </div>
                </div>
            </div>
        `;
        issuesWrapper.appendChild(card);
    });
}


function switchTab(status) {
    if (window.event) window.event.preventDefault(); 
    currentFilter = status;

    const tabs = ['all', 'open', 'closed'];
    tabs.forEach(tabId => {
        const btn = document.getElementById(`tab-${tabId}`);
        if (btn) {
            if (tabId === status) {
                btn.className = "bg-[#4A00FF] py-[12px] px-[50px] text-white text-[16px] font-semibold mr-[8px] cursor-pointer rounded-[8px]";
            } else {
                btn.className = "bg-white py-[12px] px-[50px] text-[#64748bFF] text-[16px] font-semibold mr-[8px] border border-[#e4e4e7FF] cursor-pointer rounded-[8px]";
            }
        }
    });
    loadIssues(status);
}


async function showIssueDetails(id) {
    try {
        const res = await fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`);
        const data = await res.json();
        const issue = data.data;

        document.getElementById('modal-title').innerText = issue.title;
        document.getElementById('modal-description').innerText = issue.description;
        document.getElementById('modal-author-name').innerText = `Opened by ${issue.author}`;
        document.getElementById('modal-date').innerText = new Date(issue.createdAt).toLocaleDateString();
        document.getElementById('modal-assignee').innerText = issue.assignee || "N/A";

        const statusEl = document.getElementById('modal-status');
        statusEl.innerText = issue.status.toUpperCase();
        statusEl.className = issue.status.toLowerCase() === 'open' 
            ? "bg-[#00A96E] text-white px-4 py-1 rounded-full text-[12px] font-medium" 
            : "bg-[#A855F7] text-white px-4 py-1 rounded-full text-[12px] font-medium";

        const modalLabels = document.getElementById('modal-labels');
        modalLabels.innerHTML = ''; 

        issue.labels.forEach(label => {
            const labelLower = label.toLowerCase().trim();
            let bgColor, textColor, borderCol, icon, iconColor;

            if (labelLower === 'bug') {
                bgColor = 'bg-[#FECACA]'; textColor = 'text-[#EF4444]'; borderCol = 'border-[#EF4444]';
                icon = 'fa-bug'; iconColor = '#EF4444';
            } else if (labelLower === 'enhancement') {
                bgColor = 'bg-[#BBF7D0]'; textColor = 'text-[#00A96E]'; borderCol = 'border-[#00A96E]';
                icon = 'fa-wand-magic-sparkles'; iconColor = '#00A96E';
            }else if (labelLower === 'documentation') {
                bgColor = 'bg-[#EEEFF2]'; textColor = 'text-[#9CA3AF]'; borderCol = 'border-[#9CA3AF]';
                icon = 'fa-file-lines'; iconColor = '#9CA3AF';
            }else if (labelLower === 'good first issue') {
                bgColor = 'bg-[#F0E2FF]'; textColor = 'text-[#A855F7]'; borderCol = 'border-[#A855F7]';
                icon = 'fa-seedling'; iconColor = '#A855F7';
            }  else {
                bgColor = 'bg-[#FDE68A]'; textColor = 'text-[#D97706]'; borderCol = 'border-[#D97706]';
                icon = 'fa-regular fa-life-ring'; iconColor = '#D97706';
            }

            const labelDiv = document.createElement('div');
            labelDiv.className = `inline-flex items-center gap-1.5 px-3 py-1 ${bgColor} border ${borderCol} rounded-full`;
            const finalIconClass = icon.includes('fa-regular') ? icon : `fa-solid ${icon}`;
            
            labelDiv.innerHTML = `
                <i class="${finalIconClass} text-[12px]" style="color: ${iconColor}"></i>
                <span class="text-[12px] ${textColor} font-medium uppercase tracking-tight">${label}</span>
            `;
            modalLabels.appendChild(labelDiv);
        });

        const modal = document.getElementById('my_modal_5');
        if (modal) modal.showModal();
    } catch (error) {
        console.error(error);
    }
}


document.addEventListener('click', (e) => {
    if (e.target.closest('.modal-action button')) {
        const modal = document.getElementById('my_modal_5');
        if (modal) {
            modal.close();
            
            loadIssues(currentFilter); 
        }
    }
});


const searchForm = document.getElementById('search-form');

if (searchForm) {
    searchForm.addEventListener('submit', function(e) {
        e.preventDefault(); 
        
        const query = document.getElementById('search-input').value.trim().toLowerCase();

       
        if (!query) {
            loadIssues(currentFilter);
            return;
        }

        spinner.classList.remove('hidden');
        issuesWrapper.innerHTML = '';

        fetch('https://phi-lab-server.vercel.app/api/v1/lab/issues')
            .then(res => res.json())
            .then(data => {
                let issues = data.data;

                
                if (currentFilter !== 'all') {
                    issues = issues.filter(issue => issue.status.toLowerCase() === currentFilter.toLowerCase());
                }

                
                const filterIssues = issues.filter(issue => 
                    issue.title.toLowerCase().includes(query) || 
                    issue.description.toLowerCase().includes(query)
                );

                spinner.classList.add('hidden');

                if (filterIssues.length > 0) {
                    displayIssues(filterIssues);
                    
                    
                    const countElement = document.getElementById('issue-count');
                    if (countElement) {
                        countElement.innerText = `${filterIssues.length} Results Found`;
                    }
                } else {
                    alert("No Data Found in this category!");
                    loadIssues(currentFilter); 
                }
            })
            .catch(err => {
                console.error("Search Error:", err);
                spinner.classList.add('hidden');
            });
    });
}

loadIssues();