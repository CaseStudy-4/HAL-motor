let username = 'admin';
// let first = true;

if(window.sessionStorage.getItem(['username']) == null){
	alert('ログインしてください');
	window.location.href = 'pages/forms/login.html';
}
else {
	username = window.sessionStorage.getItem(['username']);
	alert('ようこそ！！' + username);
}

$(function(){
	$('#admin_name').text(username);
});
