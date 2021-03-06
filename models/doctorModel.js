const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const doctorSchema = new mongoose.Schema(
    {
        name: { type: String, default: null },
        gender: { type: String, default: null },
        mobile_number: { type: Number, default: null },
        specialization: { type: String, default: 'MBBS' },
        doc_at: {
            id: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'user',
            },
            name: {
                type: String,
            },
        },
        spec: {
            type: mongoose.Schema.Types.Array,
            default: [],
        },
        position: {
            type: String,
            default: '',
        },
    },
    { timestamps: true }
);

doctorSchema.plugin(AutoIncrement, {
    id: 'doc_seq',
    inc_field: 'doc_id',
    reference_fields: ['doc_at.id'],
});

module.exports = mongoose.model('doctor', doctorSchema);
