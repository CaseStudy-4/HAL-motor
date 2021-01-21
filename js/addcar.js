$(function(){

  var carImageNum = 1;
  var requestURL = "http://localhost:9000/car";

  $("#carsubmit").on('click', function(){

    let jsonData = {
      "body_type": "セダン",
      "manufacture_name": $('#MakerName').val(),
      "car_name": $('#CarName').val(),
      "decorations": {
          "air_conditioning": 1,
          "smart_key": 0,
          "sunroof": 1,
          "air_bag": 0,
          "lowdown": 1,
          "power_steering": 0,
          "cd": 1,
          "leather_seats": 0,
          "smoking_car": 0,
          "power_window": 1,
          "md": 0,
          "aero_parts": 1,
          "pet": 1,
          "centralized_door_lock": 1,
          "dvd": 1,
          "aluminum_wheel": 1,
          "limited_car": 0,
          "abs": 0,
          "tv": 1,
          "skidding": 1,
          "test_drive": 1,
          "navigation": 1,
          "traction_control": 0,
          "etc": 1,
          "back_camera": 1,
          "cold_region": 0,
          "keyless_enty": 0,
          "automatic_sliding_door": 1,
          "welfare_vehicles": 0,
          "spare_tire": 0,
          "jack": 0,
          "new_car_warranty": 1,
          "instruction_manual": 1,
          "nox": "2022/12/01",
          "meter_exchange_history": 0,
          "indoor_seat": "1/2/3",
          "remote_controller": 0
      },
      "spec_info": {
          "doors": 4,
          "door_shape": "i",
          "capacity": 5,
          "drive_system": "2WD",
          "fue": "G",
          "repair_history": 0,
          "recycling_fee": 0,
          "handle": 0,
          "imported_car": 0,
          "load_capacity": 800,
          "car_history": 0,
          "owner_history": "aaaaa"
      },
    "evaluations": {
          "total_evaluation": "S",
          "exterior_evaluation": "A",
          "interior_evaluation": "A",
          "cautions": "aaa",
          "check_by_date": "2022/12/01",
          "transfer_registration_deadlin": "2022/12/01",
          "nspector": "米正"
      },
      "car_info": {
          "trade_in_price": $('#Price').val(),
          "vehicle_registration_img": "hoge.png",
          "exhibition_number": 1,
          "chassis_number": 1,
          "manufacturer_id": 1,
          "carname_id": 1,
          "grade": "S",
          "displacement": "1800cc",
          "model_year": 0,
          "travelled_distance": 0,
          "travelled_condition": 1,
          "exterior_color": "白",
          "exterior_colors": 0,
          "interior_color": "黒",
          "vehicle_inspection_date":"2022/12/02",
          "mission": 5,
          "format": 1,
          "number_type": 1,
          "license_number": 1111,
          "model_designation_number": 1,
          "category_classification_number": 1
      }
    };

    // 通信実行
    $.ajax({
      type: "post",                // method = "POST"
      url: requestURL,        // POST送信先のURL
      data: JSON.stringify(jsonData),  // JSONデータ本体
      contentType: 'application/json', // リクエストの Content-Type
      dataType: "json",           // レスポンスをJSONとしてパースする
    })
    .done( (data) => {
      let res = JSON.stringify(data);
      alert(res.msg);
    })
    .fail( (data) => {
      let res = JSON.stringify(data);
      alert(res);
    });
  });

	$('#AddImage').on('click', function(){

		let inputFileID = 'InputFile' + carImageNum;
		$('#CarImage').append(
			$('<div class="input-group">').append(
				$('<div class="custom-file">').append(
					'<input type="file" class="custom-file-input" id="' + inputFileID + '">',).append('<label class="custom-file-label" for="' + inputFileID + '">Choose file')
			)
		);
		carImageNum++;
	});

	$('.custom-file-input').each(function(index, element){
		$('body').on('change', element, function(){
			let inputImage = $(element).prop('files')[0].name;
			console.log('file change', inputImage);
			$('.custom-file-label').eq(index).text(inputImage);
			console.log('label text change');
		});
	});

  


});