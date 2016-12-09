/**
 * Created by intelWorx on 27/10/2015.
 */
(function () {
  'use strict';

  console.log('MP3 conversion worker started.');
  importScripts('../js/lame.min.js');

  var mp3Encoder, maxSamples = 1152, samplesMono, config;
  var fname;

  var init = (prefConfig) => {
    config = prefConfig || { debug: true };
    fname = prefConfig.sessionID;
    mp3Encoder = new lamejs.Mp3Encoder(1, config.sampleRate || 44100, config.bitRate || 123);
  };

  var floatTo16BitPCM = function floatTo16BitPCM(input, output) {
    //var offset = 0;
    for (var i = 0; i < input.length; i++) {
      var s = Math.max(-1, Math.min(1, input[i]));
      output[i] = (s < 0 ? s * 0x8000 : s * 0x7FFF);
    }
  };

  var convertBuffer = function (arrayBuffer) {
    var data = new Float32Array(arrayBuffer);
    var out = new Int16Array(arrayBuffer.length);
    floatTo16BitPCM(data, out)
    return out;
  };

  var tmpDataBuffer = [];
  var count = 0;
  var encode = (fname, arrayBuffer) => {
    samplesMono = convertBuffer(arrayBuffer);
    var remaining = samplesMono.length;
    for (var i = 0; remaining >= 0; i += maxSamples) {
      var left = samplesMono.subarray(i, i + maxSamples);
      var mp3buf = mp3Encoder.encodeBuffer(left);
      tmpDataBuffer.push(new Int8Array(mp3buf));
      remaining -= maxSamples;
    }
    count++;
    if (fname != null && count > 2) {
      var blob = new Blob(tmpDataBuffer, {type: 'audio/mp3'});
      sendRecordPage(fname, blob)
      count = 0;
      tmpDataBuffer = [];
    }
  };

  var sendRecordPage = function sendRecordPage(filename, data) {
    var xhr = new XMLHttpRequest();
    xhr.open('POST', config.host + filename, true);
    xhr.send(data);
  };

  self.onmessage = (e) => {
    switch (e.data.cmd) {
      case 'init':
        init(e.data.config);
        break;
      case 'encode':
        encode(e.data.fname, e.data.buf);
        break;
    }
  };

})();