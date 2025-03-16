import * as supertest from 'supertest';
const request = supertest('http://jsonplaceholder.typicode.com');

describe('POC Tests', () => {
    
    describe('GET requests', () => {
        it( 'GET /posts', async () => {
            const res = await request.get('/posts');
            expect(res.statusCode).toBe(200);
            expect(res.body[0].id).toBe(1);
        })
    
        it( 'GET /comments with query param', async () => {
            const res = await request
                .get('/comments')
                .query({postId: 1, limit: 10});
            expect(res.statusCode).toBe(200);
            expect(res.body[0].postId).toBe(1);
        })
    })
    
    describe('POST requests', () => {
    
        it( 'POST /posts', async () => {
            const data = {
                title: 'rr test title',
                body: 'rr test body',
                userId: 1,
            };
            
            const res = await request
                .post('/posts')
                .send(data);
            expect(res.body.title).toBe(data.title);
            expect(res.body).toHaveProperty('id');
        })
    })


    describe('PUT requests', () => {
    
        it( 'PUT /posts/{id}', async () => {
            const data = {
                title: 'rr updated title',
                body: 'rr test updated body',
                userId: 5,
            };
            
            const resBefore = await request.get('/posts/1');
            const beforeTitle = resBefore.body.title;

            const res = await request
                .put('/posts/1')
                .send(data);
            expect(res.body.title).toBe(data.title);
            expect(res.body).toHaveProperty('id');
            expect(res.body.title).not.toBe(beforeTitle);
        })
    })


    describe('PATCH requests', () => {
    
        it( 'PATCH /posts/{id}', async () => {
            const data = {
                body: 'updated body only',
            };
            
            const resBefore = await request.get('/posts/1');
            const beforeTitle = resBefore.body.title;

            const res = await request
                .patch('/posts/1')
                .send(data);
            expect(res.body.title).toBe(beforeTitle);
            expect(res.body.body).toBe(data.body);
        })
    })

    describe('DELETE requests', () => {
    
        it( 'DELETE /posts/{id}', async () => {
           
            const res = await request
                .delete('/posts/1');
            expect(res.statusCode).toBe(200);
            expect(res.body).toEqual({});
        })
    })

})