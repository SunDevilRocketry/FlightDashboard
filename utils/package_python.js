// import packages
const path = require('node:path')
const { spawn } = require('child_process')

const PYTHON_DIR = "src-python"
const PYTHON_MAIN = "api.py"

ls = spawn(
    "pyinstaller", [
        "-w",
        "--onefile",
        "--distpath dist-python",
        path.join(PYTHON_DIR, PYTHON_MAIN)
    ],
    { shell: true }
)

ls.stdout.on("data", (data) => {
    console.log(data.toString())
})

ls.stderr.on("data", (data) => {
    console.log(data.toString())
})

ls.on("exit", (code) => {
    console.log("Child process exited with code " + code.toString())
})
