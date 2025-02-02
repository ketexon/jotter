import { NextResponse } from 'next/server';
import cloudinary from 'cloudinary';
import mongoose from 'mongoose';
import { FileMedia } from '../../db/models/Media';
// import { error } from 'console';

// cloudinary configuration
cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

//mongodb connection function
async function connectToDB() {
    if (mongoose.connection.readyState === 1) {
        return mongoose.connection;
    }
    await mongoose.connect(process.env.MONGODB_URI || '');
    return mongoose.connection;
}

// api route to handle file upload  
export async function POST(request: Request) {
    try{
        const formData = await request.formData();
        const file = formData.get('file') as Blob;

        if (!file) {
            return NextResponse.json({ error: 'No file provided' }, { status: 400 });
        }

        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        // upload file to cloudinary
        const uploadResult = await cloudinary.v2.uploader.upload( buffer.toString('base64'),
            { resource_type: file.type.startsWith('image/') ? 'image' : 'video' },
            (error, result) => {
                if (error) {
                    throw error;
                }
                return result;
            }
        );
    
    
    // save file data to mongodb
    const db = await connectToDB();
    const fileData = new FileMedia({
        url: uploadResult.secure_url,   
        publicId: uploadResult.public_id,
        type: uploadResult.resource_type,
        size: uploadResult.bytes,
        created_at: new Date(uploadResult.created_at),
    });

    await fileData.save();

    return NextResponse.json({ message: 'File uploaded successfully', file: fileData }, { status: 200 });
} catch (error) {
    console.log(error);
    return NextResponse.json({ error: 'File upload failed' }, { status: 500 });
}
}

export const config = {
    api: {
        bodyParser: false,
    },
};
