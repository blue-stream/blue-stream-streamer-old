import { Request, Response } from 'express';
import { StreamerManager } from './streamer.manager';
import * as aws from 'aws-sdk';
import { config } from '../config';

export class StreamerController {
    private static s3: aws.S3 = new aws.S3({
        accessKeyId: config.s3.accessKeyId,
        region: config.s3.region,
        secretAccessKey: config.s3.secretAccessKey,
        signatureVersion: config.s3.signatureVersion,
    });

    static async stream(req: Request, res: Response): Promise<void> {
        const videoFileName = req.params.fileName;
        let contentLength = 0;

        try {
            contentLength = await StreamerManager.getContentLengthOfObjectFromS3(config.s3.bucket, videoFileName, this.s3);
        } catch (err) {
            res.sendStatus(404).send();
        }

        const videoNameAndSuffix = videoFileName.split('.');
        if (videoNameAndSuffix.length === 1 || videoNameAndSuffix[1] !== 'mp4') {
            res.sendStatus(400).send();
        }

        if (req.headers.range) {
            const range = req.headers.range.toString();

            const bytes = range.replace(/bytes=/, '').split('-');

            const regEx = new RegExp(/^bytes\=\d+\-(\d+)??$/);

            if (!regEx.test(range)) {
                res.sendStatus(400).send();
            }

            const [start, end] = bytes.map((value) => {
                return value ? parseInt(value, 10) : contentLength - 1;
            });

            if (end <= start || end > contentLength) {
                res.sendStatus(400).send();
            }

            const CHUNKSIZE = (end - start) + 1;

            res.writeHead(206, {
                'Content-Range': `bytes ${start}-${end}/${contentLength}`,
                'Accept-Ranges': 'bytes',
                'Content-Length': CHUNKSIZE,
                'Content-Type': 'video/mp4',
            });

            this.s3.getObject({ Key: videoFileName, Range: range, Bucket: config.s3.bucket }).createReadStream().pipe(res);
        } else {
            res.writeHead(200, {
                'Content-Length': contentLength,
                'Content-Type': 'video/mp4',
            });

            this.s3.getObject({ Key: videoFileName, Bucket: config.s3.bucket }).createReadStream().pipe(res);
        }
    }
}
