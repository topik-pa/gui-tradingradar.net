// import '../styles/style.css'

import mainMenu from '../components/shared/header/main-menu/main-menu.js'
import cookieLayer from '../components/shared/cookie_layer/cookie_layer.js'
import gotoTop from '../components/shared/goto_top/goto_top.js'
import index from '../views/index.js'
import analisi from '../views/analisi/analisi.js'

mainMenu.toggleMobileMenu()
cookieLayer.init()
gotoTop.init()

if (document.querySelector('body#index')) {
  index.init()
}
if (document.querySelector('body#analisi')) {
  analisi.init()
}
