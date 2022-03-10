// import style from '../styles/style.css' assert { type: 'css' }

import mainMenu from '../components/shared/header/main-menu/main-menu.js'
import cookieLayer from '../components/shared/cookie_layer/cookie_layer.js'
import gotoTop from '../components/shared/goto_top/goto_top.js'
import home from '../views/index.js'

// document.adoptedStyleSheets = [style]
mainMenu.toggleMobileMenu()
cookieLayer.init()
gotoTop.init()
home.init()
