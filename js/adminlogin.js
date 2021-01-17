$(function(){
	let requestURL = 'http://localhost:9000/admin/login';

	$('#form').on('submit', function(e){
		e.preventDefault();
		// var fd = new FormData($('#form').get(0));

		// console.log(fd.get('body'));
	
		// 通信実行
		$.ajax({
			type: $('#form').attr('method'),                // method = "POST"
			url: $('#form').attr('action'),        // POST送信先のURL
			data: $('#form').serialize(),  // JSONデータ本体
			contentType: false, // リクエストの Content-Type
			processData: false           // レスポンスをJSONとしてパースする
		})
		.done( (data) => {
			let res = JSON.stringify(data);
			alert(res);
		})
		.fail( (data) => {
			let res = JSON.stringify(data);
			alert(res);
		});
	});
});