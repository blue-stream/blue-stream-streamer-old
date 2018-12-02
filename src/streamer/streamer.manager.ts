import { IStreamer } from './streamer.interface';
import * as aws from 'aws-sdk';
import { config } from '../config';

export class StreamerManager {
    // private static s3: aws.S3 = new aws.S3({
    //     accessKeyId: config.s3.accessKeyId,
    //     region: config.s3.region,
    //     secretAccessKey: config.s3.secretAccessKey,
    //     signatureVersion: config.s3.signatureVersion,
    // });

    static async getContentLengthOfObjectFromS3(bucket: string, videoFileName: string, s3: aws.S3): Promise<number> {
        const result = await s3.headObject({ Bucket: bucket, Key: videoFileName }).promise();
        return result.ContentLength!;
    }

    static async getObjectFromS3(s3: aws.S3, bucket: string, videoFileName: string, range: number) {
    }
}
