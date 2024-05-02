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
            return '班主任';
        case Job.Lecturer:
            return '讲师';
        case Job.Dean:
            return '院长';
        case Job.Research:
            return '研究员';
        case Job.Counselor:
            return '辅导员';
        default:
            return num as string;
    }
}