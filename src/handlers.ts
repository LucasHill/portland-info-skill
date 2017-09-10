/* tslint:disable:function-name */
import { Handlers } from 'alexa-sdk';
import darkSky from './darkSky';

const responses = {
  SNOWING: 'YES! Commence panic.',
  NOT_SNOWING: 'No.',
  STOP_MESSAGE: 'Feel free to check again in a few seconds.',
  ISSUE_MESSAGE: 'I encountered an issue but you can probably just look outside.',
  HELP_MESSAGE: 'You can ask if it is snowing in Portland.',
};

const handlers: Handlers<any> = {
  LaunchRequest() {
    this.emit('IsItSnowingIntent');
  },
  IsItSnowingIntent() {
    // this.response.cardRenderer(SKILL_NAME, randomFact);
    darkSky.isSnowingNow().then(
      (isSnowing) => {
        const message = isSnowing ? responses.SNOWING : responses.NOT_SNOWING;
        this.emit(':tell', message);
      }).catch((error) => {
        this.emit(':tell', responses.ISSUE_MESSAGE);
      });

  },
  'AMAZON.HelpIntent'() {
    this.emit(':tell', responses.HELP_MESSAGE);
  },
  'AMAZON.CancelIntent'() {
    this.emit(':tell', responses.STOP_MESSAGE);
  },
  'AMAZON.StopIntent'() {
    this.emit(':tell', responses.STOP_MESSAGE);
  },
};

export default handlers;
