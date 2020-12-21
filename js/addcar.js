$(function(){

    // var carImageNum = 1;

    $("#carsubmit").on('click',function(){
        let exhibitionNumber = $('#ExhibitionNumber').val();
        let bodyNumber = $('#BodyNumber').val();
        let grade = $('#Grade').val();
        console.log(exhibitionNumber);
    });

    $('document').on('change', 'input[type="file"]', function(){
        let fileName = $('#InputFile').val();
        $('.custom-file-label').val(fileName);

        $('#CarImage')

        /*
        $('#CarImage').append(
            '<div class="input-group">',
            '<div class="custom-file">',
            '<input type="file" class="custom-file-input" id="InputFile">',
            '<label class="custom-file-label" for="InputFile">Choose file</label>',
            '</div>',
            '</div>'
        )
        */
    });
});