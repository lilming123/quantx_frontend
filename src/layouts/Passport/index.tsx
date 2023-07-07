import React from 'react';
import {renderRoutes, RouteConfigComponentProps} from 'react-router-config';

import cls from './index.module.css';
const PassportLayout: React.FC<RouteConfigComponentProps> = ({ route }) => {
    return (
        <div className={cls.contaner}>
            <img className={cls.bg} src="/public/img/passport.png" alt="" />
            <div className={cls.box}>
                <div>{route && route.routes && renderRoutes(route.routes)}</div>
            </div>
        </div>
    );
};
export default PassportLayout;