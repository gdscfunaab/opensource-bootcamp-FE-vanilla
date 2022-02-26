async function getJobs(){
    const url = "http://remotive.io/api/remote-jobs?limit=100"
    try{
        let response = await fetch(url);
        let data = await response.json();
        return data;
    }catch(error){
        console.log(error)
    }
}
jobList = getJobs();
jobList.then((data)=>{
        data.jobs.forEach(
            (job)=>{
                const title = job.title
                const location = job.candidate_required_location
                const now = new Date();
                const pub = new Date(job.publication_date)
                const date = timeDifference(now,pub)
                const logo = job.company_logo
                const company_name = job.company_name
                createJobCard(title,location,date,logo,company_name)
            }
        )
    }
)
function createJobCard(title,location, date,logo,company_name){
    const job_container = document.querySelector(".job_con");
    let jobCard=document.createElement('div')
    jobCard.classList.add("job_child")
    jobCard.innerHTML=`
        <p class="job_title">${title}</p>
        <div class="job_details">
            <p class="job_location">${location}</p>
            <p class="job_time">${date}</p>
        </div>
        <div class="job_company">
            <img src=${logo} alt="" class="job_icon">
            <p class="job_name">${company_name}</p>
        </div>
        <a href="/login" class=""><button href="#" class="job_apply">Apply Now</button></a>`;
job_container.appendChild(jobCard);
}

// Code to get relative date from stack overflow https://stackoverflow.com/questions/6108819/javascript-timestamp-to-relative-time
function timeDifference(current, previous) {

    var msPerMinute = 60 * 1000;
    var msPerHour = msPerMinute * 60;
    var msPerDay = msPerHour * 24;
    var msPerMonth = msPerDay * 30;
    var msPerYear = msPerDay * 365;

    var elapsed = current - previous;

    if (elapsed < msPerMinute) {
        if (Math.round(elapsed/1000)>1){
            return Math.round(elapsed/1000) + ' seconds ago';
        }else{
            return Math.round(elapsed/1000) + ' second ago'
        }
    }

    else if (elapsed < msPerHour) {
        if (Math.round(elapsed/msPerMinute)>1){
            return Math.round(elapsed/msPerMinute) + ' minutes ago';
        }else{
            return Math.round(elapsed/msPerMinute) + ' minute ago'
        }   
    }

    else if (elapsed < msPerDay ) {
        if (Math.round(elapsed/msPerHour )>1){
            return Math.round(elapsed/msPerHour ) + ' hours ago';
        }else{
            return Math.round(elapsed/msPerHour ) + ' hour ago'
        } 
    }

    else if (elapsed < msPerMonth) {
        if (Math.round(elapsed/msPerDay)>1){
            return Math.round(elapsed/msPerDay) + ' days ago';
        }else{
            return Math.round(elapsed/msPerDay) + ' day ago'
        }  
    }

    else if (elapsed < msPerYear) {
        if (Math.round(elapsed/msPerMonth)>1){
            return Math.round(elapsed/msPerMonth) + ' months ago';
        }else{
            return Math.round(elapsed/msPerMonth) + ' month ago'
        }   
    }

    else {
        if (Math.round(elapsed/msPerYear)>1){
            return Math.round(elapsed/msPerYear) + ' years ago';
        }else{
            return Math.round(elapsed/msPerYear) + ' year ago'
        } 
    }
}