
(function() {

  const serverUrl = 'http://127.0.0.1:3000';

  //
  // TODO: build the swim command fetcher here - GET REQUEST
  const ajaxGetCommand = () => {
    // console.log('testing function')
    $.ajax({
      type: 'GET',
      url: serverUrl,
      success: (data) => {
        console.log('WHY IS THIS ' , data)
        SwimTeam.move(data);
      }
    })
  }
  
  $('.btn').click(function() {
    ajaxGetCommand();
  })

  /////////////////////////////////////////////////////////////////////
  // The ajax file uplaoder is provided for your convenience!
  // Note: remember to fix the URL below.
  /////////////////////////////////////////////////////////////////////

  const ajaxFileUplaod = (file) => {
    var formData = new FormData();
    formData.append('file', file);
    var newfile = formData.get('file')
    // console.log('FormData...', file)
    $.ajax({
      type: 'POST',
      data: formData,
      url: 'http://127.0.0.1:3000/background',
      cache: false,
      contentType: false,
      processData: false,
      success: (data) => {
        $.ajax({
          type: 'GET',
          url: 'http://127.0.0.1:3000/background',
          success: (data) => {
            console.log(data)
            //change background image once get request is successful
            // $('body').css('background-image', `url(https://previews.123rf.com/images/naumoid/naumoid1005/naumoid100500058/7066588-water-ripples-at-swimming-pool-background.jpg)`); 
            // window.location = window.location.href;
          }
        })
        console.log('nicee hi', data)
      }
    });
  };

  $('form').on('submit', function(e) {
    e.preventDefault();

    var form = $('form .file')[0];
    if (form.files.length === 0) {
      console.log('No file selected!');
      return;
    }

    var file = form.files[0];
    if (file.type !== 'image/jpeg') {
      console.log('Not a jpg file!');
      return;
    }

    ajaxFileUplaod(file);
  });

})();

console.log('testing outside file')