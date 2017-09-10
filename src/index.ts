import { handler as alexaHandler, RequestBody, Context } from 'alexa-sdk';
import handlers from './handlers';
import * as process from 'process';

function handler(
  event: RequestBody<any>, context: Context, callback: (err: any, response: any) => void) {

  const alexa = alexaHandler(event, context, callback);
  alexa.appId = process.env.APP_ID;
  alexa.registerHandlers(handlers);
  alexa.execute();
}

export { handler };
