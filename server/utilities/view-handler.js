module.exports = {
    renderFormError: (res, formModel, viewPath, errorMessage) => {
        // model is for adding data from body to the form after an error.
        // viewPath is for none static values with constants.
        res.locals.globalError = errorMessage;
        res.render(viewPath, { model: formModel });
    },
    userWebsitesViewModel: (websites) => {
        let websitesModels = [];

        websites.forEach(website => {
            websitesModels.push({
                name: website.name,
                domain: website.domain,
                description: website.description
            });
        });

        return websitesModels;
    }
};