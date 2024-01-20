from flask import Flask
from datetime import datetime
import json
import math

app = Flask(__name__)
seed = 0

@app.route('/api')
def get_time():
    return datetime.now().isoformat()

@app.route('/data')
def get_data():
    global seed
    data = {f"speed{i}": speed_function(seed + i) for i in range(1, 9)}
    seed += 0.05
    return json.dumps(data)

def speed_function(x):
    return 100*(math.sin(math.pi*x/10)**2)

if __name__ == '__main__':
    app.run(debug=False, port=5002, host='127.0.1.1')
