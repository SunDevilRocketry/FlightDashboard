import csv
import json
import math
import os
import random
from datetime import datetime

import eel
import numpy as np


class Application():
    def __init__(self):
        self.eel = eel

        # initialize fields
        self.folder = None
        self.fname = None
        self.seed = 0.0
        self.dformat = '%Y-%m-%d %H:%M:%S'

    def folder_select(self, search:str):
        expanded = os.path.expanduser(search)
        directory = os.path.dirname(expanded)
        if not os.path.exists(directory) or not os.path.isdir(directory):
            return []
        search_directory = '/'.join(search.split('/')[:-1])
        residual = search.split('/')[-1]
        return [
            search_directory + '/' + x.name + '/'
            for x in os.scandir(directory)
            if x.is_dir() and x.name.startswith(residual)
        ]

    def check_folder(self, path:str):
        expanded = os.path.expanduser(path)
        if not path:
            return {'invalid': "Please enter a valid directory."}
        if not os.path.exists(expanded):
            return {'invalid': "The selected folder does not exist!"}
        if not os.path.isdir(expanded):
            return {'invalid': "The selected folder is not a directory!"}
        return {'valid': path}

    def check_file(self, folder:str, fname:str):
        expanded = os.path.expanduser(folder)
        if not os.path.exists(expanded) or not os.path.isdir(expanded):
            return {'invalid': "The selected directory does not exist!"}
        if not fname:
            return {'invalid': "Please enter a file name."}
        if os.path.exists(os.path.join(expanded, fname + '.csv')):
            return {'invalid': "A file with the same name already exists in this directory!"}
        return {'valid': fname}

    def set_config(self, form_data):
        data = {f['name']: f['value'] for f in form_data}
        folder = data.get('folder')
        fname = data.get('fname')
        if fname:
            fname += '.csv'
        self.folder = folder
        self.fname = fname

    def get_data_file_path(self):
        if self.folder and self.fname:
            path = os.path.join(os.path.expanduser(self.folder), self.fname)
            return path.replace("\\", "/")
        return None

    def read_data(self):
        fpath = self.get_data_file_path()
        if not fpath:
            return []
        with open(fpath, 'r') as file:
            reader = csv.reader(file)
            data = [(datetime.isformat(datetime.fromtimestamp(int(row[0])/1000)), *row[1:]) for row in reader]
        return data

    def write_data(self, data):
        fpath = self.get_data_file_path()
        if not fpath:
            return False
        if not data:
            return True
        with open(fpath, 'a') as file:
            writer = csv.writer(file, lineterminator="\n")
            writer.writerows(data)
        return True

    def speed_function(self, x):
        return 100*(math.sin(math.pi*x/10)**2)

    def get_gauge_data(self):
        data = {f"speed{i}": self.speed_function(self.seed + i) for i in range(1, 9)}
        self.seed += 0.05
        return json.dumps(data)

    def get_chart_data(self):
        return json.dumps({
            'value': self.speed_function(self.seed),
            'label': round(self.seed, 2),
        })

    def _expose_methods(self, blacklist:list=["_expose_methods", "run"]):
        # expose class methods to eel
        test = lambda f: not f.startswith('__') and callable(getattr(self, f))
        methods = set(filter(test, dir(self)))
        methods -= set(blacklist)
        for m in methods:
            self.eel.expose(getattr(self, m))
        pass

    def run(self):
        # start eel
        self.eel.init('web')
        self._expose_methods()
        self.eel.start('templates/setup.html', jinja_templates='templates')


if __name__ == "__main__":
    app = Application()
    app.run()
