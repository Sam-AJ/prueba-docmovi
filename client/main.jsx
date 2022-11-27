import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import { PatientApp } from '../imports/ui/PatientApp';

Meteor.startup(() => {
  render(<PatientApp />, document.getElementById('react-target'));
});
