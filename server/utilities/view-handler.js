module.exports = {
    renderViewWithError: (res, userModel, route, viewPath, errorMessage) => {
        // userModel is for adding data from body to the form after an error.
        // route and viewPath are for none static values with constants.
        res.locals.globalError = errorMessage;
        res.render(viewPath, { user: userModel, authRoute: route });
    }
}