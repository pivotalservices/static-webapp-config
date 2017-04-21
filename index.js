var req = new XMLHttpRequest()
req.open('GET', '/config.json', true)

req.onload = function () {
  if (req.status >= 200 && req.status < 400) {
    try {
      var config = JSON.parse(req.responseText)
      var el = document.querySelector('.placeholder')
      if (el) {
        el.textContent = JSON.stringify(config, null, 4)
      }
    } catch (e) {
      var el = document.querySelector('.placeholder')
      if (el) {
        el.textContent = ':-( Got invalid JSON'
      }
    }
  }
}

req.onerror = function () {
  var el = document.querySelector('.placeholder')
  if (el) {
    el.textContent = ':-( Could not get config'
  }
}

req.send()
