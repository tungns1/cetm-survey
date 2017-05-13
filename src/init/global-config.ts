import { RawHttp } from '../lib/backend';
import { PlatformEnvStorage } from '../lib/platform';
import { ProjectConfig } from '../const';

export function LoadConfig() {
    const env = new PlatformEnvStorage();
    return RawHttp("GET", `${env.Http}/api/config`)
        .then(text => JSON.parse(text))
        .then(obj => ProjectConfig.__update(obj))
        .catch(e => console.log("load config", e));
}