from flask import Flask
from flask_cors import CORS
import logging
import os
from config import Config
from models.user import db, bcrypt
from routes.stock_routes import stock_bp
from routes.auth_routes import auth_bp

# Configure logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    # Initialize extensions
    db.init_app(app)
    bcrypt.init_app(app)

    # Enable CORS for all routes (allow frontend origin)
    CORS(app, resources={r"/api/*": {"origins": ["http://localhost:5173", "http://127.0.0.1:5173"]}},
         supports_credentials=True)

    # Register blueprints
    app.register_blueprint(stock_bp, url_prefix='/api')
    app.register_blueprint(auth_bp, url_prefix='/api/auth')

    # Create database tables
    with app.app_context():
        db.create_all()
        logger.info("Database tables created/verified.")

    logger.info("Flask app setup complete. Registered blueprints: stock, auth.")
    return app

if __name__ == '__main__':
    app = create_app()
    app.run(debug=True, port=5000)
