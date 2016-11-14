var request = require('request'),
    token = '';

var getImages = function(phrase) {
    return new Promise(function (resolve, reject) {
        var options = {
            url: `https://api.gettyimages.com/v3/search/images/editorial?fields=comp,title,people&sort_order=newest&phrase=${phrase}&page_size=100`,
            method: 'GET',
            headers: {
              'Api-Key': token
            }
        };
        request(options, function(error, response, body) {
            if (!error) {
                resolve(JSON.parse(body));
            } else {
                reject(error);
            }
        });
    });
};

module.exports = {
    getImages: getImages
};
