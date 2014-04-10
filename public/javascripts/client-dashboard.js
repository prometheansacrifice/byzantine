$(document).ready(function () {
    $(document).on('click', 'img.action', function () {
        userAction($(this));
    });

    $(document).on('click', '#back-to-menu', function () {
        renderUI('main');
    });

    // TODO - form validation - empty filenames must be handled
    $(document).on('submit', '#file-upload', function (e) {
        $(this).ajaxSubmit({
            target: '.user-alert',
            url: this.action,
            success:    function() { 
                
            }
        }); 
        return false; 
    });

    // $(document).on('submit', '#file-upload', function (e) {
    //     e.preventDefault();
    //     $.post(this.action, $(this).serialize())
    //         .done(function () {
    //             console.log('user-creation: form data submitted successfully');
    //             $('.user-alert').html('<div class="alert alert-success"> ' +
    //                                   'User successfully created</div>')
    //         })
    //         .fail(function () {
    //             $('.user-alert').html('<div class="alert alert-danger"> Error occured </div>')
    //             console.log('user-creation: error occured while form data' +
    //                   'submission');
    //         });

    //     return false;
    // });
    renderUI('main');
});

function userAction (selection) {

    // Styling
    $('img.action').each (function () {
        $(this).css('background-color', 'white');
    });
    selection.css('background-color', '#006dcc');

    // Issue request
    $.ajax({
        type: "POST",
        url: "/user-request",
        data: {
            reqType: selection.attr('id')
        }
    })
    .done(function( response ) {
        renderUI(selection.attr('id').substring(4));
        $('.user-alert').html('<div class="alert alert-success"> ' +
                                      'Operation allowed </div>')
    })
    .fail(function () {
        $('.user-alert').html('<div class="alert alert-danger"> ' +
                                      'Illegal operation</div>')
    });
}

function renderUI (userOp) {
    console.log(userOp);
    var template = $('#' + userOp +'-template').html();
    $('#client-workspace').html(template);
}