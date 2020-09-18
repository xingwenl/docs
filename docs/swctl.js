(function (w) {
  function registerSW(path = '/sw.js') {
    if ("serviceWorker" in navigator) {
        navigator.serviceWorker.register(path).then((registration) => {
            console.log("Registered events at scope: ", registration.scope);
        });
    }
    if ("serviceWorker" in navigator) {
        navigator.serviceWorker.addEventListener('controllerchange', () => {
            createReloadBtn()
            console.log(' %c 网站需要更新html', 'color: green;');
        });
    }
  }
  w.registerSW = registerSW;
  function createReloadBtn() {
    const style =  `position: fixed;
    box-shadow: 0 0 10px rgb(11 135 218);
    min-width: 220px;
    bottom: 100px;
    text-align: center;
    right: 10px;
    border-radius: 5px;
    cursor: pointer;
    background-color: #fff;
    line-height: 50px;`
    const button = `
        <div class="sw-pop" style="${style}">
            <a style="color: #0b87da" href="javascript:location.reload();">有新内容啦，点我刷新</a>
        </div>
    `
    const dom = document.createElement('div');
    dom.innerHTML = button;
    document.body.appendChild(dom)
    }
})(window);
