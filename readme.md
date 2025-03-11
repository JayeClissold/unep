# UNEP chat

This project is a simplified AI chat system for UNEP that integrates a Flask backend using the OpenAI API with a modular React frontend. The system maintains chat history across page reloads, clears the input after each submission, and allows submissions via the enter key. The solution is containerised with Docker for easy development and testing.

## Setup & Installation

1.  **Clone the Repository:**

```
git clone https://github.com/JayeClissold/unep.git
cd unep
```

2.  **Environment Variables:** Create a `.env` file in the project root (or set environment variables in your shell) with the following content:

    ```
    OPENAI_API_KEY=your_openai_api_key_here
    FLASK_SECRET_KEY=your_flask_secret_here
    REACT_APP_API_BASE_URL=http://localhost:5001
    ```

3.  **Run with Docker Compose:** From the root of the project, run:

    `docker-compose up --build`

    This command will build and start both the backend and frontend containers:

    - The backend will be accessible at `http://localhost:5001`
    - The React development server (with hot reloading) will be accessible at `http://localhost:3000`

## How to Use

1.  **Access the App:** Open your browser and navigate to [http://localhost:3000](http://localhost:3000).
2.  **Chat Functionality:**

    - **Send a Message:**  
      Type your message into the input field and either press Enter or click the **Send** button.
    - **Chat History:**  
      On page reload, the complete chat history is fetched from the backend and displayed.
    - **Clear Chat:**  
      Click the **Clear Chat** button to reset the chat history.

3.  **Backend API Endpoints:**

    - `POST /api/chat` – Submits a new chat message and returns the updated chat history.
    - `GET /api/history` – Retrieves the complete chat history (used on page reload).
    - `POST /api/clear` – Clears the chat history.

## Testing & Further Enhancements

- **Manual Testing:**  
  Use your browser or tools like Postman/curl to test the endpoints.
- **Unit/Integration Tests:**  
  No formal tests are included, but instructions to run them (if added) would be provided here.
- **Future Enhancements:**
  - Persist chat history in a database for multi-user support.
  - Add security on the endpoints with an API key
  - Add better error handling and logging.
  - Improve UI/UX with additional styling and accessibility features.
  - Setup CI/CD pipelines

### Notes

- I'm using port 5001 for API. Mac Airplay is now using port 5000 for some reason.
- The chat history is stored in the Flask session which uses cookies by default. Long conversations will exceed the cookie size limit so I'd recommend using Redis or a database for storage.
- For production, you would remove the Flask development environment settings
- Normally, I'd use Typescript so that the code is more self-documenting than this but I opted for Javascript for simplicity here. I've been a bit more verbose with commenting than I normally would because of this.
