
const htmlQueue = [];
const pdfQueue = [];
//the number of times a given pdf document can be deprioritized of a html one
const basePriorityTolerance = 3;
var priorityTolerance = basePriorityTolerance;
var jobRunning = false;

var executeJob = () =>{
    //nothing to run case
    if(htmlQueue.length == 0 && pdfQueue.length == 0){
        jobRunning = false;
        return;
    }

    //signal as running
    jobRunning = true;
    var job;

    //if there are pdf documents run them if:
    //there are no html documents to process
    //the pdf document has no more tolerance to be skipped
    if(pdfQueue.length > 0 && (htmlQueue.length == 0 || priorityTolerance == 0)){
        //pdf document is being processed, restore tolerance
        priorityTolerance = basePriorityTolerance;
        job = pdfQueue.shift();
    } else {
        //if there is a pdf document waiting, reduce tolerance
        if(pdfQueue.length != 0)
            priorityTolerance--;
        job = htmlQueue.shift();
    }
    //run the job and add this function as a callback to be called when the job is over
    job(executeJob);
}

var queuePDF = function(job){
    pdfQueue.push(job);
    if(!jobRunning)
        executeJob();
}

var queueHTML = function(job){
    htmlQueue.push(job);
    if(!jobRunning)
        executeJob();
}

module.exports = {
    queuePDF: queuePDF,
    queueHTML: queueHTML
}

