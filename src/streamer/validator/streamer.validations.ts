import { Types } from 'mongoose';

export class StreamerValidatons {
    static isVideoIdValid(id: string): boolean {
        return (id.length < 1024);
    }

    // static isPreviewValid(id: string): boolean {}
    // static isThumbnailValid(id: string): boolean {}
}
