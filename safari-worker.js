onmessage = function(e) {
  console.log('Worker: Message received', e);
  console.log(navigator, navigator.storage, navigator.storage.getDirectory)
  navigator.storage.getDirectory().then(root => {
      root.getFileHandle('file.txt', { 'create': true }).then(f => {
        f.createSyncAccessHandle().then(h => {
          console.log("resolved sync handle")
          let wb = new TextEncoder().encode('lol ok');
          h.write(wb, {"at": 0});
          h.flush().then(() => {
            console.log("flushed handle")
            h.close().then(() => console.log('worker done'), (err) => console.log("close failed", err))
          }, (err) => console.log("flush failed", err))
        }, (err) => console.log("sync access failed", err))
      }, (err) => console.log("get file handle failed", err))
  })
}
