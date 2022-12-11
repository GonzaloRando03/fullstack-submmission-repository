"use strict";
function calculateExercices(horas, meta) {
    var training = [];
    var hours = 0;
    horas.forEach(function (h) {
        hours += h;
        if (h !== 0) {
            training.push(h);
        }
    });
    var media = hours / horas.length;
    var success = media >= meta ? true : false;
    var description;
    var hoursnumber;
    if (media - meta < 0) {
        description = "muy mal";
        hoursnumber = 1;
    }
    else if (media - meta > 0 && media - meta < 1) {
        description = "muy bien";
        hoursnumber = 2;
    }
    else {
        description = "excelente";
        hoursnumber = 3;
    }
    var res = {
        periodLegth: horas.length,
        trainingDays: training.length,
        success: success,
        rating: meta,
        ratingDescription: description,
        target: hoursnumber,
        average: media
    };
    return res;
}
console.log(calculateExercices([1, 3], 10));
