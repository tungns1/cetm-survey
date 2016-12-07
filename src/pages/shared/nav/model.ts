
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
    { app: 'admin', href: "/house/counter", name: "Quầy giao dịch" },
    { app: 'admin', href: "/user", name: "Người dùng", icon: "fa-user" },
]


export const AdminMenu: Item[] = [
    { app: 'admin', href: "/branch/0", name: "Cài đặt", icon: "fa-home", children: settingMenu },
    { app: 'report', href: "/", name: "Báo cáo", icon: "fa-chart" },
    { app: 'monitor', href: "/", name: "Giám sát", icon: "fa-connect" },
    { app: 'admin', href: "/house/kiosk", name: "Kiosk", icon: "fa-chart" },
    { app: 'admin', href: "/house/screen", name: "Màn hình trung tâm", icon: "fa-chart" },
    { app: 'admin', href: "/center/layout", name: "Giao diện" },
]

export { GetAppName } from '../../../config/';