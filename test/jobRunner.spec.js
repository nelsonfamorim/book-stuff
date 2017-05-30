const chai = require('chai');
const jobRunner = require('../services/jobRunner');

const should = chai.should();

describe('jobRunner tests', ()=>{

    function jobBuilder(type,position,conf,done){
        return {
            type: type,
            run: (callback)=>{
                setTimeout(()=>{
                    should.equal(conf.runPosition++,position);
                    callback();
                    if(done)
                        done();
                },100);
            }
        }
    }

    it('check if follows basic order', (done)=>{
        var conf = {runPosition: 1};
        jobRunner.queueJob(jobBuilder('HTML',1,conf));
        jobRunner.queueJob(jobBuilder('HTML',2,conf));
        jobRunner.queueJob(jobBuilder('HTML',3,conf,done));
    });

    it('prioritize max html files', (done)=>{
        var conf = {runPosition: 1};
        jobRunner.queueJob(jobBuilder('HTML',1,conf));
        jobRunner.queueJob(jobBuilder('PDF',7,conf, done));
        jobRunner.queueJob(jobBuilder('HTML',2,conf));
        jobRunner.queueJob(jobBuilder('HTML',3,conf));
        jobRunner.queueJob(jobBuilder('HTML',4,conf));
        jobRunner.queueJob(jobBuilder('HTML',5,conf));
        jobRunner.queueJob(jobBuilder('HTML',6,conf));
    });

    

    it('prioritize until next PDF', (done)=>{
        var conf = {runPosition: 1};
        jobRunner.queueJob(jobBuilder('HTML',1,conf));
        jobRunner.queueJob(jobBuilder('PDF',5,conf));
        jobRunner.queueJob(jobBuilder('HTML',2,conf));
        jobRunner.queueJob(jobBuilder('HTML',3,conf));
        jobRunner.queueJob(jobBuilder('HTML',4,conf));
        jobRunner.queueJob(jobBuilder('PDF',7,conf,done));
        jobRunner.queueJob(jobBuilder('HTML',6,conf));
    });
});

