interface result {
    periodLegth: number;
    trainingDays: number;
    success: boolean;
    rating: number;
    ratingDescription: string;
    target: number;
    average: number;
}
declare function calculateExercices(horas: number[], meta: number): result;
