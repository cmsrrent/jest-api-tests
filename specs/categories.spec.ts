import config from '../config/base.config';
import controller from '../controller/categories.controller';
import { login } from '../utils/helper';

describe('Categories Tests', () => {

    it('GET /categories', async () => {
        const res = await controller.getCategories();
        expect(res.statusCode).toBe(200);
        expect(res.body.length).toBeGreaterThan(1);
        expect(Object.keys(res.body[0])).toEqual(['_id', 'name']);
    })

    describe('Categories CRUD', () => {

        let token, id;

        beforeAll(async () => {
            token = await login(config.email, config.password);
        })

        it('POST /categories', async () => {
            const data = {
                name: 'Test Category ' + Math.floor(Math.random() * 1000)
            };

            const res = await controller
                .postCategories(data)
                .set('Authorization', 'Bearer ' + token);

            expect(res.statusCode).toBe(200);
            expect(res.body.name).toBe(data.name);
            id = res.body._id;
        })

        it('PUT /categories', async () => {
            const data = {
                name: 'Test Category ' + Math.floor(Math.random() * 1000)
            };

            const res = await controller
                .putCategories(id, data)
                .set('Authorization', 'Bearer ' + token);

            expect(res.statusCode).toBe(200);
            expect(res.body.name).toBe(data.name);
        })

        it('DELETE /categories', async () => {

            const res = await controller
                .deleteCategories(id)
                .set('Authorization', 'Bearer ' + token);

            expect(res.statusCode).toBe(200);
        })

    })
})