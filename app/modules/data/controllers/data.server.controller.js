import _ from 'lodash';

import {getClinicByPostcodeAPI, getClinicByNameAPI, getClinicByCityAPI} from '../persistence/data.persistence';

export function getClinicPostcode(req, res) {
  let partial = getPartialPostcode(req.params.postcode)
  getClinicByPostcodeAPI(partial)
  .then(filterClinicsByPostcode(req.params.postcode))
  .then(formatClinicsAddress)
  .then((clinics) => {
    res.send(clinics);
  })
  .catch((err)=>{
    res.status(500).send(err);
  });
};

export function getClinicName(req, res) {
  getClinicByNameAPI(req.params.name)
  .then(formatClinicsAddress)
  .then((clinics)=>{
    return {
      results : clinics,
      pims_managed: getPimsManagedCount(clinics)
    };
  })
  .then((clinics) => {
    res.send(clinics);
  });
}

export function getClinicCity(req, res) {
  getClinicByCityAPI(req.params.city)
  .then((clinics)=>{
    let gen = countByPartialPostCode(clinics);
    return {
      results : gen.next().value,
      total : gen.next().value
    };
  })
  .then((clinics) => {
    res.send(clinics);
  });
}

export function getPartialPostcode(postcode) {
  return postcode.split(' ')[0];
}

export function filterClinicsByPostcode(postcode){
  return (clinics)=>{
    return clinics.filter((clinic)=>{
      return clinic.postcode === postcode;
    });
  }
}

export function formatClinicsAddress(clinics){
  return clinics.map((clinic)=>{
    clinic.formatted = `${clinic.organisation_name} (${clinic.address1 !==''? `${clinic.address1}, ` : ''}${clinic.address2 !==''? `${clinic.address2}, ` : ''}${clinic.address3 !==''? `${clinic.address3}, ` : ''}${clinic.postcode}, ${clinic.city})`;
    return clinic;
  })
}

export function getPimsManagedCount(clinics){
  return clinics.filter((clinic)=>{
    return clinic.is_pims_managed === 'True';
  }).length;
}

export function* countByPartialPostCode(clinics){
  let partialCounts =  _.countBy(clinics,'partial_postcode');
  yield partialCounts;
  yield Object.keys(partialCounts).length;
}
