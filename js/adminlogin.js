$(function(){
	let requestURL = 'http://localhost:9000/admin/login';

	$('#form').on('submit', function(e){
		e.preventDefault();
		// 通信実行
		$.ajax({
			data: $('#form').serialize(),
			type: 'POST',
			url: requestURL,
			headers: {'Content-Type': 'application/x-www-form-urlencoded'},
			contentType: 'application/x-www-form-urlencoded; charset=utf-8',
			dataType: 'json',
		})
		.done( (data) => {
			let res = JSON.stringify(data);
			let obj = JSON.parse(res);
			if(res){
				// alert('ようこそ！' + obj.username);
				window.sessionStorage.setItem(['username'],[obj.username]);
				window.location.href = '../../index.html';
			}
			// alert(res);
		})
		.fail( (data) => {
			// let res = JSON.stringify(data);
			alert('ログインできませんでした');
		});
	});
});