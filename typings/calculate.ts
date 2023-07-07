export interface CalculateResult {
    // http代码
    code: number;
    // 数据体
    data: {
        returns: number[],
        date: string[],
        success: string,
    };
    // 消息
    msg: string;
    // 结果
    success: boolean;
}