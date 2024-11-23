from flask import Flask, jsonify

app = Flask(__name__)

# Sample data (array of objects)
data = [
    {"id": 1, "name": "John Doe", "age": 28},
    {"id": 2, "name": "Jane Smith", "age": 34},
    {"id": 3, "name": "Alice Johnson", "age": 25}
]

# Define a route to return the data
@app.route('/api/people', methods=['GET'])
def get_people():
    return jsonify(data)

# Run the app
if __name__ == '__main__':
    app.run(debug=True)
