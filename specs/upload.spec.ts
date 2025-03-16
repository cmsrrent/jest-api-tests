import controller from '../controller/upload.controller';



describe('Upload File', () => {
   
    it('POST /upload/single', async () => {
        const res = await controller.postUploadSingle('data/side-eye-suspicious.gif');
        expect(res.statusCode).toBe(200);
        expect(res.body.filename).toEqual('side-eye-suspicious.gif');
    });
    
    it('POST /upload/multiple', async () => {
        const files = [
            'data/side-eye-suspicious.gif',
            'data/cheese.jpeg'
        ]
        
        const res = await controller.postUploadMultiple(files);
        expect(res.statusCode).toBe(200);
        expect(res.body[0].filename).toEqual(files[0].split('/').pop());
        expect(res.body[1].filename).toEqual(files[1].split('/').pop());

    });

})