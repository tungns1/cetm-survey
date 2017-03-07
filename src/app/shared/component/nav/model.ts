
export class Item {
    app?: string;
    href?: string;
    link?: string;
    name?: string;
    icon?: string;
    children?: Item[];
}

const settingMenu = [
    { app: "admin", href: "/admin/org/branch/2", name: "LANGAUGE_CITY" },
    { app: "admin", href: "/admin/org/branch/1", name: "LANGAUGE_BRANCH" },
    { app: "admin", href: "/admin/org/branch/0", name: "LANGAUGE_TRANSACTION_ROOM" },
    { app: "admin", href: "/admin/center/tform", name: "LANGAUGE_TICKET_NUMBER" },
    { app: "admin", href: "/admin/center/service", name: "LANGAUGE_SERVICE" },
    { app: "admin", href: "/admin/meta/branch_config", name: "LANGAUGE_SETTING" },
    { app: "admin", href: "/admin/house/sflow", name: "LANGAUGE_STREAM_SERVICE_LOCAL" },
    { app: "admin", href: "/admin/house/counter", name: "LANGAUGE_COUNTERS" },
    { app: "admin", href: "/admin/org/user", name: "LANGAUGE_USER", icon: "fa-user" },
]

const reportMenu: Item[] = [
    {app: "report", href: "/report/dashboard", name: "LANGAUGE_BUTTON_GENERAL"},
    {app: "report", href: "/report/history", name: "LANGAUGE_BUTTON_HISTORY"},
    {app: "report", href: "/report/customer", name: "LANGAUGE_BUTTON_CUSTOMER"},
]


export const TopNavMenu: Item[] = [
    { app: "admin", href: "/admin/org/branch/0", name: "LANGAUGE_MANAGER_SYSTEM", icon: "fa-home", children: settingMenu },
    { app: "report", href: "/report/dashboard", name: "LANGAUGE_REPORT", icon: "fa-line-chart", children: reportMenu },
    { app: "monitor", href: "/monitor/ticket", name: "LANGAUGE_MONITOR", icon: "fa-bell" },
    { app: "admin", href: "/admin/house/kiosk", name: "LANGAUGE_MANAGER_KIOSK", icon: "fa-ticket" },
    { app: "admin", href: "/admin/house/screen", name: "LANGAUGE_MANAGER_SCREEN", icon: "fa-desktop" },
    { app: "admin", href: "/admin/house/screen", name: "LANGAUGE_FEEDBACK_MANAGEMENT", icon: "fa-commenting" }
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