import {IPerson} from "@/ts/core/preson";

export interface PassportResult {
    // http代码
    code: number;
    // 数据体
    data: {
        user: IPerson
        success: string,
        token: string,
        error: string
    };
    // 消息
    msg: string;
    // 结果
    success: boolean;
}

