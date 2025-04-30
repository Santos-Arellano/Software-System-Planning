from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route('/area/square', methods=['POST'])
def calculate_area():
    try:
        data = request.get_json()
        if not data or 'side' not in data:
            return jsonify({'error': 'Missing side parameter'}), 400
        
        side = float(data['side'])
        
        if side <= 0:
            return jsonify({'error': 'Side must be a positive number'}), 400
            
        area = side * side
        return jsonify({
            'shape': 'square',
            'side': side,
            'area': area
        })
    except ValueError:
        return jsonify({'error': 'Invalid numeric value'}), 400
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5002)