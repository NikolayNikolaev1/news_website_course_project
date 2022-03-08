module.exports = {
    renderViewWithError: (res, formModel, routePath, viewPath, errorMessage) => {
        // model is for adding data from body to the form after an error.
        // route and viewPath are for none static values with constants.
        res.locals.globalError = errorMessage;
        res.render(viewPath, { model: formModel, route: routePath });
        return;
    }
};