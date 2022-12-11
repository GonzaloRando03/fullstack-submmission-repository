"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express_1 = __importDefault(require("express"));
var body_parser_1 = __importDefault(require("body-parser"));
function calculateBmi(peso, estatura) {
    var metros = estatura / 100;
    var result = peso / (metros * metros);
    if (result > 25) {
        return "no saludable " + (result);
    }
    else {
        return "saludable " + (result);
    }
}
var app = (0, express_1["default"])();
app.use(body_parser_1["default"].urlencoded({ extended: false }));
app.use(body_parser_1["default"].json());
app.get('/bmi', function (req, res) {
    var pesoParam = req.query.peso;
    var estaturaParam = req.query.estatura;
    var peso = parseFloat(pesoParam);
    var estatura = parseFloat(estaturaParam);
    var bmi = calculateBmi(peso, estatura);
    res.send(bmi);
});
app.listen(3030, function () {
    console.log('Iniciado');
});
