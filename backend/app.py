import os
import openai
from flask import Flask, request, jsonify, session
from flask_cors import CORS
import logging

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = Flask(__name__)
# Enable CORS for development URL
CORS(app, resources={r"/api/*": {"origins": "http://localhost:3000"}}, supports_credentials=True)
 # You'd need to ensure this is set so we don't end up using the default string
app.secret_key = os.getenv("FLASK_SECRET_KEY", "dev-secret-key")

# Validate and set the OpenAI API key.
# Retrieve the API key from an environment variable.
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
if not OPENAI_API_KEY:
    logger.error("OPENAI_API_KEY environment variable not set")
    # Raising an exception to prevent the application from running without a valid API key.
    raise RuntimeError("OPENAI_API_KEY environment variable not set")
openai.api_key = OPENAI_API_KEY
# Using a dictionary to make it easier to add more in the future
PERSONALITY_PROMPTS = {
    "moss": "Maurice Moss from The IT Crowd",
    "homer": "Homer Simpson from The Simpsons",
    "trump": "Donald Trump",
    "yoda": "Yoda from Star Wars",
    "drseuss": "Dr. Seuss",
}

def get_personality_prompt(personality):
    """
    Retrieve the system prompt for a given personality.

    Args:
        personality (str): The key for the desired personality.

    Returns:
        str: A formatted system prompt tailored to the specified personality,
             or an empty string if the personality is not found.
    """
    character = PERSONALITY_PROMPTS.get(personality)
    if not character:
        return ""
    return (
        f"I want you to respond and answer like {character} using the tone, manner and vocabulary {character} would use. "
        f"Do not write any explanations. Only answer like {character}. You must know all of the knowledge of {character}."
    )
@app.route("/api/chat", methods=["POST"])
def chat():
    """
    Handle chat interactions by processing user input and generating responses via OpenAI.

    Expects a JSON payload with:
      - message (str): The user's message.
      - personality (str, optional): A personality key (e.g., 'moss', 'homer', or 'trump').

    If the personality is provided and differs from the current session, the chat history is reset.
    The user's message is appended to the session history, then the OpenAI API is called to generate
    a response, which is also appended to the history.

    Returns:
        JSON: A response containing the message and the complete chat history,
              or an error message if an exception occurs.
    """
    data = request.get_json()
    user_message = data.get("message")
    personality = data.get("personality")
    if not user_message:
        return jsonify({"error": "Missing message"}), 400

    # Retrieve chat history from session (or start a new list)
    chat_history = session.get("chat_history", [])
    session_personality = session.get("personality")

    # If a personality is provided and it's different from the one stored, reinitialise the conversation.
    if personality:
        if personality != session_personality:
            # Personality has changed or not set yet: clear history and update session personality
            chat_history = []
            session["personality"] = personality
            system_prompt = get_personality_prompt(personality)
            if system_prompt:
                chat_history.append({"role": "system", "content": system_prompt})

    # Append the new user message
    chat_history.append({"role": "user", "content": user_message})

    try:
        # Call the OpenAI API with the updated chat history
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
        # Log the detailed error internally
        logger.exception("Error during OpenAI API call")
        # Return a generic error message to the client
        return jsonify({"error": "An internal error occurred"}), 500

@app.route("/api/clear", methods=["POST"])
def clear_chat():
    """
    Clear the chat history and personality from the session.

    Returns:
        JSON: A message confirming that the chat history has been cleared.
    """
    session["chat_history"] = []
    session.pop("personality", None)
    return jsonify({"message": "Chat history cleared."})

@app.route("/api/history", methods=["GET"])
def get_history():
    """
    Retrieve the complete chat history from the session.

    Returns:
        JSON: The chat history as stored in the session.
    """
    # Return complete chat history stored in session
    return jsonify({"history": session.get("chat_history", [])})

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
