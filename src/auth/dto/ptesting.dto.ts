import { IsOptional } from "class-validator";

export class Ptesting {
    @IsOptional()
    id: string;

    @IsOptional()
    deviceId: string;
}