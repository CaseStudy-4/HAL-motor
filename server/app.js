"use strict"
const serverPort = 9000;

var express = require('express');
var app = express();
const http = require('http');
const mysql = require('mysql');
var bodyParser = require('body-parser');

// urlencodedとjsonは別々に初期化する
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());


const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'halmotor'
});

connection.connect((error) => {
	if(error){
		console.log('Error!! mysql connection:' + error.stack);
		return;
	}
	console.log('mysql connection success');
});

/*
*   server create
*/
var server = app.listen(serverPort, function(){
  console.log("Node.js is listening to PORT:" + server.address().port);
});

/*
*   car
*/
  app.post('/car', (req, res) => {
      let values = [
      req.body.car_images,
      req.body.body_type,
      req.body.manufacture_name,
      req.body.car_name,
      req.body.decorations.air_conditioning + "," +
      req.body.decorations.smart_key + "," +
      req.body.decorations.sunroof + "," +
      req.body.decorations.air_bag + "," +
      req.body.decorations.lowdown + "," +
      req.body.decorations.power_steering + "," +
      req.body.decorations.cd + "," +
      req.body.decorations.leather_seats + "," +
      req.body.decorations.smoking_car + "," +
      req.body.decorations.power_window + "," +
      req.body.decorations.md + "," +
      req.body.decorations.aero_parts + "," +
      req.body.decorations.pet + "," +
      req.body.decorations.centralized_door_lock + "," +
      req.body.decorations.dvd + "," +
      req.body.decorations.aluminum_wheel + "," +
      req.body.decorations.limited_car + "," +
      req.body.decorations.abs + "," +
      req.body.decorations.tv + "," +
      req.body.decorations.skidding + "," +
      req.body.decorations.test_drive + "," +
      req.body.decorations.navigation + "," +
      req.body.decorations.traction_control + "," +
      req.body.decorations.etc + "," +
      req.body.decorations.back_camera + "," +
      req.body.decorations.cold_region + "," +
      req.body.decorations.keyless_enty + "," +
      req.body.decorations.automatic_sliding_door + "," +
      req.body.decorations.welfare_vehicles + "," +
      req.body.decorations.spare_tire + "," +
      req.body.decorations.jack + "," +
      req.body.decorations.new_car_warranty + "," +
      req.body.decorations.instruction_manual + "," +
      req.body.decorations.nox + "," +
      req.body.decorations.meter_exchange_history + "," +
      req.body.decorations.indoor_seat + "," +
      req.body.decorations.remote_controller,
      req.body.spec_info.doors + "," +
      req.body.spec_info.door_shape + "," +
      req.body.spec_info.capacity + "," +
      req.body.spec_info.drive_system + "," +
      req.body.spec_info.fue + "," +
      req.body.spec_info.repair_history + "," +
      req.body.spec_info.recycling_fee + "," +
      req.body.spec_info.handle + "," +
      req.body.spec_info.imported_car + "," +
      req.body.spec_info.load_capacity + "," +
      req.body.spec_info.car_history + "," +
      req.body.spec_info.owner_history,
      req.body.evaluations.total_evaluation + "," +
      req.body.evaluations.exterior_evaluation + "," +
      req.body.evaluations.interior_evaluation + "," +
      req.body.evaluations.cautions + "," +
      req.body.evaluations.check_by_date + "," +
      req.body.evaluations.transfer_registration_deadlin,
      req.body.car_info.trade_in_price + "," +
      req.body.car_info.vehicle_registration_img + "," +
      req.body.car_info.exhibition_number + "," +
      req.body.car_info.chassis_number + "," +
      req.body.car_info.manufacturer_id + "," +
      req.body.car_info.carname_id + "," +
      req.body.car_info.grade + "," +
      req.body.car_info.displacement + "," +
      req.body.car_info.model_year + "," +
      req.body.car_info.travelled_distance + "," +
      req.body.car_info.travelled_condition + "," +
      req.body.car_info.exterior_color + "," +
      req.body.car_info.exterior_colors + "," +
      req.body.car_info.interior_color + "," +
      req.body.car_info.vehicle_inspection_date + "," +
      req.body.car_info.mission + "," +
      req.body.car_info.format + "," +
      req.body.car_info.number_type + "," +
      req.body.car_info.license_number + "," +
      req.body.car_info.model_designation_number + "," +
      req.body.car_info.category_classification_number
      ];

    connection.query(
      "INSERT INTO car (car_images,body_type,manufacturer_name,car_name,decorations,spec_info,evaluations,car_info) VALUES (?,?,?,?,?,?,?,?);",values,
      (error, results,fields) => {
          if (error) {
              console.log('error: ' + error.stack);
              res.status(405).send({ message: '登録失敗' });
              return;
          }
          res.status(200).send({ message: '登録完了' });
      }
    );
  });

  app.get('/car', (req, res) => {      
    connection.query(
      'SELECT * FROM car;',
      (error, results) => {
        if (error) {
            console.log('error: ' + error.stack);
            res.status(405).send({ message: 'Error' });
            return;
        }

        for (let i = 0; i < results.length; i++) {
          var addData =
          { 
            car_id : results[i].car_id,
            car_images : results[i].car_images,
            body_type : results[i].body_type, 
            manufacturer_name : results[i].manufacturer_name,
            car_name : results[i].car_name,
            decorations : {
              air_conditioning : results[i].decorations.split(',')[0],
              smart_key : results[i].decorations.split(',')[1],
              sunroof : results[i].decorations.split(',')[2],
              air_bag : results[i].decorations.split(',')[3],
              lowdown : results[i].decorations.split(',')[4],
              power_steering : results[i].decorations.split(',')[5],
              cd : results[i].decorations.split(',')[6],
              leather_seats : results[i].decorations.split(',')[7],
              smoking_car : results[i].decorations.split(',')[8],
              power_window : results[i].decorations.split(',')[9],
              md : results[i].decorations.split(',')[10],
              aero_parts : results[i].decorations.split(',')[11],
              pet : results[i].decorations.split(',')[12],
              centralized_door_lock : results[i].decorations.split(',')[13],
              dvd : results[i].decorations.split(',')[14],
              aluminum_wheel : results[i].decorations.split(',')[15],
              limited_car : results[i].decorations.split(',')[16],
              abs : results[i].decorations.split(',')[17],
              tv : results[i].decorations.split(',')[18],
              skidding : results[i].decorations.split(',')[19],
              test_drive : results[i].decorations.split(',')[20],
              navigation : results[i].decorations.split(',')[21], 
              traction_control : results[i].decorations.split(',')[22],
              etc : results[i].decorations.split(',')[23],
              back_camera : results[i].decorations.split(',')[24],
              cold_region : results[i].decorations.split(',')[25],
              keyless_enty : results[i].decorations.split(',')[26],
              automatic_sliding_door : results[i].decorations.split(',')[27],
              welfare_vehicles : results[i].decorations.split(',')[28],
              spare_tire : results[i].decorations.split(',')[29],
              jack : results[i].decorations.split(',')[30],
              new_car_warranty : results[i].decorations.split(',')[31],
              instruction_manual : results[i].decorations.split(',')[32],
              nox : results[i].decorations.split(',')[33],
              meter_exchange_history : results[i].decorations.split(',')[34],
              indoor_seat : results[i].decorations.split(',')[35],
              remote_controller : results[i].decorations.split(',')[36] 
            },
            spec_info : {
              doors : results[i].spec_info.split(',')[0],
              door_shape : results[i].spec_info.split(',')[1],
              capacity : results[i].spec_info.split(',')[2],
              drive_system : results[i].spec_info.split(',')[3],
              fue : results[i].spec_info.split(',')[4],
              repair_history : results[i].spec_info.split(',')[5],
              recycling_fee : results[i].spec_info.split(',')[6],
              handle : results[i].spec_info.split(',')[7],
              imported_car : results[i].spec_info.split(',')[8],
              load_capacity : results[i].spec_info.split(',')[9],
              car_history : results[i].spec_info.split(',')[10],
              owner_history : results[i].spec_info.split(',')[11],
            },
            evaluations : {
              total_evaluation : results[i].evaluations.split(',')[0],
              exterior_evaluation : results[i].evaluations.split(',')[1],
              interior_evaluation : results[i].evaluations.split(',')[2],
              cautions : results[i].evaluations.split(',')[3],
              check_by_date : results[i].evaluations.split(',')[4],
              transfer_registration_deadlin : results[i].evaluations.split(',')[5],
              nspector : results[i].evaluations.split(',')[6],
            },
            car_info : {
              trade_in_price : results[i].car_info.split(',')[0],
              vehicle_registration_img : results[i].car_info.split(',')[1],
              exhibition_number : results[i].car_info.split(',')[2],
              chassis_number : results[i].car_info.split(',')[3],
              manufacturer_id : results[i].car_info.split(',')[4],
              carname_id : results[i].car_info.split(',')[5],
              grade : results[i].car_info.split(',')[6],
              displacement : results[i].car_info.split(',')[7],
              model_year : results[i].car_info.split(',')[8],
              travelled_distance : results[i].car_info.split(',')[9],
              travelled_condition : results[i].car_info.split(',')[10],
              exterior_color : results[i].car_info.split(',')[11],
              exterior_colors : results[i].car_info.split(',')[12],
              interior_color : results[i].car_info.split(',')[13],
              vehicle_inspection_date : results[i].car_info.split(',')[14],
              mission : results[i].car_info.split(',')[15],
              format : results[i].car_info.split(',')[16],
              number_type : results[i].car_info.split(',')[17],
              license_number : results[i].car_info.split(',')[18],
              model_designation_number : results[i].car_info.split(',')[19],
              category_classification_number : results[i].car_info.split(',')[20]
            } 
          }
          results[i] = addData;     
        }
        res.status(200).send(results);  
      }
    );
  });

  app.get('/car/Category/:category', function(req, res) {

    connection.query(
      'SELECT * FROM car WHERE body_type = ?;', req.params.category,
      (error, results) => {
        if(error){
          console.log('error: ' + error.stack);
          res.status(405).send({ message: 'Error' });
          return;
        }
  
        for (let i = 0; i < results.length; i++) {
          var addData =
          { 
            car_id : results[i].car_id,
            car_images : results[i].car_images,
            body_type : results[i].body_type, 
            manufacturer_name : results[i].manufacturer_name,
            car_name : results[i].car_name,
            decorations : {
              air_conditioning : results[i].decorations.split(',')[0],
              smart_key : results[i].decorations.split(',')[1],
              sunroof : results[i].decorations.split(',')[2],
              air_bag : results[i].decorations.split(',')[3],
              lowdown : results[i].decorations.split(',')[4],
              power_steering : results[i].decorations.split(',')[5],
              cd : results[i].decorations.split(',')[6],
              leather_seats : results[i].decorations.split(',')[7],
              smoking_car : results[i].decorations.split(',')[8],
              power_window : results[i].decorations.split(',')[9],
              md : results[i].decorations.split(',')[10],
              aero_parts : results[i].decorations.split(',')[11],
              pet : results[i].decorations.split(',')[12],
              centralized_door_lock : results[i].decorations.split(',')[13],
              dvd : results[i].decorations.split(',')[14],
              aluminum_wheel : results[i].decorations.split(',')[15],
              limited_car : results[i].decorations.split(',')[16],
              abs : results[i].decorations.split(',')[17],
              tv : results[i].decorations.split(',')[18],
              skidding : results[i].decorations.split(',')[19],
              test_drive : results[i].decorations.split(',')[20],
              navigation : results[i].decorations.split(',')[21], 
              traction_control : results[i].decorations.split(',')[22],
              etc : results[i].decorations.split(',')[23],
              back_camera : results[i].decorations.split(',')[24],
              cold_region : results[i].decorations.split(',')[25],
              keyless_enty : results[i].decorations.split(',')[26],
              automatic_sliding_door : results[i].decorations.split(',')[27],
              welfare_vehicles : results[i].decorations.split(',')[28],
              spare_tire : results[i].decorations.split(',')[29],
              jack : results[i].decorations.split(',')[30],
              new_car_warranty : results[i].decorations.split(',')[31],
              instruction_manual : results[i].decorations.split(',')[32],
              nox : results[i].decorations.split(',')[33],
              meter_exchange_history : results[i].decorations.split(',')[34],
              indoor_seat : results[i].decorations.split(',')[35],
              remote_controller : results[i].decorations.split(',')[36] 
            },
            spec_info : {
              doors : results[i].spec_info.split(',')[0],
              door_shape : results[i].spec_info.split(',')[1],
              capacity : results[i].spec_info.split(',')[2],
              drive_system : results[i].spec_info.split(',')[3],
              fue : results[i].spec_info.split(',')[4],
              repair_history : results[i].spec_info.split(',')[5],
              recycling_fee : results[i].spec_info.split(',')[6],
              handle : results[i].spec_info.split(',')[7],
              imported_car : results[i].spec_info.split(',')[8],
              load_capacity : results[i].spec_info.split(',')[9],
              car_history : results[i].spec_info.split(',')[10],
              owner_history : results[i].spec_info.split(',')[11],
            },
            evaluations : {
              total_evaluation : results[i].evaluations.split(',')[0],
              exterior_evaluation : results[i].evaluations.split(',')[1],
              interior_evaluation : results[i].evaluations.split(',')[2],
              cautions : results[i].evaluations.split(',')[3],
              check_by_date : results[i].evaluations.split(',')[4],
              transfer_registration_deadlin : results[i].evaluations.split(',')[5],
              nspector : results[i].evaluations.split(',')[6],
            },
            car_info : {
              trade_in_price : results[i].car_info.split(',')[0],
              vehicle_registration_img : results[i].car_info.split(',')[1],
              exhibition_number : results[i].car_info.split(',')[2],
              chassis_number : results[i].car_info.split(',')[3],
              manufacturer_id : results[i].car_info.split(',')[4],
              carname_id : results[i].car_info.split(',')[5],
              grade : results[i].car_info.split(',')[6],
              displacement : results[i].car_info.split(',')[7],
              model_year : results[i].car_info.split(',')[8],
              travelled_distance : results[i].car_info.split(',')[9],
              travelled_condition : results[i].car_info.split(',')[10],
              exterior_color : results[i].car_info.split(',')[11],
              exterior_colors : results[i].car_info.split(',')[12],
              interior_color : results[i].car_info.split(',')[13],
              vehicle_inspection_date : results[i].car_info.split(',')[14],
              mission : results[i].car_info.split(',')[15],
              format : results[i].car_info.split(',')[16],
              number_type : results[i].car_info.split(',')[17],
              license_number : results[i].car_info.split(',')[18],
              model_designation_number : results[i].car_info.split(',')[19],
              category_classification_number : results[i].car_info.split(',')[20]
            }
          }
          results[i] = addData;     
        }
        res.status(200).send(results);  
      }
    )
  });

  app.get('/car/Freewords/:freewords', function(req, res) {
    let values = [
      req.params.freewords,
      req.params.freewords,
      req.params.freewords
      ];

    connection.query(
      'SELECT * FROM car WHERE body_type LIKE "%' + req.params.freewords + '%" OR manufacturer_name LIKE "%' + req.params.freewords + '%" OR car_name LIKE "%' + req.params.freewords + '%";', values,
      (error, results) => {
        if(error){
          console.log('error: ' + error.stack);
          res.status(405).send({ message: 'Error' });
          return;
        }
  
        for (let i = 0; i < results.length; i++) {
          var addData =
          { 
            car_id : results[i].car_id,
            car_images : results[i].car_images,
            body_type : results[i].body_type, 
            manufacturer_name : results[i].manufacturer_name,
            car_name : results[i].car_name,
            decorations : {
              air_conditioning : results[i].decorations.split(',')[0],
              smart_key : results[i].decorations.split(',')[1],
              sunroof : results[i].decorations.split(',')[2],
              air_bag : results[i].decorations.split(',')[3],
              lowdown : results[i].decorations.split(',')[4],
              power_steering : results[i].decorations.split(',')[5],
              cd : results[i].decorations.split(',')[6],
              leather_seats : results[i].decorations.split(',')[7],
              smoking_car : results[i].decorations.split(',')[8],
              power_window : results[i].decorations.split(',')[9],
              md : results[i].decorations.split(',')[10],
              aero_parts : results[i].decorations.split(',')[11],
              pet : results[i].decorations.split(',')[12],
              centralized_door_lock : results[i].decorations.split(',')[13],
              dvd : results[i].decorations.split(',')[14],
              aluminum_wheel : results[i].decorations.split(',')[15],
              limited_car : results[i].decorations.split(',')[16],
              abs : results[i].decorations.split(',')[17],
              tv : results[i].decorations.split(',')[18],
              skidding : results[i].decorations.split(',')[19],
              test_drive : results[i].decorations.split(',')[20],
              navigation : results[i].decorations.split(',')[21], 
              traction_control : results[i].decorations.split(',')[22],
              etc : results[i].decorations.split(',')[23],
              back_camera : results[i].decorations.split(',')[24],
              cold_region : results[i].decorations.split(',')[25],
              keyless_enty : results[i].decorations.split(',')[26],
              automatic_sliding_door : results[i].decorations.split(',')[27],
              welfare_vehicles : results[i].decorations.split(',')[28],
              spare_tire : results[i].decorations.split(',')[29],
              jack : results[i].decorations.split(',')[30],
              new_car_warranty : results[i].decorations.split(',')[31],
              instruction_manual : results[i].decorations.split(',')[32],
              nox : results[i].decorations.split(',')[33],
              meter_exchange_history : results[i].decorations.split(',')[34],
              indoor_seat : results[i].decorations.split(',')[35],
              remote_controller : results[i].decorations.split(',')[36] 
            },
            spec_info : {
              doors : results[i].spec_info.split(',')[0],
              door_shape : results[i].spec_info.split(',')[1],
              capacity : results[i].spec_info.split(',')[2],
              drive_system : results[i].spec_info.split(',')[3],
              fue : results[i].spec_info.split(',')[4],
              repair_history : results[i].spec_info.split(',')[5],
              recycling_fee : results[i].spec_info.split(',')[6],
              handle : results[i].spec_info.split(',')[7],
              imported_car : results[i].spec_info.split(',')[8],
              load_capacity : results[i].spec_info.split(',')[9],
              car_history : results[i].spec_info.split(',')[10],
              owner_history : results[i].spec_info.split(',')[11],
            },
            evaluations : {
              total_evaluation : results[i].evaluations.split(',')[0],
              exterior_evaluation : results[i].evaluations.split(',')[1],
              interior_evaluation : results[i].evaluations.split(',')[2],
              cautions : results[i].evaluations.split(',')[3],
              check_by_date : results[i].evaluations.split(',')[4],
              transfer_registration_deadlin : results[i].evaluations.split(',')[5],
              nspector : results[i].evaluations.split(',')[6],
            },
            car_info : {
              trade_in_price : results[i].car_info.split(',')[0],
              vehicle_registration_img : results[i].car_info.split(',')[1],
              exhibition_number : results[i].car_info.split(',')[2],
              chassis_number : results[i].car_info.split(',')[3],
              manufacturer_id : results[i].car_info.split(',')[4],
              carname_id : results[i].car_info.split(',')[5],
              grade : results[i].car_info.split(',')[6],
              displacement : results[i].car_info.split(',')[7],
              model_year : results[i].car_info.split(',')[8],
              travelled_distance : results[i].car_info.split(',')[9],
              travelled_condition : results[i].car_info.split(',')[10],
              exterior_color : results[i].car_info.split(',')[11],
              exterior_colors : results[i].car_info.split(',')[12],
              interior_color : results[i].car_info.split(',')[13],
              vehicle_inspection_date : results[i].car_info.split(',')[14],
              mission : results[i].car_info.split(',')[15],
              format : results[i].car_info.split(',')[16],
              number_type : results[i].car_info.split(',')[17],
              license_number : results[i].car_info.split(',')[18],
              model_designation_number : results[i].car_info.split(',')[19],
              category_classification_number : results[i].car_info.split(',')[20]
            }
          }
          results[i] = addData;     
        }
        res.status(200).send(results);  
      }
    )
  });

  app.get('/car/Manufacter/:manufacter', function(req, res) {

    connection.query(
      'SELECT * FROM car WHERE manufacturer_name = ?;', req.params.manufacter,
      (error, results) => {
        if(error){
          console.log('error: ' + error.stack);
          res.status(405).send({ message: 'Error' });
          return;
        }
  
        for (let i = 0; i < results.length; i++) {
          var addData =
          { 
            car_id : results[i].car_id,
            car_images : results[i].car_images,
            body_type : results[i].body_type, 
            manufacturer_name : results[i].manufacturer_name,
            car_name : results[i].car_name,
            decorations : {
              air_conditioning : results[i].decorations.split(',')[0],
              smart_key : results[i].decorations.split(',')[1],
              sunroof : results[i].decorations.split(',')[2],
              air_bag : results[i].decorations.split(',')[3],
              lowdown : results[i].decorations.split(',')[4],
              power_steering : results[i].decorations.split(',')[5],
              cd : results[i].decorations.split(',')[6],
              leather_seats : results[i].decorations.split(',')[7],
              smoking_car : results[i].decorations.split(',')[8],
              power_window : results[i].decorations.split(',')[9],
              md : results[i].decorations.split(',')[10],
              aero_parts : results[i].decorations.split(',')[11],
              pet : results[i].decorations.split(',')[12],
              centralized_door_lock : results[i].decorations.split(',')[13],
              dvd : results[i].decorations.split(',')[14],
              aluminum_wheel : results[i].decorations.split(',')[15],
              limited_car : results[i].decorations.split(',')[16],
              abs : results[i].decorations.split(',')[17],
              tv : results[i].decorations.split(',')[18],
              skidding : results[i].decorations.split(',')[19],
              test_drive : results[i].decorations.split(',')[20],
              navigation : results[i].decorations.split(',')[21], 
              traction_control : results[i].decorations.split(',')[22],
              etc : results[i].decorations.split(',')[23],
              back_camera : results[i].decorations.split(',')[24],
              cold_region : results[i].decorations.split(',')[25],
              keyless_enty : results[i].decorations.split(',')[26],
              automatic_sliding_door : results[i].decorations.split(',')[27],
              welfare_vehicles : results[i].decorations.split(',')[28],
              spare_tire : results[i].decorations.split(',')[29],
              jack : results[i].decorations.split(',')[30],
              new_car_warranty : results[i].decorations.split(',')[31],
              instruction_manual : results[i].decorations.split(',')[32],
              nox : results[i].decorations.split(',')[33],
              meter_exchange_history : results[i].decorations.split(',')[34],
              indoor_seat : results[i].decorations.split(',')[35],
              remote_controller : results[i].decorations.split(',')[36] 
            },
            spec_info : {
              doors : results[i].spec_info.split(',')[0],
              door_shape : results[i].spec_info.split(',')[1],
              capacity : results[i].spec_info.split(',')[2],
              drive_system : results[i].spec_info.split(',')[3],
              fue : results[i].spec_info.split(',')[4],
              repair_history : results[i].spec_info.split(',')[5],
              recycling_fee : results[i].spec_info.split(',')[6],
              handle : results[i].spec_info.split(',')[7],
              imported_car : results[i].spec_info.split(',')[8],
              load_capacity : results[i].spec_info.split(',')[9],
              car_history : results[i].spec_info.split(',')[10],
              owner_history : results[i].spec_info.split(',')[11],
            },
            evaluations : {
              total_evaluation : results[i].evaluations.split(',')[0],
              exterior_evaluation : results[i].evaluations.split(',')[1],
              interior_evaluation : results[i].evaluations.split(',')[2],
              cautions : results[i].evaluations.split(',')[3],
              check_by_date : results[i].evaluations.split(',')[4],
              transfer_registration_deadlin : results[i].evaluations.split(',')[5],
              nspector : results[i].evaluations.split(',')[6],
            },
            car_info : {
              trade_in_price : results[i].car_info.split(',')[0],
              vehicle_registration_img : results[i].car_info.split(',')[1],
              exhibition_number : results[i].car_info.split(',')[2],
              chassis_number : results[i].car_info.split(',')[3],
              manufacturer_id : results[i].car_info.split(',')[4],
              carname_id : results[i].car_info.split(',')[5],
              grade : results[i].car_info.split(',')[6],
              displacement : results[i].car_info.split(',')[7],
              model_year : results[i].car_info.split(',')[8],
              travelled_distance : results[i].car_info.split(',')[9],
              travelled_condition : results[i].car_info.split(',')[10],
              exterior_color : results[i].car_info.split(',')[11],
              exterior_colors : results[i].car_info.split(',')[12],
              interior_color : results[i].car_info.split(',')[13],
              vehicle_inspection_date : results[i].car_info.split(',')[14],
              mission : results[i].car_info.split(',')[15],
              format : results[i].car_info.split(',')[16],
              number_type : results[i].car_info.split(',')[17],
              license_number : results[i].car_info.split(',')[18],
              model_designation_number : results[i].car_info.split(',')[19],
              category_classification_number : results[i].car_info.split(',')[20]
            }
          }
          results[i] = addData;     
        }
        res.status(200).send(results);  
      }
    )
  });

  app.get('/car/Value/:value1/:value2', function(req, res)  { 
    let value1 = 0;
    let value2 = 0;
    if(req.params.value1 != ""){
      value1 = req.params.value1;
    }  
    if(req.params.value2 != ""){
      value2 = req.params.value2;
    }  
    connection.query(
      'SELECT * FROM car;',
      (error, results) => {
        if (error) {
            console.log('error: ' + error.stack);
            res.status(405).send({ message: 'Error' });
            return;
        }

        var results1 = new Array();
        for (let i = 0; i < results.length; i++) {
          var addData =
          { 
            car_id : results[i].car_id,
            car_images : results[i].car_images,
            body_type : results[i].body_type, 
            manufacturer_name : results[i].manufacturer_name,
            car_name : results[i].car_name,
            decorations : {
              air_conditioning : results[i].decorations.split(',')[0],
              smart_key : results[i].decorations.split(',')[1],
              sunroof : results[i].decorations.split(',')[2],
              air_bag : results[i].decorations.split(',')[3],
              lowdown : results[i].decorations.split(',')[4],
              power_steering : results[i].decorations.split(',')[5],
              cd : results[i].decorations.split(',')[6],
              leather_seats : results[i].decorations.split(',')[7],
              smoking_car : results[i].decorations.split(',')[8],
              power_window : results[i].decorations.split(',')[9],
              md : results[i].decorations.split(',')[10],
              aero_parts : results[i].decorations.split(',')[11],
              pet : results[i].decorations.split(',')[12],
              centralized_door_lock : results[i].decorations.split(',')[13],
              dvd : results[i].decorations.split(',')[14],
              aluminum_wheel : results[i].decorations.split(',')[15],
              limited_car : results[i].decorations.split(',')[16],
              abs : results[i].decorations.split(',')[17],
              tv : results[i].decorations.split(',')[18],
              skidding : results[i].decorations.split(',')[19],
              test_drive : results[i].decorations.split(',')[20],
              navigation : results[i].decorations.split(',')[21], 
              traction_control : results[i].decorations.split(',')[22],
              etc : results[i].decorations.split(',')[23],
              back_camera : results[i].decorations.split(',')[24],
              cold_region : results[i].decorations.split(',')[25],
              keyless_enty : results[i].decorations.split(',')[26],
              automatic_sliding_door : results[i].decorations.split(',')[27],
              welfare_vehicles : results[i].decorations.split(',')[28],
              spare_tire : results[i].decorations.split(',')[29],
              jack : results[i].decorations.split(',')[30],
              new_car_warranty : results[i].decorations.split(',')[31],
              instruction_manual : results[i].decorations.split(',')[32],
              nox : results[i].decorations.split(',')[33],
              meter_exchange_history : results[i].decorations.split(',')[34],
              indoor_seat : results[i].decorations.split(',')[35],
              remote_controller : results[i].decorations.split(',')[36] 
            },
            spec_info : {
              doors : results[i].spec_info.split(',')[0],
              door_shape : results[i].spec_info.split(',')[1],
              capacity : results[i].spec_info.split(',')[2],
              drive_system : results[i].spec_info.split(',')[3],
              fue : results[i].spec_info.split(',')[4],
              repair_history : results[i].spec_info.split(',')[5],
              recycling_fee : results[i].spec_info.split(',')[6],
              handle : results[i].spec_info.split(',')[7],
              imported_car : results[i].spec_info.split(',')[8],
              load_capacity : results[i].spec_info.split(',')[9],
              car_history : results[i].spec_info.split(',')[10],
              owner_history : results[i].spec_info.split(',')[11],
            },
            evaluations : {
              total_evaluation : results[i].evaluations.split(',')[0],
              exterior_evaluation : results[i].evaluations.split(',')[1],
              interior_evaluation : results[i].evaluations.split(',')[2],
              cautions : results[i].evaluations.split(',')[3],
              check_by_date : results[i].evaluations.split(',')[4],
              transfer_registration_deadlin : results[i].evaluations.split(',')[5],
              nspector : results[i].evaluations.split(',')[6],
            },
            car_info : {
              trade_in_price : results[i].car_info.split(',')[0],
              vehicle_registration_img : results[i].car_info.split(',')[1],
              exhibition_number : results[i].car_info.split(',')[2],
              chassis_number : results[i].car_info.split(',')[3],
              manufacturer_id : results[i].car_info.split(',')[4],
              carname_id : results[i].car_info.split(',')[5],
              grade : results[i].car_info.split(',')[6],
              displacement : results[i].car_info.split(',')[7],
              model_year : results[i].car_info.split(',')[8],
              travelled_distance : results[i].car_info.split(',')[9],
              travelled_condition : results[i].car_info.split(',')[10],
              exterior_color : results[i].car_info.split(',')[11],
              exterior_colors : results[i].car_info.split(',')[12],
              interior_color : results[i].car_info.split(',')[13],
              vehicle_inspection_date : results[i].car_info.split(',')[14],
              mission : results[i].car_info.split(',')[15],
              format : results[i].car_info.split(',')[16],
              number_type : results[i].car_info.split(',')[17],
              license_number : results[i].car_info.split(',')[18],
              model_designation_number : results[i].car_info.split(',')[19],
              category_classification_number : results[i].car_info.split(',')[20]
            } 
          }
          results[i] = addData;     
        }
        let ind = 0;
        for (let i = 0; i < results.length; i++) {
          let trade_in_price1 = results[i].car_info.trade_in_price * 1.1;
          console.log(trade_in_price1);
          if(value1 != 0 && value2 != 0){
            if(value1 <= trade_in_price1 && trade_in_price1 <= value2){
              var addData =
              { 
                car_id : results[i].car_id,
                car_images : results[i].car_images,
                body_type : results[i].body_type, 
                manufacturer_name : results[i].manufacturer_name,
                car_name : results[i].car_name,
                decorations : {
                  air_conditioning : results[i].decorations.air_conditioning,
                  smart_key : results[i].decorations.smart_key,
                  sunroof : results[i].decorations.sunroof,
                  air_bag : results[i].decorations.air_bag,
                  lowdown : results[i].decorations.lowdown,
                  power_steering : results[i].decorations.power_steering,
                  cd : results[i].decorations.cd,
                  leather_seats : results[i].decorations.leather_seats,
                  smoking_car : results[i].decorations.smoking_car,
                  power_window : results[i].decorations.power_window,
                  md : results[i].decorations.md,
                  aero_parts : results[i].decorations.aero_parts,
                  pet : results[i].decorations.pet,
                  centralized_door_lock : results[i].decorations.centralized_door_lock,
                  dvd : results[i].decorations.dvd,
                  aluminum_wheel : results[i].decorations.aluminum_wheel,
                  limited_car : results[i].decorations.limited_car,
                  abs : results[i].decorations.abs,
                  tv : results[i].decorations.tv,
                  skidding : results[i].decorations.skidding,
                  test_drive : results[i].decorations.test_drive,
                  navigation : results[i].decorations.navigation, 
                  traction_control : results[i].decorations.traction_control,
                  etc : results[i].decorations.etc,
                  back_camera : results[i].decorations.back_camera,
                  cold_region : results[i].decorations.cold_region,
                  keyless_enty : results[i].decorations.keyless_enty,
                  automatic_sliding_door : results[i].decorations.automatic_sliding_door,
                  welfare_vehicles : results[i].decorations.welfare_vehicles,
                  spare_tire : results[i].decorations.spare_tire,
                  jack : results[i].decorations.jack,
                  new_car_warranty : results[i].decorations.new_car_warranty,
                  instruction_manual : results[i].decorations.instruction_manual,
                  nox : results[i].decorations.nox,
                  meter_exchange_history : results[i].decorations.meter_exchange_history,
                  indoor_seat : results[i].decorations.indoor_seat,
                  remote_controller : results[i].decorations.remote_controller
                },
                spec_info : {
                  doors : results[i].spec_info.doors,
                  door_shape : results[i].spec_info.door_shape,
                  capacity : results[i].spec_info.capacity,
                  drive_system : results[i].spec_info.drive_system,
                  fue : results[i].spec_info.fue,
                  repair_history : results[i].spec_info.repair_history,
                  recycling_fee : results[i].spec_info.recycling_fee,
                  handle : results[i].spec_info.handle,
                  imported_car : results[i].spec_info.imported_car,
                  load_capacity : results[i].spec_info.load_capacity,
                  car_history : results[i].spec_info.car_history,
                  owner_history : results[i].spec_info.owner_history
                },
                evaluations : {
                  total_evaluation : results[i].evaluations.total_evaluation,
                  exterior_evaluation : results[i].evaluations.exterior_evaluation,
                  interior_evaluation : results[i].evaluations.interior_evaluation,
                  cautions : results[i].evaluations.cautions,
                  check_by_date : results[i].evaluations.check_by_date,
                  transfer_registration_deadlin : results[i].evaluations.transfer_registration_deadlin,
                  nspector : results[i].evaluations.nspector,
                },
                car_info : {
                  trade_in_price : results[i].car_info.trade_in_price,
                  vehicle_registration_img : results[i].car_info.vehicle_registration_img,
                  exhibition_number : results[i].car_info.exhibition_number,
                  chassis_number : results[i].car_info.chassis_number,
                  manufacturer_id : results[i].car_info.manufacturer_id,
                  carname_id : results[i].car_info.carname_id,
                  grade : results[i].car_info.grade,
                  displacement : results[i].car_info.displacement,
                  model_year : results[i].car_info.model_year,
                  travelled_distance : results[i].car_info.travelled_distance,
                  travelled_condition : results[i].car_info.travelled_condition,
                  exterior_color : results[i].car_info.exterior_color,
                  exterior_colors : results[i].car_info.exterior_colors,
                  interior_color : results[i].car_info.interior_color,
                  vehicle_inspection_date : results[i].car_info.vehicle_inspection_date,
                  mission : results[i].car_info.mission,
                  format : results[i].car_info.format,
                  number_type : results[i].car_info.number_type,
                  license_number : results[i].car_info.license_number,
                  model_designation_number : results[i].car_info.model_designation_number,
                  category_classification_number : results[i].car_info.category_classification_number
                } 
              }
              results1[ind] = addData;
              ind++;
            } 
          }
          else if(value1 == 0){
            if(trade_in_price1 <= value2){
              var addData =
              { 
                car_id : results[i].car_id,
                car_images : results[i].car_images,
                body_type : results[i].body_type, 
                manufacturer_name : results[i].manufacturer_name,
                car_name : results[i].car_name,
                decorations : {
                  air_conditioning : results[i].decorations.air_conditioning,
                  smart_key : results[i].decorations.smart_key,
                  sunroof : results[i].decorations.sunroof,
                  air_bag : results[i].decorations.air_bag,
                  lowdown : results[i].decorations.lowdown,
                  power_steering : results[i].decorations.power_steering,
                  cd : results[i].decorations.cd,
                  leather_seats : results[i].decorations.leather_seats,
                  smoking_car : results[i].decorations.smoking_car,
                  power_window : results[i].decorations.power_window,
                  md : results[i].decorations.md,
                  aero_parts : results[i].decorations.aero_parts,
                  pet : results[i].decorations.pet,
                  centralized_door_lock : results[i].decorations.centralized_door_lock,
                  dvd : results[i].decorations.dvd,
                  aluminum_wheel : results[i].decorations.aluminum_wheel,
                  limited_car : results[i].decorations.limited_car,
                  abs : results[i].decorations.abs,
                  tv : results[i].decorations.tv,
                  skidding : results[i].decorations.skidding,
                  test_drive : results[i].decorations.test_drive,
                  navigation : results[i].decorations.navigation, 
                  traction_control : results[i].decorations.traction_control,
                  etc : results[i].decorations.etc,
                  back_camera : results[i].decorations.back_camera,
                  cold_region : results[i].decorations.cold_region,
                  keyless_enty : results[i].decorations.keyless_enty,
                  automatic_sliding_door : results[i].decorations.automatic_sliding_door,
                  welfare_vehicles : results[i].decorations.welfare_vehicles,
                  spare_tire : results[i].decorations.spare_tire,
                  jack : results[i].decorations.jack,
                  new_car_warranty : results[i].decorations.new_car_warranty,
                  instruction_manual : results[i].decorations.instruction_manual,
                  nox : results[i].decorations.nox,
                  meter_exchange_history : results[i].decorations.meter_exchange_history,
                  indoor_seat : results[i].decorations.indoor_seat,
                  remote_controller : results[i].decorations.remote_controller
                },
                spec_info : {
                  doors : results[i].spec_info.doors,
                  door_shape : results[i].spec_info.door_shape,
                  capacity : results[i].spec_info.capacity,
                  drive_system : results[i].spec_info.drive_system,
                  fue : results[i].spec_info.fue,
                  repair_history : results[i].spec_info.repair_history,
                  recycling_fee : results[i].spec_info.recycling_fee,
                  handle : results[i].spec_info.handle,
                  imported_car : results[i].spec_info.imported_car,
                  load_capacity : results[i].spec_info.load_capacity,
                  car_history : results[i].spec_info.car_history,
                  owner_history : results[i].spec_info.owner_history
                },
                evaluations : {
                  total_evaluation : results[i].evaluations.total_evaluation,
                  exterior_evaluation : results[i].evaluations.exterior_evaluation,
                  interior_evaluation : results[i].evaluations.interior_evaluation,
                  cautions : results[i].evaluations.cautions,
                  check_by_date : results[i].evaluations.check_by_date,
                  transfer_registration_deadlin : results[i].evaluations.transfer_registration_deadlin,
                  nspector : results[i].evaluations.nspector,
                },
                car_info : {
                  trade_in_price : results[i].car_info.trade_in_price,
                  vehicle_registration_img : results[i].car_info.vehicle_registration_img,
                  exhibition_number : results[i].car_info.exhibition_number,
                  chassis_number : results[i].car_info.chassis_number,
                  manufacturer_id : results[i].car_info.manufacturer_id,
                  carname_id : results[i].car_info.carname_id,
                  grade : results[i].car_info.grade,
                  displacement : results[i].car_info.displacement,
                  model_year : results[i].car_info.model_year,
                  travelled_distance : results[i].car_info.travelled_distance,
                  travelled_condition : results[i].car_info.travelled_condition,
                  exterior_color : results[i].car_info.exterior_color,
                  exterior_colors : results[i].car_info.exterior_colors,
                  interior_color : results[i].car_info.interior_color,
                  vehicle_inspection_date : results[i].car_info.vehicle_inspection_date,
                  mission : results[i].car_info.mission,
                  format : results[i].car_info.format,
                  number_type : results[i].car_info.number_type,
                  license_number : results[i].car_info.license_number,
                  model_designation_number : results[i].car_info.model_designation_number,
                  category_classification_number : results[i].car_info.category_classification_number
                } 
              }
              results1[ind] = addData;
              ind++;
            } 
          }
          else{
            if(trade_in_price1 >= value1){
              var addData =
              { 
                car_id : results[i].car_id,
                car_images : results[i].car_images,
                body_type : results[i].body_type, 
                manufacturer_name : results[i].manufacturer_name,
                car_name : results[i].car_name,
                decorations : {
                  air_conditioning : results[i].decorations.air_conditioning,
                  smart_key : results[i].decorations.smart_key,
                  sunroof : results[i].decorations.sunroof,
                  air_bag : results[i].decorations.air_bag,
                  lowdown : results[i].decorations.lowdown,
                  power_steering : results[i].decorations.power_steering,
                  cd : results[i].decorations.cd,
                  leather_seats : results[i].decorations.leather_seats,
                  smoking_car : results[i].decorations.smoking_car,
                  power_window : results[i].decorations.power_window,
                  md : results[i].decorations.md,
                  aero_parts : results[i].decorations.aero_parts,
                  pet : results[i].decorations.pet,
                  centralized_door_lock : results[i].decorations.centralized_door_lock,
                  dvd : results[i].decorations.dvd,
                  aluminum_wheel : results[i].decorations.aluminum_wheel,
                  limited_car : results[i].decorations.limited_car,
                  abs : results[i].decorations.abs,
                  tv : results[i].decorations.tv,
                  skidding : results[i].decorations.skidding,
                  test_drive : results[i].decorations.test_drive,
                  navigation : results[i].decorations.navigation, 
                  traction_control : results[i].decorations.traction_control,
                  etc : results[i].decorations.etc,
                  back_camera : results[i].decorations.back_camera,
                  cold_region : results[i].decorations.cold_region,
                  keyless_enty : results[i].decorations.keyless_enty,
                  automatic_sliding_door : results[i].decorations.automatic_sliding_door,
                  welfare_vehicles : results[i].decorations.welfare_vehicles,
                  spare_tire : results[i].decorations.spare_tire,
                  jack : results[i].decorations.jack,
                  new_car_warranty : results[i].decorations.new_car_warranty,
                  instruction_manual : results[i].decorations.instruction_manual,
                  nox : results[i].decorations.nox,
                  meter_exchange_history : results[i].decorations.meter_exchange_history,
                  indoor_seat : results[i].decorations.indoor_seat,
                  remote_controller : results[i].decorations.remote_controller
                },
                spec_info : {
                  doors : results[i].spec_info.doors,
                  door_shape : results[i].spec_info.door_shape,
                  capacity : results[i].spec_info.capacity,
                  drive_system : results[i].spec_info.drive_system,
                  fue : results[i].spec_info.fue,
                  repair_history : results[i].spec_info.repair_history,
                  recycling_fee : results[i].spec_info.recycling_fee,
                  handle : results[i].spec_info.handle,
                  imported_car : results[i].spec_info.imported_car,
                  load_capacity : results[i].spec_info.load_capacity,
                  car_history : results[i].spec_info.car_history,
                  owner_history : results[i].spec_info.owner_history
                },
                evaluations : {
                  total_evaluation : results[i].evaluations.total_evaluation,
                  exterior_evaluation : results[i].evaluations.exterior_evaluation,
                  interior_evaluation : results[i].evaluations.interior_evaluation,
                  cautions : results[i].evaluations.cautions,
                  check_by_date : results[i].evaluations.check_by_date,
                  transfer_registration_deadlin : results[i].evaluations.transfer_registration_deadlin,
                  nspector : results[i].evaluations.nspector,
                },
                car_info : {
                  trade_in_price : results[i].car_info.trade_in_price,
                  vehicle_registration_img : results[i].car_info.vehicle_registration_img,
                  exhibition_number : results[i].car_info.exhibition_number,
                  chassis_number : results[i].car_info.chassis_number,
                  manufacturer_id : results[i].car_info.manufacturer_id,
                  carname_id : results[i].car_info.carname_id,
                  grade : results[i].car_info.grade,
                  displacement : results[i].car_info.displacement,
                  model_year : results[i].car_info.model_year,
                  travelled_distance : results[i].car_info.travelled_distance,
                  travelled_condition : results[i].car_info.travelled_condition,
                  exterior_color : results[i].car_info.exterior_color,
                  exterior_colors : results[i].car_info.exterior_colors,
                  interior_color : results[i].car_info.interior_color,
                  vehicle_inspection_date : results[i].car_info.vehicle_inspection_date,
                  mission : results[i].car_info.mission,
                  format : results[i].car_info.format,
                  number_type : results[i].car_info.number_type,
                  license_number : results[i].car_info.license_number,
                  model_designation_number : results[i].car_info.model_designation_number,
                  category_classification_number : results[i].car_info.category_classification_number
                } 
              }
              results1[ind] = addData;
              ind++;
            } 
          }
             
        }
        res.status(200).send(results1);  
      }
    );
  });

/*
*   user
*/
  app.post('/user', (req, res) => {
      let values = [
      req.body.user_pass,
      req.body.user_name,
      req.body.user_mail,
      req.body.zip_code,
      req.body.address, 
      req.body.tel
      ];

    connection.query(
    "INSERT INTO user_info (user_pass,user_name,user_mail,zip_code,address,tel) VALUES (?,?,?,?,?,?);",values,
      (error, results,fields) => {
        if (error) {
            console.log('error: ' + error.stack);
            res.status(405).send({ message: '登録失敗' });
            return;
        }
        connection.query(
          "SELECT user_id FROM user_info WHERE user_pass = ? AND user_name = ? AND user_mail = ? AND zip_code = ? AND address = ? AND tel = ?;",values,
            (error, results,fields) => {
              if (error) {
                  console.log('error: ' + error.stack);
                  res.status(405).send({ message: '登録失敗' });
                  return;
              }
              res.status(200).send(results);
            }
          );
      }
    );
  });

  app.get('/user', (req, res) => {      
    connection.query(
      'SELECT * FROM user_info;',
      (error, results) => {
        if (error) {
            console.log('error: ' + error.stack);
            res.status(405).send({ message: 'Error' });
            return;
        }
        res.status(200).send(results);  
      }
    );
  });

  app.get('/user/:userID', function(req, res) {      
    connection.query(
      'SELECT * FROM user_info WHERE user_id = ?;', req.params.userID,
      (error, results) => {
        if (error) {
            console.log('error: ' + error.stack);
            res.status(405).send({ message: 'Error' });
            return;
        }
        res.status(200).send(results);  
      }
    );
  });

  app.get('/user/Username/:username', function(req, res) {      
    connection.query(
      'SELECT * FROM user_info WHERE user_name = ?;', req.params.username,
      (error, results) => {
        if (error) {
            console.log('error: ' + error.stack);
            res.status(405).send({ message: 'Error' });
            return;
        }
        res.status(200).send(results);  
      }
    );
  });

  app.get('/user/Email/:e_mail', function(req, res) {      
    connection.query(
      'SELECT * FROM user_info WHERE user_mail = ?;', req.params.e_mail,
      (error, results) => {
        if (error) {
            console.log('error: ' + error.stack);
            res.status(405).send({ message: 'Error' });
            return;
        }
        res.status(200).send(results);  
      }
    );
  });

  app.put('/user/:userID', function(req, res) {
    let id = req.params.userID;
    let values = [
      req.body.user_pass,
      req.body.user_name,
      req.body.user_mail,
      req.body.zip_code,
      req.body.address, 
      req.body.tel
      ];

      connection.query(
      "UPDATE user_info SET user_pass = ?,user_name = ?,user_mail = ?,zip_code = ?,address = ?,tel = ? WHERE  user_id = "+id+";",values,
      (error, results,fields) => {
          if (error) {
              console.log('error: ' + error.stack);
              res.status(405).send({ message: '更新失敗' });
              return;
          }
          res.status(200).send({ message: '更新成功' });
      }
      );
   });  

  app.delete('/user/:userID', function(req, res) {      
    connection.query(
      'DELETE  FROM  user_info WHERE user_id = ?;', req.params.userID,
      (error, results) => {
        if (error) {
          console.log('error: ' + error.stack);
          res.status(405).send({ message: '削除失敗' });
          return;
        }
        res.status(200).send({ message: '削除成功' }); 
      }
    );
  });



























































  


