export * from './shared';

import { sharedServiceProvider } from './shared';

const reportServiceProvider = [
    sharedServiceProvider
]

export { Paging } from './paging.service';

export {
    reportServiceProvider
}