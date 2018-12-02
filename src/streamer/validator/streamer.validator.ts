import { Request, Response, NextFunction } from 'express';
import { StreamerValidatons } from './streamer.validations';
import { PropertyInvalidError, IdInvalidError } from '../../utils/errors/userErrors';
import { IStreamer } from '../streamer.interface';

export class StreamerValidator {
    static canStreamVideo(req: Request, res: Response, next: NextFunction) {
        next(!!req.params.fileName && StreamerValidatons.isVideoIdValid(req.params.fileName));
    }

    // static canStreamThumbnail(req: Request, res: Response, next: NextFunction) {}
    // static canStreamPreview(req: Request, res: Response, next: NextFunction) {}
}
