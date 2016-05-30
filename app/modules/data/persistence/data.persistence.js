import fetch from 'node-fetch';

export function getClinicByPostcodeAPI(partial) {
  return fetch(`http://data.gov.uk/data/api/service/health/clinics/partial_postcode?partial_postcode=${partial}`).then((res) => {
    return res.json();
  }).then(formatResponse);
}

export function getClinicByNameAPI(name) {
  return fetch(`http://data.gov.uk/data/api/service/health/clinics/organisation_name?organisation_name=${name}`).then((res) => {
    return res.json();
  }).then(formatResponse);
}

export function getClinicByCityAPI(city) {
  return fetch(`http://data.gov.uk/data/api/service/health/clinics?city=${city}`).then((res) => {
    return res.json();
  }).then(formatResponse);
}

function formatResponse(response){
  if(!response.success){
    throw response.error;
  }
  return response.result;
}
