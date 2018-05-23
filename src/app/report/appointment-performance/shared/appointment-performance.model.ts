import { groupBy, sumBy, minBy, maxBy, meanBy, sortBy, size, toArray, sum, filter, findIndex } from "lodash";
import { ProjectConfig, CacheBranch } from "../../shared";

export interface IAppoitmentSum{
    total_appointment?: number; // số lượng cuộc hẹn
    num_status_arrived?: number; // số lượng có mặt
    num_status_finished?: number; // số lượng giao dịch hoàn thành
    avg_watting_time?: number; // thời gian đợi trung bình
    avg_served_time?: number; // thời gian phục vụ trung bình
    avg_reserved_by_day?: number // số ngày đặt trước trung bình
    num_arrived_late?: number; // số lượng đến muộn
    num_cancel?: number; // số lượng giao dịch bị hủy
    num_excess_watting?: number; // số lượng giao dịch đợi vượt chuẩn
    num_excess_served?: number; // số lượng giao dịch phục vụ vượt chuẩn
}

export interface IStatusSum{

}

// export interface IBookingHistory{
//     branch_name?: string;
//     customer_name?: string;
//     created_at?: number;
//     created_at_time?: any;
//     created_at_day?: any;
//     service_name?: string;
//     type_ticket?: string;
//     time_go_bank?: number;
//     check_in_at?: number;
//     cnum_cetm?: string;
//     waiting_time?: number;
//     serving_time?: number;
//     status?: string;
//     teller?: string;
//     manager?: string;
//     customer: ICustomer;
// }   

export interface ITableData{
    branch_name?: string; // phòng giao dịch
    total_appointment?: any; // tổng cuộc hẹn
    avg_reserved_by_day?: any // số ngày đặt trước trung bình
    num_status_arrived?: any; // số lượng có mặt
    num_arrived_late?: any; // số lượng đến muộn
    num_status_finished?: any; // số lượng giao dịch hoàn thành
    num_cancel?: any; // số lượng giao dịch bị hủy
    avg_watting_time?: any; // thời gian đợi trung bình
    num_excess_watting?: any; // số lượng giao dịch đợi vượt chuẩn
    avg_served_time?: any; // thời gian phục vụ trung bình
    num_excess_served?: any; // số lượng giao dịch phục vụ vượt chuẩn
}

export interface ICustomer{
    id?: string;
    created_at?: number;
    updated_at?: number;
    name?: string;
    username?: string;
    password?: string;
    role?: number;
    email?: string;
    code?: any;
    date_of_birth?: any;
    full_name?: string;
    phone_number?: any;
    nationality?: any;
    vip_code?: any;
    segment?: any;
}

export interface IAppointmentDetail {
    id?: string,
    created_at?: number;
    updated_at?: number;
    time_go_bank?: number;
    service_id?: string;
    service_name?: string;
    branch_id?: string;
    branch_address?: string;
    branch_name?: string;
    type_ticket?: string;
    customer_code?: number;
    customer_id?: number | string;
    check_in_at?: number;
    avatar_teller?: string;
    id_ticket_cetm?: string;
    cnum_cetm?: string;
    teller_id?: string;
    teller?: string;
    serving_time?: number;
    waiting_time?: number;
    is_rate?: number;
    status?: string;
    customer?: ICustomer;
}

interface ISeriesChart {
    name: string;
    value: number;
}

export interface IStackChart {
    name: string;
    series: ISeriesChart[];
}

export class AppointmentPerformance {
    constructor() { }

    private sumData: IAppoitmentSum;
    private tableData: ITableData[] = [];
    private generalChartData: IStackChart[] = [];
    private timeArrivedChartData: IStackChart[] = [];
    private typeTransactionStatusChartData: IStackChart[] = [];
    private averageReservationByDayChartData: IStackChart[] = [];
    private maxServingMinute = ProjectConfig.service.max_serving_minute;
    private maxWaitingMinute = ProjectConfig.service.max_waiting_minute;

    private bookingHistoryData: IAppointmentDetail[] = [];
    
    Update(data: IAppointmentDetail) {
        // console.log(data)
        // this.getTotalStatusArrived(data);
        // console.log(this.groupByBranchId(data))
        // this.groupByBranchId(data)
        // this.sumData = data.detail;
        // console.log(this.maxServingMinute)
        this.sumData = {
            total_appointment: this.getTotalAppointment(data),
            num_status_arrived: this.getTotalStatusArrived(data),
            num_status_finished: this.getTotalStatusSuccess(data),
            avg_watting_time: this.getAverageWattingTime(data),
            avg_served_time: this.getAvgServedTime(data),
            num_arrived_late: this.getTotalArrivedLate(data),
            num_cancel: this.getTotalCancel(data),
            num_excess_served: this.getTotalServedExcessStandart(data),
            num_excess_watting: this.getTotalWattingExcessStandart(data),
            avg_reserved_by_day: this.getAverageReservation(data)
        }
        this.tableData = this.groupByBranchId(data);
        this.generalChartData = this.tableData.map(record => {
            return {
                name: record.branch_name,
                series: [
                    { name: 'Arrived', value: record.num_status_arrived },
                    { name: 'Not arrived', value: (record.total_appointment - record.num_status_arrived) }
                ]
            }
        });
        this.timeArrivedChartData = this.tableData.map(record => {
            return {
                name: record.branch_name,
                series: [
                    { name: 'Arrived in time', value: record.num_status_arrived },
                    { name: 'Arrived late', value: record.num_arrived_late }
                ]
            }
        });
        this.typeTransactionStatusChartData = this.tableData.map(record => {
            return {
                name: record.branch_name,
                series: [
                    { name: 'Finished transactions', value: record.num_status_finished },
                    { name: 'Canceled transactions', value: record.num_cancel },
                ]
            }
        });
        this.averageReservationByDayChartData = [{
            name:  'Average reserved by day',
            series: this.tableData.map(record => {
                return {
                    name: record.branch_name,
                    value: Number.parseInt((record.avg_reserved_by_day/(3600*24)).toFixed(1),10)
                }
            })
        }]
    }

    UpdateBookingHistory(data:IAppointmentDetail[]){
        for (let index = 0; index < data.length; index++) {
            data[index].branch_name = CacheBranch.GetByID(data[index].branch_id).name
        }
        this.bookingHistoryData = data
    }

    getTotalWattingExcessStandart(data){
        let result = 0;
        for (let index = 0; index < data.length; index++) {
            if (data[index].waiting_time/60 > this.maxWaitingMinute) {
                result+=1;
            }
        }
        return result;
    }

    getTotalServedExcessStandart(data){
        let result = 0;
        for (let index = 0; index > data.length; index++) {
            if (data[index].serving_time/60 > this.maxServingMinute) {
                result+=1;
            }
            
        }
        return result;
    }

    getTotalAppointment(data){
        if (data) {
            return data.length;
        }else{
            return 0
        }
    }

    getTotalStatusArrived(data){
        let result = 0;
        if (data) {
            for (let index = 0; index < data.length; index++) {
                if(data[index].check_in_at > 0){
                    result+=1;
                }                
            }
        }
        return result;
    }

    getAverageReservation(data){
        let result = 0;
        let sum = 0;
        if (data) {
            for (let index = 0; index < data.length; index++) {
                let l = data[index].time_go_bank - data[index].created_at;
                if (l > 0) {
                    sum += l;
                    result +=1;
                }
                
            }
        }
        if (result>0 && sum >0) {
            return sum/result;
        }else{
            return 0;
        }
    }

    getAverageWattingTime(data){
        let result = 0;
        let sum = 0;
        if (data) {
            for (let index = 0; index < data.length; index++) {
                if(data[index].check_in_at > 0){
                    result+=1;
                    sum += data[index].waiting_time;
                }                
            }
        }
        if (result>0 && sum >0) {
            return sum/result;
        }else{
            return 0;
        }
    }

    getTotalStatusSuccess(data){
        let result = 0;
        if (data) {
            for (let index = 0; index < data.length; index++) {
                if(data[index].status === 'finished'){
                    result+=1;
                }                
            }
        }
        return result;
    }

    getAvgServedTime(data){
        let result = 0;
        let sum = 0;
        if (data) {
            for (let index = 0; index < data.length; index++) {
                if(data[index].status === 'finished'){
                    result+=1;
                    sum += data[index].serving_time;
                }                
            }
        }
        if (result>0 && sum >0) {
            return sum/result;
        }else{
            return 0;
        }
    }

    getTotalArrivedLate(data){
        let result = 0;
        if (data) {
            for (let index = 0; index < data.length; index++) {
                if(data[index].check_in_at>0 && data[index].check_in_at > data[index].time_go_bank){
                    result+=1;
                }        
            }
        }
        return result;
    }

    getTotalNotArrived(data){
        let result = 0;
        for (let index = 0; index < data.length; index++) {
            if (data[index].check_in_at === 0) {
                result+=1;
            }            
        }
        return result;
    }

    getTotalCancel(data){
        let result = 0;
        if (data) {
            for (let index = 0; index < data.length; index++) {
                if(data[index].check_in_at > 0 && data[index].status === 'deleted'){
                    result+=1;
                }        
            }
        }
        return result;
    }

    getBranchName(data){
        let name ='';
        let item = CacheBranch.GetByID(data[0].branch_id);
        if (item) {
            name = item.name
        }
        return name;
    }

    groupByBranchId(data){
        let value = groupBy(data, 'branch_id');
        let ressult:ITableData[] = [];
        // console.log(value)
        for (const key in value) {
            if (value.hasOwnProperty(key)) {
                let element = value[key]
                let item:ITableData = {
                    branch_name: this.getBranchName(element),
                    total_appointment: this.getTotalAppointment(element),
                    num_status_arrived: this.getTotalStatusArrived(element),
                    num_arrived_late: this.getTotalArrivedLate(element),
                    num_status_finished: this.getTotalStatusSuccess(element),
                    num_cancel: this.getTotalCancel(element),
                    avg_watting_time: this.getAverageWattingTime(element),
                    avg_served_time: this.getAvgServedTime(element),
                    num_excess_watting: this.getTotalWattingExcessStandart(element),
                    num_excess_served: this.getTotalServedExcessStandart(element),
                    avg_reserved_by_day: this.getAverageReservation(element),
                }
                ressult.push(item);
            }
        }
        // console.log(ressult)
        return ressult;
    }

    get SumData() {
        return this.sumData;
    }

    get TableData() {
        return this.tableData;
    }

    get GeneralChartData() {
        return this.generalChartData;
    }

    get TimeArrivedChartData() {
        return this.timeArrivedChartData;
    }

    get TransactionStatusChartData(){
        return this.typeTransactionStatusChartData;
    }
    
    get AverageReservationByDayChartData(){
        return this.averageReservationByDayChartData;
    }

    get BookingHistoryData(){
        return this.bookingHistoryData;
    }
}