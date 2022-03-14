const { renderFormWithError } = require("./view-handler");

module.exports = {
    throwExpectedServiceError: (errorMessage) => {
        // Using this function in services to catch expected errors for user to see.
        // isExpected is a flag to check the error in controller logic.
        const error = new Error(errorMessage);
        error.isExpected = true;

        throw error;
    }
};