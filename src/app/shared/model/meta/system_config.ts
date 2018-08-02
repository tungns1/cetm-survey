interface StationSync{
    mode?: string;
    stores?: any[],
    token?: string,
}

interface StationServer{
    port?: number;
}

interface StationLog{
    logDir?: string;
    logToStdErr?: boolean;
    verbosity?: number;
}

interface StationStorage{
    upload?: string;
    record?: string;
    update?: string;
}

interface StationProxy{
    upload?: string;
    update?: string;
    record?: string;
}

interface StationStatic{
    appFolder?: string;
    deviceFolder?: string;
}

interface Station{
    server?: StationServer;
    log?: StationLog;
    storage?: StationStorage;
    proxy?: StationProxy;
    static?: StationStatic
}

interface Database{
    dbHost?: string;
    dbName?: string;
}

interface BusinessGeneral{
    defaultLanguage?: string;
    supportedLanguages?: string[];
}

interface BusinessService{
    maxWaitingMinute?: number;
    maxServingMinute?: number;
    autoFinishMinute?: number;
    waitLongAlertPercent?: number;
    serveLongAlertPercent?: number;
}

interface BusinessPriority{
    priorityStep?: number;
    movedTicket?: number; // moved ticket should have high priority
    restoreTicket?: number; // restore served ticket 
    internalVipCard?: number;
    customerVipCard?: number;
    privilegedCustomer?: number;
    bookedTicket?: number;
    minPriorityRestricted?: number;
    minPriorityUnorderCall?: number
}

interface Business{
    general: BusinessGeneral;
    service: BusinessService;
    priority: BusinessPriority;
}
export interface SystemConfig{
    station: Station;
    database: Database;
    business: Business;
}