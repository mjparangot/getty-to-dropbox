var request = require('request'),
    getty = require('./getty.js'),
    async = require('async'),
    token = '';

var uploadImage = function(name, url) {
    return new Promise(function (fulfill) {
        var options = {
            method: 'POST',
            url: 'https://api.dropboxapi.com/2/files/save_url',
              json: true,
            headers: {
                'Authorization': `Bearer ${token}`
            },
            body: {
                path: `/Images/${name}.png`,
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
    getty.getImages(phrase).then(function (jsonRes) {
        var images = jsonRes.images,
            name, url;
        async.eachOfSeries(images, function (image, index, callback) {
            name = `${index+1}-${images[index].title}`,
            url = images[index].display_sizes[0].uri;
            uploadImage(name, url).then(function (data) {
                console.log('\n', name);
                console.log(url);
                callback();
            });
        }, function (err) {
            if (err) {
                console.error(err.message);
            } else {
                console.log("\nFinished uploading images");
            }
        });
    }).catch(function (reason) {
        console.log(reason);
        console.log('Error uploading images');
    });;
};

var deleteImages = function(path) {
    var options = {
        method: 'POST',
        url: 'https://api.dropboxapi.com/2/files/delete',
        json: true,
        headers: {
            'Authorization': `Bearer ${token}`
        },
        body: {
            path: path
        }
    };
    request(options, function (error, response, body) {
        if (!error) {
            console.log('\nDeleted ', path, ' directory\n');
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
