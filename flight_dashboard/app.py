import json
import math
import random
from datetime import datetime

import eel
import numpy as np

eel.init('web')

@eel.expose
def get_random_name():
    eel.prompt_alerts('Random name')

@eel.expose
def get_random_number():
    eel.prompt_alerts(random.randint(1, 100))

@eel.expose
def get_date():
    eel.prompt_alerts(datetime.now().strftime("%d/%m/%Y %H:%M:%S"))

@eel.expose
def get_ip():
    eel.prompt_alerts('127.0.0.1')

seed = 0

def speed_function(x):
    return 100*(math.sin(math.pi*x/10)**2)

@eel.expose
def get_gauge_data():
    global seed
    data = {f"speed{i}": speed_function(seed + i) for i in range(1, 9)}
    seed += 0.05
    return json.dumps(data)


@eel.expose
def get_chart_data():
    global seed
    return json.dumps({
        'value': speed_function(seed),
        'label': round(seed,2),
    })

eel.start('templates/dash.html', jinja_templates='templates')
