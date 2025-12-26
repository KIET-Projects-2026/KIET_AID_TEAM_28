from flask import Flask, request, jsonify
from flask_cors import CORS
from pymongo import MongoClient
import logging
from datetime import datetime
from werkzeug.security import generate_password_hash, check_password_hash

# Alternative translation import
try:
    from googletrans import Translator
except ImportError:
    print("Warning: googletrans not installed. Install with: pip install googletrans==4.0.0rc1")
    Translator = None

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Initialize translator
translator = Translator() if Translator else None

# MongoDB Configuration
MONGO_URI = "mongodb://localhost:27017/"  # Change this to your MongoDB URI
client = MongoClient(MONGO_URI)
db = client['translatete_db']  # Database name
users_collection = db['users']
history_collection = db['history']

# Create indexes for better performance
users_collection.create_index("email", unique=True)
history_collection.create_index("email")

@app.route('/api/register', methods=['POST'])
def register():
    """Register a new user"""
    try:
        data = request.get_json()
        name = data.get('name')
        email = data.get('email')
        phone = data.get('phone', '')
        password = data.get('password')
        
        if not all([name, email, password]):
            return jsonify({
                'success': False,
                'error': 'Missing required fields'
            }), 400
        
        # Check if user already exists
        if users_collection.find_one({'email': email}):
            return jsonify({
                'success': False,
                'error': 'Email already registered'
            }), 400
        
        # Hash password for security
        hashed_password = generate_password_hash(password)
        
        # Create user document
        user_doc = {
            'name': name,
            'email': email,
            'phone': phone,
            'password': hashed_password,
            'bio': '',
            'avatar': '😊',
            'created_at': datetime.utcnow(),
            'updated_at': datetime.utcnow()
        }
        
        # Insert user into database
        result = users_collection.insert_one(user_doc)
        
        logger.info(f"New user registered: {email}")
        
        return jsonify({
            'success': True,
            'message': 'Registration successful',
            'user': {
                'name': name,
                'email': email,
                'phone': phone,
                'bio': '',
                'avatar': '😊'
            }
        }), 201
        
    except Exception as e:
        logger.error(f"Registration error: {str(e)}")
        return jsonify({
            'success': False,
            'error': 'Registration failed'
        }), 500

@app.route('/api/login', methods=['POST'])
def login():
    """Login user"""
    try:
        data = request.get_json()
        email = data.get('email')
        password = data.get('password')
        
        if not all([email, password]):
            return jsonify({
                'success': False,
                'error': 'Missing credentials'
            }), 400
        
        # Find user in database
        user = users_collection.find_one({'email': email})
        
        if not user or not check_password_hash(user['password'], password):
            return jsonify({
                'success': False,
                'error': 'Invalid credentials'
            }), 401
        
        logger.info(f"User logged in: {email}")
        
        return jsonify({
            'success': True,
            'message': 'Login successful',
            'user': {
                'name': user['name'],
                'email': user['email'],
                'phone': user.get('phone', ''),
                'bio': user.get('bio', ''),
                'avatar': user.get('avatar', '😊')
            }
        }), 200
        
    except Exception as e:
        logger.error(f"Login error: {str(e)}")
        return jsonify({
            'success': False,
            'error': 'Login failed'
        }), 500

@app.route('/api/user/<email>', methods=['GET'])
def get_user_profile(email):
    """Get user profile information"""
    try:
        user = users_collection.find_one({'email': email}, {'password': 0})
        
        if not user:
            return jsonify({
                'success': False,
                'error': 'User not found'
            }), 404
        
        # Convert ObjectId to string
        user['_id'] = str(user['_id'])
        
        return jsonify({
            'success': True,
            'user': {
                'name': user['name'],
                'email': user['email'],
                'phone': user.get('phone', ''),
                'bio': user.get('bio', ''),
                'avatar': user.get('avatar', '😊'),
                'created_at': user.get('created_at')
            }
        }), 200
        
    except Exception as e:
        logger.error(f"Get user profile error: {str(e)}")
        return jsonify({
            'success': False,
            'error': 'Failed to retrieve user profile'
        }), 500

@app.route('/api/user/<email>', methods=['PUT'])
def update_user_profile(email):
    """Update user profile information"""
    try:
        data = request.get_json()
        
        # Fields that can be updated
        update_fields = {}
        
        if 'name' in data:
            update_fields['name'] = data['name']
        if 'phone' in data:
            update_fields['phone'] = data['phone']
        if 'bio' in data:
            update_fields['bio'] = data['bio']
        if 'avatar' in data:
            update_fields['avatar'] = data['avatar']
        
        # Add updated timestamp
        update_fields['updated_at'] = datetime.utcnow()
        
        # Update user in database
        result = users_collection.update_one(
            {'email': email},
            {'$set': update_fields}
        )
        
        if result.matched_count == 0:
            return jsonify({
                'success': False,
                'error': 'User not found'
            }), 404
        
        # Get updated user
        updated_user = users_collection.find_one({'email': email}, {'password': 0})
        
        logger.info(f"User profile updated: {email}")
        
        return jsonify({
            'success': True,
            'message': 'Profile updated successfully',
            'user': {
                'name': updated_user['name'],
                'email': updated_user['email'],
                'phone': updated_user.get('phone', ''),
                'bio': updated_user.get('bio', ''),
                'avatar': updated_user.get('avatar', '😊')
            }
        }), 200
        
    except Exception as e:
        logger.error(f"Update user profile error: {str(e)}")
        return jsonify({
            'success': False,
            'error': 'Failed to update user profile'
        }), 500

@app.route('/api/translate', methods=['POST'])
def translate():
    """Translate Telugu text to English"""
    try:
        if not translator:
            return jsonify({
                'success': False,
                'error': 'Translation service not available. Please install googletrans.'
            }), 503
            
        data = request.get_json()
        text = data.get('text', '').strip()
        
        if not text:
            return jsonify({
                'success': False,
                'error': 'No text provided'
            }), 400
        
        logger.info(f"Translation request: {text[:50]}...")
        
        # Translate from Telugu to English
        result = translator.translate(text, src='te', dest='en')
        translation = result.text
        
        logger.info(f"Translation successful: {translation[:50]}...")
        
        return jsonify({
            'success': True,
            'translation': translation,
            'source_language': 'Telugu',
            'target_language': 'English'
        }), 200
        
    except Exception as e:
        logger.error(f"Translation error: {str(e)}")
        return jsonify({
            'success': False,
            'error': f'Translation failed: {str(e)}'
        }), 500

@app.route('/api/history', methods=['POST'])
def add_to_history():
    """Add translation to user's history"""
    try:
        data = request.get_json()
        email = data.get('email')
        entry = data.get('entry')
        
        if not email or not entry:
            return jsonify({
                'success': False,
                'error': 'Missing required fields'
            }), 400
        
        # Create history document
        history_doc = {
            'email': email,
            'original_text': entry.get('original'),
            'translated_text': entry.get('translation'),
            'source_language': entry.get('source_language', 'Telugu'),
            'target_language': entry.get('target_language', 'English'),
            'timestamp': datetime.utcnow()
        }
        
        # Insert into history collection
        history_collection.insert_one(history_doc)
        
        logger.info(f"History entry added for user: {email}")
        
        return jsonify({
            'success': True,
            'message': 'Added to history'
        }), 200
        
    except Exception as e:
        logger.error(f"History error: {str(e)}")
        return jsonify({
            'success': False,
            'error': 'Failed to add to history'
        }), 500

@app.route('/api/history/<email>', methods=['GET'])
def get_history(email):
    """Get user's translation history"""
    try:
        # Find all history entries for user, sorted by most recent
        history = list(history_collection.find(
            {'email': email},
            {'_id': 0}  # Exclude MongoDB _id field
        ).sort('timestamp', -1).limit(100))  # Limit to last 100 entries
        
        return jsonify({
            'success': True,
            'history': history
        }), 200
        
    except Exception as e:
        logger.error(f"Get history error: {str(e)}")
        return jsonify({
            'success': False,
            'error': 'Failed to retrieve history'
        }), 500

@app.route('/api/history/<email>', methods=['DELETE'])
def clear_history(email):
    """Clear user's translation history"""
    try:
        result = history_collection.delete_many({'email': email})
        
        logger.info(f"History cleared for user: {email}, deleted {result.deleted_count} entries")
        
        return jsonify({
            'success': True,
            'message': f'Cleared {result.deleted_count} history entries'
        }), 200
        
    except Exception as e:
        logger.error(f"Clear history error: {str(e)}")
        return jsonify({
            'success': False,
            'error': 'Failed to clear history'
        }), 500

@app.route('/', methods=['GET'])
def home():
    """Root endpoint - API information"""
    return jsonify({
        'message': 'TranslateTe API Server',
        'version': '1.0.0',
        'status': 'running',
        'database': 'MongoDB',
        'endpoints': {
            'POST /api/register': 'Register new user',
            'POST /api/login': 'Login user',
            'GET /api/user/<email>': 'Get user profile',
            'PUT /api/user/<email>': 'Update user profile',
            'POST /api/translate': 'Translate Telugu to English',
            'POST /api/history': 'Add translation to history',
            'GET /api/history/<email>': 'Get user history',
            'DELETE /api/history/<email>': 'Clear user history',
            'GET /api/health': 'Health check'
        }
    }), 200

@app.route('/api/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    try:
        # Check MongoDB connection
        client.admin.command('ping')
        db_status = 'MongoDB connected'
        translator_status = 'Available' if translator else 'Not installed'
        
        return jsonify({
            'status': 'healthy',
            'message': 'Flask backend is running',
            'database': db_status,
            'translator': translator_status
        }), 200
    except Exception as e:
        return jsonify({
            'status': 'unhealthy',
            'message': 'Database connection failed',
            'error': str(e)
        }), 500

if __name__ == '__main__':
    print("=" * 60)
    print("TranslateTe Flask Backend Server with MongoDB")
    print("=" * 60)
    print("Server running on: http://localhost:5000")
    print("Database: MongoDB")
    print("Available endpoints:")
    print("  POST   /api/register          - Register new user")
    print("  POST   /api/login             - Login user")
    print("  GET    /api/user/<email>      - Get user profile")
    print("  PUT    /api/user/<email>      - Update user profile")
    print("  POST   /api/translate         - Translate text")
    print("  POST   /api/history           - Add to history")
    print("  GET    /api/history/<email>   - Get history")
    print("  DELETE /api/history/<email>   - Clear history")
    print("  GET    /api/health            - Health check")
    print("=" * 60)
    
    app.run(debug=True, host='0.0.0.0', port=5000)