/* tslint:disable:function-name */
import { Handlers } from 'alexa-sdk';
import darkSky from './dark-sky';

const snowResponses = {
  SNOWING: 'YES! Commence panic.',
  NOT_SNOWING: 'No.',
  ISSUE_MESSAGE: 'I encountered an issue but you can probably just look outside.',
};

const generalResponse = {
  HELP_MESSAGE: 
    'You can ask questions like is it snowing in Portland or where should I go in Portland?',
  WHERE_TO_GO: 'Yamhill Pub, located at 223 SW Yamhill St.',
  WHAT_TO_DO: 'Have you thought about volunteering at Free Geek?',
  STOP_MESSAGE: 'OKAY, GOODBYE!',  
};

const handlers: Handlers<any> = {
  LaunchRequest() {
    this.emit('HelpIntent');
  },
  
  IsItSnowingIntent() {
    // this.response.cardRenderer(SKILL_NAME, randomFact);
    darkSky.isSnowingNow().then(
      (isSnowing) => {
        const message = isSnowing ? snowResponses.SNOWING : snowResponses.NOT_SNOWING;
        this.emit(':tell', message);
      }).catch((error) => {
        this.emit(':tell', snowResponses.ISSUE_MESSAGE);
      });

  },

  WhereToGoIntent() {
    this.emit(':tell', generalResponse.WHERE_TO_GO);
  },

  WhatToDoIntent() {
    this.emit(':tell', generalResponse.WHAT_TO_DO);
  },

  'AMAZON.HelpIntent'() {
    this.emit(':tell', generalResponse.HELP_MESSAGE);
  },

  'AMAZON.CancelIntent'() {
    this.emit(':tell', generalResponse.STOP_MESSAGE);
  },
  'AMAZON.StopIntent'() {
    this.emit(':tell', generalResponse.STOP_MESSAGE);
  },
};

export default handlers;
