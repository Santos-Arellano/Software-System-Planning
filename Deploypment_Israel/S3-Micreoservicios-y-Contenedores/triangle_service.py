from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route('/area/triangle', methods=['POST'])
def calculate_area():
    try:
        data = request.get_json()
        if not data or 'base' not in data or 'height' not in data:
            return jsonify({'error': 'Missing base or height parameters'}), 400
        
        base = float(data['base'])
        height = float(data['height'])
        
        if base <= 0 or height <= 0:
            return jsonify({'error': 'Base and height must be positive numbers'}), 400
            
        area = (base * height) / 2
        return jsonify({
            'shape': 'triangle',
            'base': base,
            'height': height,
            'area': area
        })
    except ValueError:
        return jsonify({'error': 'Invalid numeric values'}), 400
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5001)