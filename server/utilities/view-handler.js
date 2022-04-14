module.exports = {
    renderFormError: (res, formModel, viewPath, errorMessage) => {
        // model is for adding data from body to the form after an error.
        // viewPath is for none static values with constants.
        res.locals.globalError = errorMessage;
        res.render(viewPath, { model: formModel });
    },
    articleViewModel: (article) => {
        const videoId = getId(article.videoUrl);
        const iframeMarkup = '<iframe width="560" height="315" src="//www.youtube.com/embed/'
            + videoId + '" frameborder="0" allowfullscreen></iframe>';

        return {
            id: article._id,
            title: article.title,
            text: article.text,
            videoId: videoId
        };
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
    },
    websiteArticlesViewModel: (articles) => {
        let articlesModels = [];

        articles.forEach(article => {
            articlesModels.push({
                id: article._id,
                title: article.title,
                shortText: article.text.substring(0, 200) + '...',
                publicationDate: article.publicationDate
            });
        });

        articlesModels.sort((a, b) => {
            return new Date(b.date) - new Date(a.date);
        });

        return articlesModels;
    },
    websiteHomeViewModel: (website) => {
        return {
            name: website.name,
            description: website.description,
            publisher: website.publisher.email,
        }
    }
};

// TODO: MOVE THIS TO UTILITIES..
// GETS ID FROM YOUTUBE LINKGS
function getId(url) {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);

    return (match && match[2].length === 11)
        ? match[2]
        : null;
}