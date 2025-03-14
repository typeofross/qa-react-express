This is a full-stack Single Page Application (SPA) built with React, Express, and MongoDB, providing a platform for users to ask questions and get answers by others. It supports full CRUD operations for posts (questions) and comments (answers).

## Features

* **Question Posting:** Users can easily post their questions.
* **Answer Submission:** Users can submit answers to questions via comments.
* **Full CRUD Operations:**
    * Create, read, update, and delete questions (posts).
    * Create, read, update, and delete answers (comments).
* **User Authentication:** Basic authentication allowing to utilise the posting/commenting functionalities.
* **Responsive Design:** Ensures a seamless experience across various devices.
* **MongoDB Integration:** Data persistence using MongoDB.
* **Express API:** Robust backend API for data management.
* **React Frontend:** Interactive and dynamic user interface.

## Application structure

### Public Part

The public part is accessible without authentication. It allows guests to browse the home page with latest posts, categories, searching and viewing individual posts. Guests can login and register to use the full functionality.

### Private Part

Once authenticated, users can post questions and answers (comments) to posts, fully manage their posts and comments (create, update, delete) , like and dislike posts and comments, see their activity (posts/comments/rated), change their password or delete their account, which will remove all posts/comments/ratings associated with it.

## Routes

* **/** Home page that displays the latest posts and all categories on the side.
* **/search** Search all posts, available in the header part.
* **/category/:name/page/:number** Shows all posts from a given category, paginated.
* **/post/:id** Displays details about a post. Users can rate and comment.
* **/login** Login page available for guests.
* **/register** Register page available for guests.
* **/logout** Logout page available for logged in users.
* **/create** Create page for adding a post/question.
* **/update/:id** Update page for editing an existing post. 
* **/profile/settings** Profile settings page with options to change password or delete account.
* **/profile/activity/:type** [posts,comments,rated] Shows profile activity.

## Getting Started

### Prerequisites

* Node.js and npm installed.
* MongoDB installed and running.

### Installation

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/typeofross/qa-react-express.git
    cd qa-react-express
    ```

2.  **Install backend dependencies:**

    ```bash
    cd server
    npm install
    ```

3.  **Install frontend dependencies:**

    ```bash
    cd ../client
    npm install
    ```

4.  **Run the application:**

    * **Backend:**

        ```bash
        cd ../server
        npm start
        ```

    * **Frontend:**

        ```bash
        cd ../client
        npm start
        ```

    The application will be accessible at `http://localhost:5173`.
