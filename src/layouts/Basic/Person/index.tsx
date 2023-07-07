import React from "react";
import {Link} from "react-router-dom";
import cls from "@/pages/Passport/index.module.css";
const BasicPerson: React.FC = () => {
    const handleClick = () => {
        // 执行额外的点击事件处理逻辑
        localStorage.removeItem('token');
    };
    return(
        <div>
            <Link onClick={handleClick} className={cls.text} to="/passport/login">
                退出
            </Link>
        </div>
    )
}
export default BasicPerson