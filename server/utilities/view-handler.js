// TODO: FIX - remove all buissness logic from this module.
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
            imageName: article.imageName,
            videoId: videoId
        };
    },
    homeViewModel: (websites) => {
        // Returns 3 random websites for home view.
        const shuffled = websites.sort(() => 0.5 - Math.random());
        return shuffled.slice(0, 3);
    },
    userWebsitesViewModel: (websites) => {
        let websitesModels = [];

        websites.forEach(website => {
            websitesModels.push({
                name: website.name,
                domain: website.domain,
                shortDescription: website.description.substring(0, 200) + '...',
            });
        });

        return websitesModels;
    },
    websiteArticlesViewModel: (articles) => {
        let articlesModels = [];

        articles.forEach(article => {
            const publishecationDate = new Date(article.created_at);

            articlesModels.push({
                id: article._id,
                title: article.title,
                imageName: article.imageName,
                shortText: article.text.substring(0, 200) + '...',
                publicationDate: publishecationDate.getFullYear() + '-' + (parseInt(publishecationDate.getMonth()) + 1) + '-' + publishecationDate.getDate(),
                time: publishecationDate.getHours() + ":"
                    + publishecationDate.getMinutes() + ":"
                    + publishecationDate.getSeconds()
            });

        });


        articlesModels
        .sort((a, b) => a.publicationDate.localeCompare(b.publicationDate))
        .sort((b, a) => a.time.localeCompare(b.time));
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