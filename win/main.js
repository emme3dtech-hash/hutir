const {app,BrowserWindow,shell,Menu}=require('electron');const path=require('path');
function create(){const w=new BrowserWindow({width:1400,height:900,minWidth:800,minHeight:560,backgroundColor:'#12110d',title:'Хутір',icon:path.join(__dirname,'www','icons','icon-512.png'),autoHideMenuBar:true,webPreferences:{contextIsolation:true,webSecurity:false}});
  Menu.setApplicationMenu(null);w.loadFile(path.join(__dirname,'www','index.html'));
  w.webContents.setWindowOpenHandler(({url})=>{if(/^https?:/.test(url))shell.openExternal(url);return{action:'deny'}});
  w.webContents.on('will-navigate',(e,url)=>{if(/^https?:/.test(url)){e.preventDefault();shell.openExternal(url)}});
  w.webContents.on('before-input-event',(e,i)=>{if(i.type==='keyDown'&&i.key==='F11'){w.setFullScreen(!w.isFullScreen());e.preventDefault()}if(i.type==='keyDown'&&i.key==='F12'&&i.control){w.webContents.toggleDevTools()}})}
app.whenReady().then(create);app.on('window-all-closed',()=>app.quit());
