import time
import re
from flask import Flask, render_template, jsonify, url_for, send_from_directory

app = Flask(__name__)

def read_ping_data():
    with open("ping.txt", "r") as file:
        lines = file.readlines()[-30:]  # Read the last 10 lines

        # Regular expression pattern to match the time value
        time_pattern = r'time=([\d.]+) ms'
        time_values = []

        for line in lines:
            try:
                match = re.search(time_pattern, line)
                if match:
                    time_value = float(match.group(1))
                    time_values.append(time_value)
                else:
                    time_values.append(None)  # Add null if no match (timeout)
            except:
                time_values.append(None)  # Add null if an exception occurs

        return time_values

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/ping_data')
def ping_data():
    data = read_ping_data()
    return jsonify(data)

@app.route('/js/<path:filename>')
def serve_js(filename):
    return send_from_directory('static/js', filename)

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')

