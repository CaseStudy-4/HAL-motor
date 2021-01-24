let requestURL = 'http://localhost:9000/user'

$("#regist_info").on("submit", function(event) {
    event.preventDefault();
    var send_data = {
        user_pass: $('#regist_info input[name="InputUserName"]').val(),
        user_mail: $('#regist_info input[name="InputMail"]').val(),
        user_pass: $('#regist_info input[name="InputPassword1"]').val(),
        zip_code: $('#regist_info input[name="zip21"]').val(),
        name: $('#regist_info input[name="zip22"]').val(),
        name: $('#regist_info input[name="adr21"]').val(),
        name: $('#regist_info input[name="InputTel"]').val(),
    };
    $.ajax({
        type: "post",
        url: "/",
        data: send_data
    }).done(function(results) {
        console.log(results);
        alert("情報を登録しました。")
    }).fail(function(xhr, textStatus, errorThrown) {
        console.log("ajax通信に失敗しました")
    }).always(function(xhr) {});
});