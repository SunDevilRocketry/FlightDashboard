const path = require('path')
const { PY_DIST_FOLDER, PY_SRC_FOLDER, PY_MODULE, PY_EXE } = require('../constants')
const { ChildProcess, execFile, spawn } = require('child_process')

const isRunningInBundle = () => {
    return require("fs").existsSync('dist-python')
}

const getServerPath = () => {
    if (!isRunningInBundle()) {
        return path.join('src-python', 'api.py')
    }
    if (process.platform === "win32") {
        return path.join('dist-python', 'api.exe')
    }
    return path.join('dist-python', 'api.py')
}

const createPyProc = (script) => {
    let pyProc = null
    console.log(script)
    if (isRunningInBundle()) {
        pyProc = spawn(script, [])
    } else {
        pyProc = spawn('python', [script])
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
