export default {
    register: {
        username: {
            required: "Name field is required.",
            length: "Name must be between 2 and 50 letters long."
        },
        email: {
            required: "Email field is required.",
            message: "Invalid email address.",
            pattern: /^[a-zA-Z0-9](?:[a-zA-Z0-9+._-](?![+-._]{2,}))*[a-zA-Z0-9]@(?:[a-zA-Z0-9-](?![-]{2,}))+\.(?!\.)(?:[a-zA-Z0-9-.](?![.-]{2,}))*[a-zA-Z]$/
        },
        password: {
            required: "Password fields are required.",
            match: "Passwords don't match.",
            message: "Password must contain at least 1 lowercase, 1 uppercase, 1 number, 1 special character, and must be between 8 and 20 characters long.",
            pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*\W)(?!.* ).{8,20}$/
        }
    },

    login: {
        email: {
            required: "Email field is required."
        },
        password: {
            required: "Password field is required."
        }
    },
    add: {
        title: {
            required: "Title field is required.",
            length: "Title must be between 2 and 100 letters long."
        },

        body: {
            required: "Body field is required.",
            length: "Body must be between 2 and 1000 letters long."
        }
    }
}