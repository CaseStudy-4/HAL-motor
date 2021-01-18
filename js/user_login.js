$("#login_info").on("submit", function(event) {
    event.preventDefault();
    var send_data = {
        name: $('#regist_info input[name="InputMail"]').val(),
        name: $('#regist_info input[name="InputPassword"]').val(),
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