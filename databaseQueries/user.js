const User = require('../models/user');

function find_users(filter, projection = '', options = {}) {
    return new Promise((resolve, reject) => {
        if (!filter) {
            reject({ code: 401, data: 'Improper find query' });
            return;
        }

        User.findOne(filter, projection, options, (err, docs) => {
            if (err) {
                reject({
                    code: 404,
                    data: undefined,
                    message: 'Encounter error while find!',
                });
                return;
            }
            if (!docs || docs.length == 0) {
                resolve({
                    code: 206,
                    data: undefined,
                    message: 'No documents found!',
                });
                return;
            }
            resolve({ code: 200, data: docs });
        });
    });
}
function find_user_update_token(id, token) {
    return new Promise((resolve, reject) => {
        if (!id) {
            reject({ code: 401, data: 'Improper query' });
            return;
        }

        User.findByIdAndUpdate(id, { token }, (err, docs) => {
            if (err) {
                reject({
                    code: 404,
                    data: undefined,
                    message: 'Encounter error while find!',
                });
                return;
            }
            if (!docs || docs.length == 0) {
                resolve({
                    code: 206,
                    data: undefined,
                    message: 'No documents found!',
                });
                return;
            }
            resolve({ code: 200, data: docs });
        });
    });
}
function create_user(doc) {
    return new Promise((resolve, reject) => {
        if (!doc.email || !doc.password) {
            reject({
                code: 401,
                data: undefined,
                message: 'Improper User Creation!',
            });
            return;
        }

        find_users({ email: doc.email })
            .then((result) => {
                if (result.code == 200) {
                    reject({
                        code: 500,
                        data: undefined,
                        message: 'User Already Exists! Try to login!',
                        details: result,
                    });
                    return;
                }
                User.create(doc, (err, item) => {
                    if (err || !item) {
                        reject({
                            code: 404,
                            data: undefined,
                            message: 'Encounter error while creating user!',
                        });
                        return;
                    }
                    resolve({ code: 200, data: item });
                    return;
                });
            })
            .catch((err) => {
                reject(err);
            });
    });
}
module.exports = {
    find_users,
    create_user,
    find_user_update_token,
};
