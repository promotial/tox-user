cordova = new Cordova();

capturePhoto = function(id) {
  function onSuccess(imageData) {
    var image = document.getElementById(id);
    image.src = "data:image/jpeg;base64," + imageData;
  }

  function onFail(message) {
    setTimeout(function() {
      alert('Failed because: ' + message);
    }, 0);
  }

  cordova.call('navigator.camera.getPicture', [onSuccess, onFail,
    { quality: 40,
      targetWidth: 400,
      targetHeight: 400,
      saveToPhotoAlbum: false,
      destinationType: cordova.call('navigator.camera.DestinationType.DATA_URL'),
      sourceType: cordova.call('navigator.camera.PictureSourceType.CAMERA'),
      encodingType: cordova.call('navigator.camera.EncodingType.JPEG')
    }
  ]);
}