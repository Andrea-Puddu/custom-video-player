"use strict";

// https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Client-side_web_APIs/Video_and_audio_APIs

const video = document.getElementById("video");
const btnPlay = document.getElementById("play");
const btnStop = document.getElementById("stop");
const progress = document.getElementById("progress");
const timestamp = document.getElementById("timestamp");

// Play and pause video
const toggleVideoStatus = function () {
  // video API available on video html element
  video.paused ? video.play() : video.pause();
};

// Update play/pause icon
const updatePlayIcon = function () {
  video.paused
    ? (btnPlay.innerHTML = `<i class="fa fa-play fa-2x"></i>`)
    : (btnPlay.innerHTML = `<i class="fa fa-pause fa-2x"></i> `);
};

// Update progress and timestamp
const updateProgress = function () {
  progress.value = (video.currentTime / video.duration) * 100;

  // get minutes
  let mins = Math.floor(video.currentTime / 60);
  if (mins < 10) {
    mins = "0" + String(mins);
  }

  // get seconds
  let secs = Math.floor(video.currentTime % 60);
  if (secs < 10) {
    secs = "0" + String(secs);
  }

  // render timestamp
  timestamp.innerHTML = `${mins}:${secs}`;
};

// Set video time to progress
const setVideoProgress = function () {
  video.currentTime = (progress.value * video.duration) / 100;
};

// Stop video
const stopVideo = function () {
  video.currentTime = 0;
  video.pause();
};

// Event Listeners
video.addEventListener("click", toggleVideoStatus);
video.addEventListener("pause", updatePlayIcon);
video.addEventListener("play", updatePlayIcon);
video.addEventListener("timeupdate", updateProgress);
btnPlay.addEventListener("click", toggleVideoStatus);
btnStop.addEventListener("click", stopVideo);
progress.addEventListener("change", setVideoProgress);

// additional " " key event to toggle video status
document.addEventListener("keyup", function (e) {
  if (e.key === " ") {
    e.preventDefault();
    toggleVideoStatus();
  }
});
