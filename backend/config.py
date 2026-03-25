import os

class Config:
    """Base configuration"""
    SECRET_KEY = os.environ.get('SECRET_KEY', 'stocksight-secret-key-change-in-production-2026')
    SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URL', 'sqlite:///stocksight.db')
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    JWT_EXPIRATION_HOURS = 24 * 7  # 7 days

    # Google OAuth2 Configuration
    # Replace with your actual Google Client ID from https://console.cloud.google.com/
    GOOGLE_CLIENT_ID = os.environ.get(
        'GOOGLE_CLIENT_ID',
        'YOUR_GOOGLE_CLIENT_ID.apps.googleusercontent.com'
    )
