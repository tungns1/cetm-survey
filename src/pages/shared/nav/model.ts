
export class Item {
    app?: string;
    href?: string;
    link?: string;
    name?: string;
    icon?: string;
    children?: Item[];
}

const settingMenu = [
    { app: 'admin', href: "/branch/2", name: "Tỉnh/Thành" },
    { app: 'admin', href: "/branch/1", name: "Chi nhánh" },
    { app: 'admin', href: "/branch/0", name: "Phòng giao dịch" },
    { app: 'admin', href: "/center/tform", name: "Số vé" },
    { app: 'admin', href: "/center/service", name: "Dịch vụ" },
    { app: 'admin', href: '/config', name: 'Cài đặt' },
    { app: 'admin', href: '/house/sflow', name: 'Luồng dịch vụ cục bộ' },
    { app: 'admin', href: "/house/counter", name: "Quầy giao dịch" },
    { app: 'admin', href: "/user", name: "Người dùng", icon: "fa-user" },
]


export const AdminMenu: Item[] = [
    { app: 'admin', href: "/branch/0", name: "Quản lý Trung Tâm", icon: "fa-home", children: settingMenu },
    { app: 'report', href: "/tonghop", name: "Báo cáo", icon: "fa-line-chart" },
    { app: 'monitor', href: "/ticket", name: "Giám sát", icon: "fa-bell" },
    { app: 'admin', href: "/house/kiosk", name: "Quản lý Kiosk", icon: "fa-ticket" },
    { app: 'admin', href: "/house/screen", name: "Quản lý Màn hình", icon: "fa-desktop" }
]

import { GetAppName } from '../../../config/';
export { GetAppName } from '../../../config/';

export function GetActiveItemIndex(url: string) {
    let app = GetAppName();
    for (let i = AdminMenu.length - 1; i >= 0; i--) {
        let v = AdminMenu[i];
        if (v.app !== app) {
            continue;
        }
        if (v.href === url) {
            return i;
        }
        if (v.children) {
            for (let j = v.children.length - 1; j >= 0; j--) {
                let t = v.children[j];
                if (t.href === url) {
                    return j;
                }
            }
        }
    }
    return -1;
}