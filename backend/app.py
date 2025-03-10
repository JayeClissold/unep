import os
import openai
from flask import Flask, request, jsonify, session
from flask_cors import CORS

app = Flask(__name__)
# Enable CORS for development URL
# 
CORS(app, resources={r"/api/*": {"origins": "http://localhost:3000"}}, supports_credentials=True)  
app.secret_key = os.getenv("FLASK_SECRET_KEY", "dev-secret-key")

# Set OpenAI API key from environment variable
openai.api_key = os.getenv("OPENAI_API_KEY")

@app.route("/api/chat", methods=["POST"])
def chat():
    data = request.get_json()
    user_message = data.get("message")
    if not user_message:
        return jsonify({"error": "Missing message"}), 400

    # Retrieve chat history from session (or start a new list)
    chat_history = session.get("chat_history", [])
    # Append the new user message
    chat_history.append({"role": "user", "content": user_message})

    try:
        # Call the OpenAI API (using chat completions for contextual conversations)
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=chat_history
        )
        assistant_message = response["choices"][0]["message"]["content"]
        # Append the assistant response to chat history
        chat_history.append({"role": "assistant", "content": assistant_message})
        session["chat_history"] = chat_history  # Save updated history
        return jsonify({
            "response": assistant_message,
            "history": chat_history
        })
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route("/api/clear", methods=["POST"])
def clear_chat():
    session["chat_history"] = []
    return jsonify({"message": "Chat history cleared."})

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True) # Debug to enable auto-reload