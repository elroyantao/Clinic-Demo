import {checkPostcodeAPI, checkNameAPI, checkCityAPI} from '../external/external.service.js';
import * as logger from '../../../logger';

export function ping(req, res) {
  logger.success('Service Pinged Successfully');
  res.status(200).send();
}

export function healthcheck(req, res) {
  Promise.all([checkPostcodeAPI(), checkNameAPI(), checkCityAPI()]).then((result) => {
    let response = {
      isHealthy: !result.some((check) => !check.isHealthy),
      healthchecks: result
    }
    logger.success(`HealthCheck API : ${response.isHealthy
      ? 'All'
      : result.filter((check) => check.isHealthy).length} service healthy`);
    res.send(response);
  }).catch((err) => {
    logger.error(`HealthCheck API : ${err.message || err} `);
    res.status(500).send(err);
  })

}
