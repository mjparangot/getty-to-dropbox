var request = require('request');

var getImages = function(phrase) {
    return new Promise(function (fulfill) {
        var options = {
            url: `https://api.gettyimages.com/v3/search/images/editorial?fields=comp,title,people&sort_order=newest&phrase=${phrase}&page_size=100`,
            method: 'GET',
            headers: {
              'Api-Key': ''
            }
        };
        request(options, function(error, response, body) {
            if (!error) {
                fulfill(JSON.parse(body));
            } else {
                fulfill(error);
            }
        });
    });
};

module.exports = {
    getImages: getImages
};
