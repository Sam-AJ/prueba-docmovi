import { Meteor } from 'meteor/meteor';
import { PatientCollection } from '../imports/api/PatientCollection';

const insertPatient = patient => PatientCollection.insert({
  nombres: patient.nombres,
  aPaterno: patient.aPaterno,
  aMaterno: patient.aMaterno,
  rut: patient.rut,
  region: patient.region,
  comuna: patient.comuna,
  cPostal: patient.cPostal
});

Meteor.startup(() => {
  if (PatientCollection.find().count() === 0) {
    insertPatient({
      nombres: 'Samuel Pablo', 
      aPaterno: 'Jara', 
      aMaterno: 'Aravena', 
      rut: '17.910.603-5', 
      region: 'Región de la Araucanía', 
      comuna: 'Temuco', 
      cPostal: 4780000
    });
  }
});
