import request  from 'supertest';
import { TestHelper } from './testHelper';
jest.useFakeTimers()

beforeAll(async() =>{
    await TestHelper.instance.setupDB()
})




describe('register', ()=>{
    it('returns status bad request if data invalid is', async() =>{
        const res = await request(TestHelper.instance.app).post('/auth/register').send(
            {
                lastname:"didus",
                firstname: "Bob",
                email:"bob@example",
                birthdate:"2024-08-02",
                password:"1234567890"
            }
        );
        expect(res.statusCode).toEqual(500)
    } )
})