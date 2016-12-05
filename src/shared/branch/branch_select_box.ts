
// @Component({
//     selector: 'branch-selector',
//     template: `
//     <span>{{level | levelName}}</span>
//     <div>
//     <select [ngModel]="selected" (ngModelChange)="updateChildren($event)"> // value is a string or number
//         <option [style.display]="(count | async)<2? 'none':'block'" value="all">--Tất cả --</option>
//         <option [style.display]="(count | async)>0? 'none':'block'" value="none">-- Không có dữ liệu --</option>
//         <option *ngFor="let b of o?.shown | async" [value]="b.id">{{b.name}}</option>
//     </select>
//     </div>
//     `,
//     styles: [`
//      select { width:100%;  height: 30px;border-radius:3px;}
//      span{ margin-bottom: 5px;}
//      `],
//     changeDetection: ChangeDetectionStrategy.OnPush
// })
// export class BranchSelectorComponent {
//     @Input() set level(v: number) {
//         if (this._level > -1) {
//             throw Error("branch level was already set");
//         }
//         this._level = v;
//         this.o = AllLevels[this._level];
//         this.o.shown.subscribe(branches => {
//             if (branches.length === 1) {
//                 this.selected = branches[0].id;
//             } else if (branches.length > 1) {
//                 this.selected = 'all';
//             } else {
//                 this.selected = 'none';
//             }
//             this.count.next(branches.length);
//         })
//         this.o.SelectAll();
//         // this.selected = 'all';
//     }

//     get level() {
//         return this._level;
//     }

//     o: BranchInLevel;
//     count = new BehaviorSubject<number>(0);
//     selected: string;

//     updateChildren(id: string) {
//         switch (id) {
//             case 'all':
//                 this.o.SelectAll();
//                 return;
//             case 'none':
//                 return;
//             default:
//                 this.o.SelectOnlyID(id);
//                 return
//         }
//     }

//     private _level = -1;
// }
