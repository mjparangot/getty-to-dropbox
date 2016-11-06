var request = require('request'),
    async = require('async');

var uploadImage = function(name, url) {
    return new Promise(function (fulfill) {
        var options = {
            method: 'POST',
            url: 'https://api.dropboxapi.com/2/files/save_url',
            json: true,
            headers: {
                'Authorization': 'Bearer '
            },
            body: {
                path: `/Arsenal-Images/${name}.png`,
                url: url
            }
        };
        request(options, function (error, response, body) {
            if (!error) {
                fulfill(body);
            } else {
                fulfill(error);
            }
        });
    })
};

var uploadImages = function (phrase) {
    var options = {
        method: 'GET',
        url: `http://localhost:5000/api/getty/${phrase}`
    };
    request(options, function (error, response, body) {
        var data = JSON.parse(body).images,
            name, url;
        if (!error) {
            async.eachOfSeries(data, function (image, index, callback) {
                name = `${data[index].title}-${index}`,
                url = data[index].display_sizes[0].uri;
                uploadImage(name, url).then(function (data) {
                    console.log(name);
                    console.log(url, '\n');
                    callback();
                });
            }, function (err) {
                if (err) console.error(err.message);
                console.log("Finished uploading images");
            });
        } else {
            console.log(error);
            console.log('Error uploading images');
        }
    });
};

var deleteImages = function(path) {
    var options = {
        method: 'POST',
        url: 'https://api.dropboxapi.com/2/files/delete',
        json: true,
        headers: {
            'Authorization': 'Bearer '
        },
        body: {
            path: path
        }
    };
    request(options, function (error, response, body) {
        if (!error) {
            console.log(body);
        } else {
            console.log(error);
        }
    });
};

module.exports = {
    uploadImage: uploadImage,
    uploadImages: uploadImages,
    deleteImages: deleteImages
};
