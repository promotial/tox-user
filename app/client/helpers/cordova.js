cordova = new Cordova();

capturePhoto = function (id) {
  function onSuccess(imageData) {
    var image = document.getElementById(id);
    image.src = "data:image/jpg;base64," + imageData;
  }

  function onFail(message) {
    setTimeout(function () {
      alert('Failed because: ' + message);
    }, 0);
  }

  cordova.call('navigator.camera.DestinationType', [], function (val) {
    cordova.call('navigator.camera.getPicture', [onSuccess, onFail,
      { quality: 40,
        targetWidth: 200,
        targetHeight: 200,
        saveToPhotoAlbum: false,
        destinationType: val.DATA_URL
      }
    ]);
  });
}