
export class Item {
    app?: string;
    href?: string;
    link?: string;
    name?: string;
    icon?: string;
    children?: Item[];
}

const settingMenu = [
    { app: "admin", href: "/admin/org/branch/2", name: "City" },
    { app: "admin", href: "/admin/org/branch/1", name: "Branch" },
    { app: "admin", href: "/admin/org/branch/0", name: "Agency" },
    { app: "admin", href: "/admin/center/tform", name: "Ticket Number" },
    { app: "admin", href: "/admin/center/service", name: "Service" },
    { app: "admin", href: "/admin/meta/branch_config", name: "Setting" },
    { app: "admin", href: "/admin/house/sflow", name: "Stream Service Local" },
    { app: "admin", href: "/admin/house/counter", name: "Counetr" },
    { app: "admin", href: "/admin/org/user", name: "User", icon: "fa-user" },
]

const reportMenu: Item[] = [
    {app: "report", href: "/report/dashboard", name: "GENERAL"},
    {app: "report", href: "/report/history", name: "HISTORY"},
    {app: "report", href: "/report/customer", name: "CUSTOMER"},
]


export const TopNavMenu: Item[] = [
    { app: "admin", href: "/admin/org/branch/0", name: "Manager System", icon: "fa-home", children: settingMenu },
    { app: "report", href: "/report/dashboard", name: "Report", icon: "fa-line-chart", children: reportMenu },
    { app: "monitor", href: "/monitor/ticket", name: "Monitor", icon: "fa-bell" },
    { app: "admin", href: "/admin/house/kiosk", name: "Manage kiosk", icon: "fa-ticket" },
    { app: "admin", href: "/admin/house/screen", name: "Manager Screen", icon: "fa-desktop" },
    { app: "admin", href: "/admin/house/screen", name: "Feedback management", icon: "fa-commenting" }
    ]

export function GetActiveItemIndex(app: string, url: string) {
    for (let i = TopNavMenu.length - 1; i >= 0; i--) {
        let v = TopNavMenu[i];
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