const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../index');

const should = chai.should();
chai.use(chaiHttp);

describe('server tests', function(){
    this.timeout(1000);

    after(function() {
        server.close();
    });

    it('/GET app root html', (done)=>{
        chai.request(server)
            .get('/')
            .end((err, res)=>{
                res.should.have.status(200);
                done();
            });
    });

    it('/GET css assets', (done)=>{
        chai.request(server)
            .get('/assets/css/style.css')
            .end((err, res)=>{
                res.should.have.status(200);
                done();
            });
    });

    it('/GET app libs', (done)=>{
        chai.request(server)
            .get('/assets/lib/bundle.js')
            .end((err, res)=>{
                res.should.have.status(200);
                done();
            });
    });

    it('/GET app libs', (done)=>{
        chai.request(server)
            .get('/assets/js/core.js')
            .end((err, res)=>{
                res.should.have.status(200);
                done();
            });
    });

    it('/GET component', (done)=>{
        chai.request(server)
            .get('/components/root/rootController.js')
            .end((err, res)=>{
                res.should.have.status(200);
                chai.request(server)
                .get('/components/root/rootView.html')
                .end((err, res)=>{
                    res.should.have.status(200);
                    done();
                });
            });
    });
});