from sklearn.neural_network import MLPRegressor
import numpy as np
import logging

logger = logging.getLogger(__name__)

class MLPModelWrapper:
    """
    A wrapper for MLPRegressor that mimics Keras's fit/predict interface
    so it can be a drop-in replacement for LSTM when TensorFlow fails.
    """
    def __init__(self, input_shape):
        self.model = MLPRegressor(
            hidden_layer_sizes=(128, 64, 25),
            activation='relu',
            solver='adam',
            max_iter=100,
            random_state=42
        )
        self.input_shape = input_shape

    def fit(self, X_train, y_train, batch_size=32, epochs=5, verbose=0):
        # MLPRegressor expects 2D array, LSTM expects 3D (samples, time_steps, features)
        # We flatten the input sequence to use with MLP
        X_flat = X_train.reshape(X_train.shape[0], -1)
        self.model.fit(X_flat, y_train)

    def predict(self, X_test, verbose=0):
        X_flat = X_test.reshape(X_test.shape[0], -1)
        # Returns (samples,) but Keras returns (samples, 1)
        return self.model.predict(X_flat).reshape(-1, 1)

def build_lstm_model(input_shape=(60, 1)):
    """
    Falls back to scikit-learn's MLPRegressor because TensorFlow/Keras
    library dependencies (DLLs) are missing on this system.
    """
    logger.warning("TensorFlow/Keras dependencies missing. Falling back to Scikit-Learn MLP for LSTM model.")
    return MLPModelWrapper(input_shape)
