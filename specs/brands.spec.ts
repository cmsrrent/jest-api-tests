import controller from '../controller/brands.controller';

// Function to generate a unique name with random characters
function generateUniqueName(baseName: string): string {
    const randomString = Math.random().toString(36).substring(2, 15);
    return `${baseName}_${randomString}`;
}

describe('Brands Tests', () => {
   
    let id;

    describe('GET brands', () => {
        
        it( 'GET /brands', async () => {
            const res = await controller.getBrands();
            expect(res.statusCode).toBe(200);    
            expect(res.body.length).toBeGreaterThan(100);
            res.body.forEach((item: any) => {
                expect(item).toHaveProperty('_id');
                expect(item).toHaveProperty('name');
            });
        });

    })
    
    describe('POST brands', () => {
        
        it( 'POST /brands', async () => {
            const uniqueName = generateUniqueName('Test Brand');
            const data = {
                name: uniqueName,
                description: 'Running down the wing'
            };
            
            const res = await controller.postBrands(data);

            expect(res.statusCode).toBe(200);
            expect(res.body.name).toBe(data.name);
            expect(res.body).toHaveProperty('createdAt');
            id = res.body;
        });

        it( 'GET /brands/:id', async () => {
            const res = await controller.getBrandById(id._id);
            expect(res.statusCode).toBe(200);
            expect(res.body.name).toBe(id.name);

        });

    })

    describe('POST PUT DELETE brands', () => {
        it('POST /brands', async () => {
            const uniqueName = generateUniqueName('Test Brand');
            const data = {
                name: uniqueName,
                description: 'Running down the wing'
        };
            
            const res = await controller.postBrands(data);

            expect(res.statusCode).toBe(200);
            expect(res.body.name).toBe(data.name);
            expect(res.body).toHaveProperty('createdAt');
            expect(res.body).toHaveProperty('_id');
            id = res.body._id;
        });


        it( 'PUT /brands/{id}', async () => {
            const uniqueName = generateUniqueName('Test Brand');
            const data = {
                name: uniqueName + ' updated',
                description: 'Running down the wing'
            };
            
            const res = await controller.putBrands(id, data);

            expect(res.statusCode).toBe(200);
            expect(res.body.name).toBe(data.name);
            expect(res.body).toHaveProperty('createdAt');
            expect(res.body).toHaveProperty('_id');
        });

        it( 'DELETE /brands/{id}', async () => {
            const res = await controller.deleteBrand(id);
            expect(res.statusCode).toBe(200);
            expect(res.body).toEqual(null);
        })

    describe('Schema Validation brands', () => {
       
        let postBrand;

        beforeAll(async () => {
            const uniqueName = generateUniqueName('Test Brand');
            const data = {
                name: uniqueName,
                description: 'Running down the wing'
            };
                
            postBrand = await controller.postBrands(data);
        })


        it( 'PUT /brands brand name longer than 30 chars', async () => {
            const data = {
                name: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
                description: 'Running down the wing'
            };
                
            const res = await controller.putBrands(postBrand._id, data);
           
            expect(res.statusCode).toBe(422);
            expect(res.body.error).toContain('Brand name is too long');

        });
    
        it( 'PUT /brands description must be a string', async () => {
            const uniqueName = generateUniqueName('Test Brand');
            const data = {
                name: uniqueName,
                description: 12345
            };
                
            const expectMessage = 'Brand description must be a string';

            const res = await controller.putBrands(postBrand._id, data);
           
            expect(res.statusCode).toBe(422);
            expect(res.body.error).toContain(expectMessage);

        });

    })

    })

    describe('Business Logic brands', () => {
        
        it( 'PUT /brands invalid brand', async () => {
            const uniqueName = generateUniqueName('Test Brand');
            const data = {
                name: uniqueName,
                description: 'valid desc'
            };
                
            const expectMessage = 'Unable to update brands';

            const res = await controller.putBrands('invalid_id', data);
           
            expect(res.statusCode).toBe(422);
            expect(res.body.error).toContain(expectMessage);
        });

    })

})