import fetch from 'node-fetch';

export function checkPostcodeAPI() {
  let startTime = process.hrtime();
  let service = 'http://data.gov.uk/data/api/service/health/clinics/partial_postcode';
  let result = {
    service
  }
  return fetch(service).then(onSuccess(result, startTime), onError(result, startTime));
}

export function checkNameAPI() {
  let startTime = process.hrtime();
  let service = 'http://data.gov.uk/data/api/service/health/clinics/organisation_name';
  let result = {
    service
  }
  return fetch(service).then(onSuccess(result, startTime), onError(result, startTime));
}

export function checkCityAPI() {
  let startTime = process.hrtime();
  let service = 'http://data.gov.uk/data/api/service/health/clinics';
  let result = {
    service
  }
  return fetch(service).then(onSuccess(result, startTime), onError(result, startTime));
}

function onSuccess(result, startTime) {
  return (res) => {
    let time = process.hrtime(startTime);
    Object.assign(result, {
      isHealthy: true,
      message: '',
      time: Math.round(time[0] * 1000 + time[1] / 1000000)
    });
    return result;
  }
}

function onError(result, startTime) {
  return (err) => {
    let time = process.hrtime(startTime);
    Object.assign(result, {
      isHealthy: false,
      message: err.message,
      time: Math.round(time[0] * 1000 + time[1] / 1000000)
    });
    return result;
  }
}
