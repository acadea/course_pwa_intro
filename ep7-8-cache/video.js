function makeVideo(src){
  const videoEl = document.createElement('video');
  videoEl.loop = true;
  videoEl.height = 400;
  videoEl.setAttribute('controls', false);
  videoEl.autoplay = true;

  const source = document.createElement('source');

  source.src = src;
  videoEl.append(source);

  return videoEl;

}

export function setupVideo(button, targetEl, video){

  button.addEventListener('click', (e) => {
    targetEl.innerHTML = '';
    targetEl.append(makeVideo(video));
  })

}