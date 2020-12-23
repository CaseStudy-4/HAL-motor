$(function(){

  var carImageNum = 1;

  $("#carsubmit").on('click',function(){
    let exhibitionNumber = $('#ExhibitionNumber').val();
  	let bodyNumber = $('#BodyNumber').val();
    let grade = $('#Grade').val();
    console.log(exhibitionNumber);
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

	/*
	$('.custom-file-input').each(function(index, element){
		$('body').on('change', '',function(){
			let inputImage = $(element).prop('files')[0].name;
			console.log('file change', inputImage);
			$('.custom-file-label').eq(index).text(inputImage);
			console.log('label text change');
		});
	});
	*/

	$('.custom-file-input').each(function(index, element){
		$('body').on('change', element, function(){
			let inputImage = $(element).prop('files')[0].name;
			console.log('file change', inputImage);
			$('.custom-file-label').eq(index).text(inputImage);
			console.log('label text change');
		});
	});
});