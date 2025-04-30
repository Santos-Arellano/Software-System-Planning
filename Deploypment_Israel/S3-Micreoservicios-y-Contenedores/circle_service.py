from flask import Flask, request, jsonify
import math

app = Flask(__name__)

@app.route('/area/circle', methods=['POST'])
def calculate_area():
    try:
        data = request.get_json()
        if not data or 'radius' not in data:
            return jsonify({'error': 'Missing radius parameter'}), 400
        
        radius = float(data['radius'])
        
        if radius <= 0:
            return jsonify({'error': 'Radius must be a positive number'}), 400
            
        area = math.pi * radius * radius
        return jsonify({
            'shape': 'circle',
            'radius': radius,
            'area': area
        })
    except ValueError:
        return jsonify({'error': 'Invalid numeric value'}), 400
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5003)