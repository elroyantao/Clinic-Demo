import {getClinicPostcode,getClinicName,getClinicCity} from '../controllers/data.server.controller';

export default function(app){
  app.route('/clinics/postcode/:postcode').get(getClinicPostcode);
  app.route('/clinics/name/:name').get(getClinicName);
  app.route('/clinics/city/:name').get(getClinicCity);
}
