export interface Option {
    option: string;
    isCorrect: boolean;
}

export interface Question {
    value: string;
    options: Option[];
    
}
 

export interface Exam {
    title : string,
    abc : string,
    text : string ,
    time : string | undefined,
    category : string | undefined,
    questions : Question[];
}