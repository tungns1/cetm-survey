import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  template: 'Admin Home',
  selector: 'admin-home'
})
export class AdminHome { }

const settingMenu = [
  { href: "/branch/2", name: "Tỉnh/Thành" },
  { href: "/branch/1", name: "Chi nhánh" },
  { href: "/branch/0", name: "Phòng giao dịch" },
  { href: "/center/tform", name: "Số vé" },
  { href: "/center/service", name: "Dịch vụ" },
  { href: "/house/counter", name: "Quầy giao dịch" },
  { href: "/user", name: "Người dùng", icon: "fa-user" },
]


@Component({
  selector: 'app-admin',
  templateUrl: 'admin.component.html',
  styleUrls: ['admin.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AdminComponent {
  menu = [
    { href: "/branch/0", name: "Cài đặt", icon: "fa-home", children: settingMenu },
    { href: "/report/tonghop", name: "Báo cáo", icon: "fa-chart" },
    { href: "/monitor/giaodich", name: "Giám sát", icon: "fa-connect" },
    { href: "/house/kiosk", name: "Kiosk", icon: "fa-chart" },
    { href: "/house/screen", name: "Màn hình trung tâm", icon: "fa-chart" },
    { href: "/center/layout", name: "Giao diện" },
  ]
}
