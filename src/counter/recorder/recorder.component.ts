
/// /// <reference path="WebAudio.d.ts" />

import { CacheFileSystem } from './filesystem.component';
import { encoderworker } from './encoder.worker';

window.requestFileSystem = window.requestFileSystem || window.webkitRequestFileSystem;
window.URL = window.URL || window.webkitURL;
window.BlobBuilder = window.BlobBuilder || window.WebKitBlobBuilder || window.MozBlobBuilder;

export interface Config {
    command?: string;
    bufferLength?: number;
    monitorGain?: number;
    numberOfChannels?: number;
    originalSampleRate?: number;
    encoderSampleRate?: any;
    encoderPath?: string;
    leaveStreamOpen?: boolean;
    maxBuffersPerPage?: number;
    encoderApplication?: number;
    encoderFrameSize?: number;
    resampleQuality?: number;
    streamOptions?: any;
    bitRate?: number;
}

export class Recorder {
    config: Config;
    state: string;
    audioContext: AudioContext;
    monitorNode: GainNode;
    scriptProcessorNode: ScriptProcessorNode;
    stream?: MediaStream;
    sourceNode?: MediaStreamAudioSourceNode;
    encoder?: Worker;
    sessionID: string;
    cache: CacheFileSystem;
    whenStop?: Function;
    outputData?: Uint8Array;

    constructor(config: Config) {
        this.audioContext = new AudioContext();
        this.config = config || {};
        this.config.command = "init";
        this.config.bitRate = config.bitRate || 64000;
        this.config.bufferLength = config.bufferLength || 4096;
        this.config.monitorGain = config.monitorGain || 0;
        this.config.numberOfChannels = config.numberOfChannels || 1;
        this.config.originalSampleRate = this.audioContext.sampleRate;
        this.config.encoderSampleRate = config.encoderSampleRate || 48000;
        this.config.encoderPath = config.encoderPath || 'encoderWorker.min.js';
        this.config.leaveStreamOpen = config.leaveStreamOpen || false;
        this.config.maxBuffersPerPage = config.maxBuffersPerPage || 40;
        this.config.encoderApplication = config.encoderApplication || 2049;
        this.config.encoderFrameSize = config.encoderFrameSize || 20;
        this.config.resampleQuality = config.resampleQuality || 3;
        this.config.streamOptions = config.streamOptions || {
            optional: [],
            mandatory: {
                googEchoCancellation: false,
                googAutoGainControl: false,
                googNoiseSuppression: false,
                googHighpassFilter: false
            }
        };

        this.state = "inactive";
        this.monitorNode = this.audioContext.createGain();
        this.monitorNode.gain.value = this.config.monitorGain;
        this.scriptProcessorNode = this.audioContext.createScriptProcessor(this.config.bufferLength, this.config.numberOfChannels, this.config.numberOfChannels);
        this.scriptProcessorNode.onaudioprocess = (e) => {
            this.encodeBuffers(e.inputBuffer);
        };
        this.outputData = new Uint8Array(0);
        this.cache = new CacheFileSystem();

        // "Server response", used in all examples

        this.initStream()
    }

    static isRecordingSupported() {
        return navigator.getUserMedia;
    }

    clearStream() {
        if (this.stream) {
            if (this.stream.getTracks) {
                this.stream.getTracks().forEach(function (track) {
                    track.stop();
                });
            }
            else {
                this.stream.stop();
            }
            delete this.stream;
        }
    }

    initStream() {
        if (this.stream) {
            return;
        }
        var that = this;
        navigator.getUserMedia(
            { audio: this.config.streamOptions },
            (stream) => {
                that.stream = stream;
                that.sourceNode = that.audioContext.createMediaStreamSource(stream);
                that.sourceNode.connect(that.scriptProcessorNode);
                that.sourceNode.connect(that.monitorNode);
                console.log("streamReady")
            },
            function (e) {
                console.log("streamError")
            }
        );
    }

    encodeBuffers(inputBuffer) {
        if (this.state === "recording") {
            var buffers = [];
            for (var i = 0; i < inputBuffer.numberOfChannels; i++) {
                buffers[i] = inputBuffer.getChannelData(i);
            }
            this.encoder.postMessage({
                command: "encode",
                buffers: buffers
            });
        }
    }

    _appendBuffer(buffer1, buffer2) {
        var tmp = new Uint8Array(buffer1.length + buffer2.length);
        tmp.set(buffer1, 0);
        tmp.set(buffer2, buffer1.length);
        return tmp;
    }

    storePage(page) {
        this.outputData = this._appendBuffer(this.outputData, page);
        //write data to cache file system
        this.cache.write(this.outputData, 'audio/ogg')
        // Stream is finished
        if (page[5] & 4) {
            if (this.whenStop) {
                this.whenStop(this.sessionID, this.outputData);
            }
            console.log('Ket thuc phien giao dich')
        }
    }

    pause() {
        if (this.state === "recording") {
            this.state = "paused";
        }
    }

    resume() {
        if (this.state === "paused") {
            this.state = "recording";
        }
    }

    start(sessionID: any, whenStop?: (filename: string, data: any) => void) {
        this.whenStop = whenStop;
        if (this.state === "inactive" && this.stream) {
            var that = this;
            console.log(sessionID)
            this.encoder = new Worker(this.config.encoderPath);
            this.outputData = new Uint8Array(0);
            this.encoder.addEventListener("message", function (e) {
                that.storePage(e.data);
            });

            // First buffer can contain old data. Don't encode it.
            this.encodeBuffers = function () {
                delete that.encodeBuffers;
            };

            this.state = "recording";
            this.monitorNode.connect(this.audioContext.destination);
            this.scriptProcessorNode.connect(this.audioContext.destination);
            this.encoder.postMessage(this.config);
            this.cache.setFileName(sessionID)
        }
    }

    stop() {
        if (this.state !== "inactive") {
            this.state = "inactive";
            this.monitorNode.disconnect();
            this.scriptProcessorNode.disconnect();

            if (!this.config.leaveStreamOpen) {
                this.clearStream();
            }
            this.encoder.postMessage({ command: "done" });
        }
    }
}