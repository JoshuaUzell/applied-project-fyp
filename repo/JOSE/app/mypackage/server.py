from flask import Flask, jsonify, render_template_string, request

app = Flask(__name__)

# Example string variable to represent the profile description
profile_description = "Default profile description."

@app.route('/')
def serve_frontend():
    # Serve your frontend files (e.g., index.html, CSS, JavaScript)
    global profile_description
    # Render a simple HTML template with the profile description
    html_template = f"<h1>Profile Description:</h1><p>{profile_description}</p>"
    return render_template_string(html_template)

# Example route to handle a GET request
@app.route('/api/get_data', methods=['GET'])
def get_data():
    # Fetch data from the database and return as JSON
    data = {'example_data': 'Hello, world!'}
    return jsonify(data)

# Route to handle updating the profile description
@app.route('/api/update_profile_description', methods=['POST'])
def update_profile_description():
    global profile_description  # Access the global string variable
    request_data = request.get_json()

    # Update the profile description with the new value from the frontend
    new_description = request_data.get('description')
    if new_description:
        profile_description = new_description
        return jsonify({'message': 'Profile description updated successfully'})
    else:
        return jsonify({'error': 'Invalid request. Provide a valid description.'}), 400

# Route to retrieve the current profile description
@app.route('/api/get_profile_description', methods=['GET'])
def get_profile_description():
    global profile_description
    return jsonify({'profile_description': profile_description})

if __name__ == '__main__':
    app.run(debug=True)
