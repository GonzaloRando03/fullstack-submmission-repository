"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express_1 = __importDefault(require("express"));
var diagnoses_json_1 = __importDefault(require("data/diagnoses.json"));
var patients_json_1 = __importDefault(require("data/patients.json"));
var body_parser_1 = __importDefault(require("body-parser"));
var dataPatients = patients_json_1["default"];
var dataDiagnoses = diagnoses_json_1["default"];
var app = (0, express_1["default"])();
app.use(body_parser_1["default"].urlencoded({ extended: false }));
app.use(body_parser_1["default"].json());
app.get('/ping', function (req, res) {
    res.status(200).send(null);
});
app.get('/api/diagnoses', function (req, res) {
    res.sent(dataDiagnoses);
});
app.get('/api/patients', function (req, res) {
    res.sent(dataPatients);
});
app.post('/api/patients', function (req, res) {
    var patientOne = req.body;
    dataPatients.push(patientOne);
    res.sent(patientOne);
});
app.listen(3030, function () {
    console.log('Iniciado');
});
