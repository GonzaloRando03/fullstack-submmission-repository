interface result {
    periodLegth: number,
    trainingDays: number,
    success: boolean,
    rating: number,
    ratingDescription: string,
    target: number,
    average: number
}

function calculateExercices(horas: number[], meta: number){
    let training:number[] = []
    let hours:number = 0
    horas.forEach(h=>{
        hours += h
        if (h !== 0){
            training.push(h)
        }
    })

    const media:number = hours/horas.length 

    const success:boolean = media >= meta? true: false

    let description:string 
    let hoursnumber:number
    if(media - meta < 0){
        description = "muy mal"
        hoursnumber = 1
    }else if(media - meta > 0 && media - meta < 1){
        description = "muy bien"
        hoursnumber = 2
    }else{
        description = "excelente"
        hoursnumber = 3
    }

    const res:result = {
        periodLegth: horas.length,
        trainingDays: training.length,
        success: success,
        rating: meta,
        ratingDescription: description,
        target: hoursnumber,
        average: media
    }

    return res

}

console.log(calculateExercices([1,3], 10))