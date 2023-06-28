const fs = require('fs');

let filePath = './src/database/article.json';
class Article {

    static getAll() {
        try {
            const jsonData = fs.readFileSync(filePath, 'utf8');
            const articles = JSON.parse(jsonData);
            return articles;
        } catch (error) {
            console.error('Erreur lors de la lecture du fichier JSON :', error);
            return [];
        }
    }

    static getById(articleId) {
        try {
            const jsonData = fs.readFileSync(filePath, 'utf8');
            const articles = JSON.parse(jsonData);
            const article = articles.find((item) => item.id_article === articleId);
            return article;
        } catch (error) {
            console.error('Erreur lors de la lecture du fichier JSON :', error);
            return null;
        }
    }

    static add(newArticle) {
        try {
            const jsonData = fs.readFileSync(filePath, 'utf8');
            const articles = JSON.parse(jsonData);
            newArticle.id_article = articles.length > 0 ? articles[articles.length - 1].id_article + 1 : 0;
            articles.push(newArticle);
            fs.writeFileSync(filePath, JSON.stringify(articles, null, 2));
            return newArticle.id_article;
        } catch (error) {
            console.error('Erreur lors de la lecture/écriture du fichier JSON :', error);
            return null;
        }
    }

    static update(articleId, updatedArticle) {
        try {
            const jsonData = fs.readFileSync(filePath, 'utf8');
            const articles = JSON.parse(jsonData);
            const articleIndex = articles.findIndex((item) => item.id_article === articleId);
            if (articleIndex !== -1) {
                articles[articleIndex] = { id_article: articleId, ...updatedArticle };
                fs.writeFileSync(filePath, JSON.stringify(articles, null, 2));
                return true;
            } else {
                return false;
            }
        } catch (error) {
            console.error('Erreur lors de la lecture/écriture du fichier JSON :', error);
            return false;
        }
    }

    static delete(articleId) {
        try {
            const jsonData = fs.readFileSync(filePath, 'utf8');
            const articles = JSON.parse(jsonData);
            const articleIndex = articles.findIndex((item) => item.id_article === articleId);
            if (articleIndex !== -1) {
                articles.splice(articleIndex, 1);
                fs.writeFileSync(filePath, JSON.stringify(articles, null, 2));
                return true;
            } else {
                return false;
            }
        } catch (error) {
            console.error('Erreur lors de la lecture/écriture du fichier JSON :', error);
            return false;
        }
    }
}

module.exports = Article;