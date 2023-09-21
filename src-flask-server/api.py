from flask import Flask
from datetime import datetime

app = Flask(__name__)

@app.route('/api')
def get_time():
    return datetime.now().isoformat()

if __name__ == '__main__':
    app.run(debug=True, port=5000)
