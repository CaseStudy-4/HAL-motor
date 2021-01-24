let requestURL = 'http://localhost:9000/user/login'

$("#login_info").on("submit", function(event) {
    event.preventDefault();

    /*
    var send_data = {
        username: $('#regist_info input[name="InputMail"]').val(),
        password: $('#regist_info input[name="InputPassword"]').val(),
    };
    $.ajax({
        type: "post",
        url: requestURL,
        data: send_data
    }).done(function(results) {
        console.log(results);
        alert("情報を登録しました。")
    }).fail(function(xhr, textStatus, errorThrown) {
        console.log("ajax通信に失敗しました")
    }).always(function(xhr) {});
    */

    // 通信実行
		$.ajax({
			data: $('#login_info').serialize(),
			type: 'POST',
			url: requestURL,
			headers: {'Content-Type': 'application/x-www-form-urlencoded'},
			contentType: 'application/x-www-form-urlencoded; charset=utf-8',
			dataType: 'json',
		})
		.done( (data) => {
			let res = JSON.stringify(data);
            let obj = JSON.parse(res);
            console.log(res);
			// alert(res);
		})
		.fail( (data) => {
			// let res = JSON.stringify(data);
			console.log('ログインできませんでした');
		});
});