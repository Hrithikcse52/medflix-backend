const patient = require('../models/patient');

function create_pt(doc) {
    return new Promise((resolve, reject) => {
        if (!doc) {
            reject({ code: 400, data: 'Improper Query' });
        }
        patient.create(doc, (err, data) => {
            if (err) {
                reject({ code: 401, data: "Couldn't Make pt" });
                return;
            }
            resolve({ code: 200, data });
            return;
        });
    });
}
function find_pt(id) {
    // console.log('findPt', id);
    return new Promise((resolve, reject) => {
        patient.findById(id, (err, data) => {
            console.log('Pt data:', data);
            if (err) {
                reject({ code: 401, data: "Couldn't Find Data" });
                return;
            }
            resolve({ code: 200, data });

            return;
        });
    });
}

function findAndUpdate(id, update) {
    return new Promise((resolve, reject) => {
        patient.findByIdAndUpdate(id, update, { new: true }, (err, data) => {
            if (err) {
                reject({ code: 500, data: "Couldn't Update" });
                return;
            }
            resolve({ code: 200, data });
        });
    });
}

function find_all(filter, option = { sort: { updatedAt: -1 } }) {
    return new Promise((resolve, reject) => {
        patient.find(filter, {}, option, (err, data) => {
            if (err) {
                reject({ code: 401, data: "Couldn't Find Data" });
                return;
            }
            resolve({ code: 200, data });
            return;
        });
    });
}
module.exports = {
    create_pt,
    find_all,
    find_pt,
    findAndUpdate,
};
