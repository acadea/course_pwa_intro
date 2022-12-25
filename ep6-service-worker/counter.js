

export function setupCounter(element) {
  let counter = 0
  const setCounter = (count) => {
    counter = count
    element.innerHTML = `count is ${counter}`

    fetch('/abc123', {
      method: 'POST',
      body: JSON.stringify({
        work: 'hey',
      })
    })
  }
  element.addEventListener('click', () => setCounter(counter + 1))
  setCounter(0)
}
