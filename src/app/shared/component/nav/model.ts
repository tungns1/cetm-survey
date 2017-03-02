
export class Item {
    app?: string;
    href?: string;
    link?: string;
    name?: string;
    icon?: string;
    children?: Item[];
}

const settingMenu = [
    { app: "admin", href: "/admin/org/branch/2", name: "CITY" },
    { app: "admin", href: "/admin/org/branch/1", name: "BRANCH" },
    { app: "admin", href: "/admin/org/branch/0", name: "TRANSACTION_ROOM" },
    { app: "admin", href: "/admin/center/tform", name: "TICKET_NUMBER" },
    { app: "admin", href: "/admin/center/service", name: "SERVICE" },
    { app: "admin", href: "/admin/meta/branch_config", name: "SETTING" },
    { app: "admin", href: "/admin/house/sflow", name: "STREAM_SERVICE_LOCAL" },
    { app: "admin", href: "/admin/house/counter", name: "COUNTER" },
    { app: "admin", href: "/admin/org/user", name: "USER", icon: "fa-user" },
]

const reportMenu: Item[] = [
    {app: "report", href: "/report/dashboard", name: "BUTTON_GENERAL"},
    {app: "report", href: "/report/history", name: "BUTTON_HISTORY"},
    {app: "report", href: "/report/customer", name: "BUTTON_CUSTOMER"},
]


export const TopNavMenu: Item[] = [
    { app: "admin", href: "/admin/org/branch/0", name: "MANAGER_SYSTEM", icon: "fa-home", children: settingMenu },
    { app: "report", href: "/report/dashboard", name: "REPORT", icon: "fa-line-chart", children: reportMenu },
    { app: "monitor", href: "/monitor/ticket", name: "MONITOR", icon: "fa-bell" },
    { app: "admin", href: "/admin/house/kiosk", name: "MANAGER_KIOSK", icon: "fa-ticket" },
    { app: "admin", href: "/admin/house/screen", name: "MANAGER_SCREEN", icon: "fa-desktop" },
    { app: "admin", href: "/admin/house/screen", name: "Feedback Management", icon: "fa-commenting" },
    { app: "counter", href: "/counter/workspace?branch_code=pgd-vinh-phuc&counter_code=quay_1", name: "Counter", icon: "fa-note" },
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