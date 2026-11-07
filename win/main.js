const {app,BrowserWindow,shell,Menu,session}=require('electron');const path=require('path');
const SRV=/^https:\/\/([a-z0-9-]+\.)*generated\.biz\.ua\//i;
function create(){
  const ses=session.defaultSession;
  ses.webRequest.onBeforeSendHeaders({urls:['https://*.generated.biz.ua/*','https://generated.biz.ua/*']},(d,cb)=>{const h=d.requestHeaders;h['Origin']='https://generated.biz.ua';h['Referer']='https://generated.biz.ua/hutir/';cb({requestHeaders:h})});
  ses.webRequest.onHeadersReceived({urls:['https://*.generated.biz.ua/*','https://generated.biz.ua/*']},(d,cb)=>{const h={};for(const k in d.responseHeaders){if(!/^access-control-/i.test(k))h[k]=d.responseHeaders[k]}
    h['Access-Control-Allow-Origin']=['*'];h['Access-Control-Allow-Headers']=['Authorization, Content-Type, X-Meta, X-Enc'];h['Access-Control-Allow-Methods']=['GET, POST, PUT, DELETE, OPTIONS'];h['Access-Control-Expose-Headers']=['X-Enc, X-Meta'];
    const r={responseHeaders:h};if(d.method==='OPTIONS')r.statusLine='HTTP/1.1 200 OK';cb(r)});
  const w=new BrowserWindow({width:1400,height:900,minWidth:800,minHeight:560,backgroundColor:'#12110d',title:'Хутір',icon:path.join(__dirname,'www','icons','icon-512.png'),autoHideMenuBar:true,webPreferences:{contextIsolation:true,webSecurity:false}});
  Menu.setApplicationMenu(null);w.loadFile(path.join(__dirname,'www','index.html'));
  w.webContents.setWindowOpenHandler(({url})=>{if(/^https?:|^tg:/.test(url))shell.openExternal(url);return{action:'deny'}});
  w.webContents.on('will-navigate',(e,url)=>{if(/^https?:|^tg:/.test(url)){e.preventDefault();shell.openExternal(url)}});
  w.webContents.on('before-input-event',(e,i)=>{if(i.type==='keyDown'&&i.key==='F11'){w.setFullScreen(!w.isFullScreen());e.preventDefault()}if(i.type==='keyDown'&&i.key==='F12'&&i.control){w.webContents.toggleDevTools()}})}
app.whenReady().then(create);app.on('window-all-closed',()=>app.quit());
