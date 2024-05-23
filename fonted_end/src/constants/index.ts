export enum Gender {
    Male = 1,
    FeMail = 2
}

export enum Job {
    HeadTeacher = 1,
    Lecturer = 2,
    Dean = 3,
    Research = 4,
    Counselor = 5
}

export const getJobName = (num: unknown): string => {
    switch (num) {
        case Job.HeadTeacher:
            return '棒棒糖';
        case Job.Lecturer:
            return '鞋子';
        case Job.Dean:
            return '上衣';
        case Job.Research:
            return '裤子';
        default:
            return num as string;
    }
}