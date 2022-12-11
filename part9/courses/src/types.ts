export interface HeaderProps{
    name:string
}

interface ContentObject{
    name:string
    exerciseCount: number
}

export interface ContentProps{
    content: ContentObject[]
}

export interface CoursePartBase {
    name: string;
    exerciseCount: number;
}

export interface CoursePartDescription extends CoursePartBase {
    description?: string;
}
  
export interface CoursePartOne extends CoursePartBase {
    name: "Fundamentals";
    description: string;
}
  
export interface CoursePartTwo extends CoursePartBase {
    name: "Using props to pass data";
    groupProjectCount: number;
}
  
export interface CoursePartThree extends CoursePartBase {
    name: "Deeper type usage";
    description: string;
    exerciseSubmissionLink: string;
}
  
export type CoursePart = CoursePartOne | CoursePartTwo | CoursePartThree;