module.exports = {
    articleServiceModel: (article) => {
        return {
            title: article.title,
            text: article.text,
            videoUrl: article.videoUrl
        };
    },
    userServiceModel: (user) => {
        return {
            email: user.email,
            password: user.password
        };
    },
    websiteServiceModel: (website) => {
        return {
            name: website.name,
            domain: website.domain,
            description: website.description
        };
    }
};