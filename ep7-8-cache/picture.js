function makeImg(src){

  const imgEl = document.createElement('img');
  imgEl.src = src;
  imgEl.height = 400;

  return imgEl;

}


export function setupPicture(button, targetEl, img){

  button.addEventListener('click', (e) => {
    targetEl.innerHTML = '';
    targetEl.append(makeImg(img));
  });

}