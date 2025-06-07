export declare class ImportErrorDto {
    line: number;
    message: string;
}
export declare class ImportResultDto {
    membersCreated: number;
    membersUpdated: number;
    usersCreated: number;
    usersUpdated: number;
    errors: ImportErrorDto[];
}
