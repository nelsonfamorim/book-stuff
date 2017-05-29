var queue = [];
const lookahead = 5;
var enablePrioritization = true;
var jobRunning = false;

function pickJob(){
    //if no jobs, reset prioritization and return null
    if(queue.length == 0){
        enablePrioritization = true;
        return;
    }

    if(enablePrioritization && queue[0].type == 'PDF'){
        //each PDF can only lose its priority once
        enablePrioritization = false;

        var i=0;
        //alow the next sequence of html documents to be prioritized
        //max number of document is 'lookahead' value
        while(i<lookahead){
            if(!queue[i+1] ||queue[i+1].type=='PDF')
                break;
            i++;
        }

        //swap the html documents to the head of the queue
        if(i>0){
            var htmlJobs = queue.splice(1,i);
            queue = htmlJobs.concat(queue);
        }

    }

    var job = queue.shift();
    if(job.type == 'PDF')
        enablePrioritization = true;
    
    return job;
}

function executeJob(){

    var job = pickJob();


    //nothing to run case
    if(!job){
        jobRunning = false;
        return;
    }

    //signal as running
    jobRunning = true;
    //run the job and add this function as a callback to be called when the job is over
    job.run(executeJob);
}

function queueJob(job){
    queue.push(job);
    if(!jobRunning)
        executeJob();
}

module.exports = {
    queueJob: queueJob
}

