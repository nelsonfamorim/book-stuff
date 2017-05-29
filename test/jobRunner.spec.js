const chai = require('chai');
const jobRunner = require('../services/jobRunner');

const should = chai.should();

describe('jobRunner tests', ()=>{
    it('check if follows basic order', (done)=>{
        var runPosition = 1;
        jobRunner.queueJob({
            type: 'HTML',
            run: (callback)=>{
                setTimeout(()=>{
                    should.equal(runPosition++,1);
                    callback();
                },100);
            }
        });
        jobRunner.queueJob({
            type: 'HTML',
            run: (callback)=>{
                setTimeout(()=>{
                    should.equal(runPosition++,2);
                    callback();
                },100);
            }
        });
        jobRunner.queueJob({
            type: 'HTML',
            run: (callback)=>{
                setTimeout(()=>{
                    should.equal(runPosition++,3);
                    callback();
                    done();
                },100);
            }
        });
    });

    it('prioritize max html files', (done)=>{
        var runPosition = 1;
        jobRunner.queueJob({
            type: 'HTML',
            run: (callback)=>{
                setTimeout(()=>{
                    should.equal(runPosition++,1);
                    callback();
                },100);
            }
        });
        jobRunner.queueJob({
            type: 'PDF',
            run: (callback)=>{
                setTimeout(()=>{
                    should.equal(runPosition++,7);
                    callback();
                },100);
            }
        });
        jobRunner.queueJob({
            type: 'HTML',
            run: (callback)=>{
                setTimeout(()=>{
                    should.equal(runPosition++,2);
                    callback();
                },100);
            }
        });jobRunner.queueJob({
            type: 'HTML',
            run: (callback)=>{
                setTimeout(()=>{
                    should.equal(runPosition++,3);
                    callback();
                },100);
            }
        });
        jobRunner.queueJob({
            type: 'HTML',
            run: (callback)=>{
                setTimeout(()=>{
                    should.equal(runPosition++,4);
                    callback();
                },100);
            }
        });
        jobRunner.queueJob({
            type: 'HTML',
            run: (callback)=>{
                setTimeout(()=>{
                    should.equal(runPosition++,5);
                    callback();
                },100);
            }
        });
        jobRunner.queueJob({
            type: 'HTML',
            run: (callback)=>{
                setTimeout(()=>{
                    should.equal(runPosition++,6);
                    callback();
                    done();
                },100);
            }
        });
    });

    

    it('prioritize until next PDF', (done)=>{
        var runPosition = 1;
        jobRunner.queueJob({
            type: 'HTML',
            run: (callback)=>{
                setTimeout(()=>{
                    should.equal(runPosition++,1);
                    callback();
                },100);
            }
        });
        jobRunner.queueJob({
            type: 'PDF',
            run: (callback)=>{
                setTimeout(()=>{
                    should.equal(runPosition++,5);
                    callback();
                },100);
            }
        });
        jobRunner.queueJob({
            type: 'HTML',
            run: (callback)=>{
                setTimeout(()=>{
                    should.equal(runPosition++,2);
                    callback();
                },100);
            }
        });jobRunner.queueJob({
            type: 'HTML',
            run: (callback)=>{
                setTimeout(()=>{
                    should.equal(runPosition++,3);
                    callback();
                },100);
            }
        });
        jobRunner.queueJob({
            type: 'HTML',
            run: (callback)=>{
                setTimeout(()=>{
                    should.equal(runPosition++,4);
                    callback();
                },100);
            }
        });
        jobRunner.queueJob({
            type: 'PDF',
            run: (callback)=>{
                setTimeout(()=>{
                    should.equal(runPosition++,7);
                    callback();
                },100);
            }
        });
        jobRunner.queueJob({
            type: 'HTML',
            run: (callback)=>{
                setTimeout(()=>{
                    should.equal(runPosition++,6);
                    callback();
                    done();
                },100);
            }
        });
    });
});

