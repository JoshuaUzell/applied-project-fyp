import { Injectable } from '@angular/core';
import * as AWS from 'aws-sdk';
import { CognitoIdentityCredentials, S3 } from 'aws-sdk';

@Injectable({
  providedIn: 'root'
})
export class AwsService {
  private s3: S3;

  constructor() {
    AWS.config.region = 'eu-west-1';
    AWS.config.credentials = new CognitoIdentityCredentials({
      IdentityPoolId: 'eu-west-1:906fc3ad-964c-4a9a-8387-9b7b74090908',
    });

    this.s3 = new S3({
      apiVersion: '2006-03-01',
      region: 'eu-west-1',
    });
  }

  uploadFile(file: File, bucketName: string, key: string): Promise<string> {
    const params = {
      Bucket: bucketName,
      Key: key,
      Body: file,
      ACL: 'public-read',
    };

    return new Promise((resolve, reject) => {
      this.s3.upload(params, function(err: any, data: any) {
        if (err) {
          console.error('AWS S3 upload error:', err);
          reject(err);
        } else {
          console.log('Successfully uploaded data to S3:', data);
          resolve(data.Location);
        }
      });
    });
  }
}
