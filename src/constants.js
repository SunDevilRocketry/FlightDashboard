/**
 * Summary. (use period)
 *
 * Description. (use period)
 *
 * @link   URL
 * @file   This file defines app constants.
 * @author Christian Thompson
 * @since  1.0.0
 */
const path = require('path')

// global constants
const TOP_DIR = '.'
const SRC_DIR = path.join(TOP_DIR, 'src')
const STATIC_DIR = path.join(TOP_DIR, 'static')
const HTML_DIR = path.join(SRC_DIR, 'html')

// python server constants
const PY_DIST_FOLDER = "dist-python"
const PY_SRC_FOLDER = "src-flask-server"
const PY_MODULE = "api.py"
const PY_SOURCE = 'venv/Scripts/python.exe'

// main window constants
const WINDOW_ICON = 'SDRLogo5.png'
const MENU_TEMPLATE = [
    {
        label: 'View',
        submenu: [
            { role: 'reload' },
            { role: 'forceReload' },
            { role: 'toggleDevTools' },
            { type: 'separator' },
            { role: 'resetZoom' },
            { role: 'zoomIn' },
            { role: 'zoomOut' },
            { type: 'separator' },
            { role: 'togglefullscreen' }
        ]
    },
    {
        label: 'Window',
        submenu: [
            { role: 'minimize' },
            { role: 'close' }
        ]
    }
]
const PRELOAD_FILE = 'preload.js'

// index.js constants
const INDEX_HTML = 'index.html'

// export global constants
exports.TOP_DIR = TOP_DIR
exports.SRC_DIR = SRC_DIR
exports.STATIC_DIR = STATIC_DIR
exports.HTML_DIR = HTML_DIR

// export python file constants
exports.PY_DIST_FOLDER = PY_DIST_FOLDER
exports.PY_SRC_FOLDER = PY_SRC_FOLDER
exports.PY_MODULE = PY_MODULE
exports.PY_EXE = PY_MODULE.slice(0, -3) + ".exe"
exports.PY_SOURCE = path.join(TOP_DIR, PY_SOURCE)

// export main window constants
exports.CSS_DIR = path.join(STATIC_DIR, 'css')
exports.ICON_DIR = path.join(STATIC_DIR, 'icons')
exports.IMAGE_DIR = path.join(STATIC_DIR, 'images')
exports.JS_DIR = path.join(STATIC_DIR, 'js')
exports.WINDOW_ICON = path.join(STATIC_DIR, 'images', WINDOW_ICON)
exports.MENU_TEMPLATE = MENU_TEMPLATE
exports.PRELOAD_FILE = PRELOAD_FILE
exports.PRELOAD_PATH = path.join(SRC_DIR, PRELOAD_FILE)

// export index.js constants
exports.INDEX_HTML = path.join(HTML_DIR, INDEX_HTML)
