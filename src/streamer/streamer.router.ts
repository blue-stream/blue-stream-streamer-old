import { Router } from 'express';
import { StreamerValidator } from './validator/streamer.validator';
import { StreamerController } from './streamer.contoller';
import { Wrapper } from '../utils/wrapper';

const StreamerRouter: Router = Router();

StreamerRouter.get('/video/:fileName', StreamerValidator.canStreamVideo, Wrapper.wrapAsync(StreamerController.stream));
// StreamerRouter.get('/thumbnail/:fileName', StreamerValidator.canStreamThumbnail, Wrapper.wrapAsync(StreamerController.create));
// StreamerRouter.get('/preview/:fileName', StreamerValidator.canStreamPreview, Wrapper.wrapAsync(StreamerController.create));

export { StreamerRouter };
