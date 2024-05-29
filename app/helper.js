import {headers} from "next/headers";
import jwt from "jsonwebtoken";
import {NextResponse} from "next/server";
import {v4 as uuidv4} from "uuid";
import path from "path";
import fs from "fs";

export async function AuthUser(){
    const headerdata=headers();
    const bearerToken = headerdata.get("authorization");
    const token = bearerToken.split(' ')[1];
    let info=await jwt.decode(token);

    return info;

}

export async function uploadBase64Img(image) {
    try {

        // Convert base64 to buffer
         const imageBuffer = await Buffer.from(image.split('base64,')[1], 'base64');
        // image name
        var filename = await `${uuidv4()}.jpg`; // Use the correct extension
        // Define the absolute path to save the image
        const pathext = 'public/uploads'
        const imagePath = await path.resolve(pathext, filename);
        await fs.writeFileSync(imagePath, imageBuffer);

    } catch (e) {
        return NextResponse.json({e, success: 'img upload error found'});
    }

    return 'uploads/' + filename;

}

export default async function sendNotification(title, body, tokenList) {
    try {
      const url = 'https://fcm.googleapis.com/fcm/send';
      const FcmToken = tokenList;
      const serverKey = 'AAAA3WmLRRM:APA91bHHMEYXDRuak81D3zljzTgbYjvXM6WP2eu0wdhzAAorBFX52bX1sEG2xG6kDgO4Y-fKJBnZNRmmmSfUI94XYyo_bj06Uk_X-QKNhGzfY5wuw82kNPZxLth6IiLJy20M3ITGKTx3'; // ADD SERVER KEY HERE PROVIDED BY FCM
  
      const data = {
        registration_ids: FcmToken,
        notification: {
          title: title,
          body: body,
        },
      };
  
      const headers = {
        Authorization: 'key=' + serverKey,
        'Content-Type': 'application/json',
      };
  
      const response = await axios.post(url, data, { headers });
  
      if (response.status === 200) {
        console.log('Notification sent successfully');
        return true;
      } else {
        console.error('Failed to send notification');
        return false;
      }
    } catch (error) {
      console.error('Error sending notification:', error);
      return false;
    }
  }