/* tslint:disable:function-name */
import { Handlers } from 'alexa-sdk';

const responses = {
  SNOWING: 'YES! Commence panic.',
  NOT_SNOWING: 'No.',
  STOP_MESSAGE: 'Feel free to check again in a few seconds.',
  HELP_MESSAGE: 'You can ask if it is snowing in Portland.',
};

const handlers: Handlers<any> = {
  LaunchRequest() {
    this.emit('IsItSnowingIntent');
  },
  IsItSnowingIntent() {
    const isItSnowing = responses.NOT_SNOWING;
    // this.response.cardRenderer(SKILL_NAME, randomFact);
    this.emit(':tell', isItSnowing);
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
