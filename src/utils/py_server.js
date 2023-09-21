const path = require('path')
const { PY_DIST_FOLDER, PY_SRC_FOLDER, PY_MODULE, PY_EXE } = require('../constants')

const isRunningInBundle = () => {
    return require("fs").existsSync('../../dist-python')
}

const getServerPath = () => {
    if (!isRunningInBundle()) {
        return path.join(PY_SRC_FOLDER, PY_MODULE)
    }
    if (process.platform === "win32") {
        return path.join(PY_DIST_FOLDER, PY_EXE)
    }
    return path.join(PY_DIST_FOLDER, PY_MODULE)
}

const createPyProc = (script) => {
    let pyProc = null
    console.log(script)
    if (isRunningInBundle()) {
        pyProc = require("child_process").execFile(script, [])
    } else {
        pyProc = require("child_process").spawn('python', [script])
        if (pyProc != null) {
            // console.log(pyProc)
            console.log("Child process successfully started.")
        }
    }
    return pyProc
}

let serverProc = null

const startServer = () => {
    let script = getServerPath()
    serverProc = createPyProc(script)
}

const exitPyProc = (pyProc) => {
    pyProc.kill()
    pyProc = null
}

const killServer = () => {
    exitPyProc(serverProc)
}

exports.createPyProc = createPyProc
exports.startServer = startServer
exports.exitPyProc = exitPyProc
exports.killServer = killServer
