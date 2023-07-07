// global typing
// 定义 less-vars-to-js 解决无类型提示问题
declare module '*.css' {
    const content: { [className: string]: string };
    export default content;
}