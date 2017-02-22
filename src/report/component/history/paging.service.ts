import { BehaviorSubject } from 'rxjs/BehaviorSubject';

export interface IPage {
    page: number;
    title: string;
}

export class Paging<T> {
    count$ = new BehaviorSubject<number>(0);
    data$ = new BehaviorSubject<T[]>([]);
    currentPage$ = new BehaviorSubject<number>(1);
    pageSize$ = new BehaviorSubject<number>(20);

    SetData(data: T[]) {
        this.data$.next(data);
    }

    SetCount(count: number) {
        this.count$.next(count);
    }

    get Skip() {
        return (this.currentPage$.value - 1) * this.pageSize$.value;
    }

    get Limit() {
        return this.pageSize$.value;
    }

    get TotalPage() {
        return Math.ceil(this.count$.value * 1.0 / this.pageSize$.value);
    }

    IsActive(p: IPage) {
        return this.currentPage$.value === p.page;
    }

    pages$ = this.count$.combineLatest(this.currentPage$, (count, current) => {
        const totalPage = this.TotalPage;
        const pages: IPage[] = [];
        if (totalPage < 1) {
            return pages;
        }


        pages.push({ page: 1, title: 'First' });
        pages.push({ page: current - 1, title: 'Previous' });

        // 
        if (current > 1) {
            pages.push({ page: 1, title: '1' });
            if (current > 2) {
                pages.push({ page: -1, title: '...' });
            }
            pages.push({ page: current - 1, title: `${current - 1}` });
        }

        pages.push({ page: current, title: `${current}` });

        // 
        if (current > 2 && current < totalPage - 2) {
            pages.push({ page: current + 1, title: `${current + 1}` });
            if (current < totalPage - 3) {
                pages.push({ page: -1, title: '...' });
            }
        }

        if (totalPage > current - 1) {
            pages.push({ page: totalPage - 1, title: `${totalPage - 1}` });
        }

        if ((current + 1) < totalPage) {
            pages.push({ page: current + 1, title: 'Next' });
        }

        pages.push({ page: totalPage, title: 'Last' });
        return pages;
    });

    info$ = this.currentPage$.map(c => `Hiển thị ${this.pageSize$.value} GD từ số ${c * this.pageSize$.value + 1} đến số ${(c + 1) * this.pageSize$.value}`);

    MoveToPage(page: number) {
        if (page <= this.TotalPage && page >= 0) {
            this.currentPage$.next(page);
            return true;
        }
        return false;
    }

}