const request = require("supertest");
const app = require('./app'); 

//Test for empty body

describe("Click-Screenshot API Testing",()=>{

    it('GET /ping', ()=>{
        return request(app)
        .get("/ping")
        .expect(200)
    })

})
