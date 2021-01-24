$(function(){
  
  // Example starter JavaScript for disabling form submissions if there are invalid fields
  'use strict'

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  var forms = document.querySelectorAll('.needs-validation')

  // Loop over them and prevent submission
  Array.prototype.slice.call(forms).forEach(function (form) {
    form.addEventListener('click', function (event) {
      if (!form.checkValidity()) {
        event.preventDefault()
        event.stopPropagation()
      }

      form.classList.add('was-validated')
    }, false)
  });

  $('#submit').on('click', function(){

    let requestURL = 'http://localhost:9000/admin'
    let pass = $('#Password').val();
    let repass = $('#Repassword').val();

    if (pass != repass){
      console.log('error');
      // $('#Repassword').addClass('was-invalid');
      $('#Repassword').val('');
    }
    else {
      console.log('ok');

      let sendData = {
        "employee_name" : $('#name').val(),
        "employee_mail" : $('#mail').val(),
        "employee_phone" : $('#phone').val(),
        "employee_pass" : pass
      }

      // 通信実行
      $.ajax({
        type: "post",                // method = "POST"
        url: requestURL,        // POST送信先のURL
        data: JSON.stringify(sendData),  // JSONデータ本体
        contentType: 'application/json', // リクエストの Content-Type
        dataType: "json",           // レスポンスをJSONとしてパースする
      })
      .done( (data) => {
        let res = JSON.stringify(data);
        alert(res);
      })
      .fail( (data) => {
        let res = JSON.stringify(data);
        alert(res);
      });
    }

    
  });

  /*
  function checkForm(){

    console.log('hey');

    let pass = $('#Password').val();
    let repass = $('#Repassword').val();

    if(pass != repass){
      $('#Repassword').addClass('is-invalid');
      return false;
    }
    else {
      $('#Repassword').addClass('is-valid');
      return true;
    }
  }
  */
});