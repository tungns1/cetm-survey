import { groupBy, filter, meanBy } from 'lodash';
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

export interface ResponAppointment{
    total?: number;
    tickets?: IAppointmentDetail[]
}

export interface IUser{
    branch_id:string;
    dtime: number;
    fullname: string;
    id: string;
    mtime: number;
    password: string;
    role: string;
    username: string;
}

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

export interface BookingDetailSumary{
    total_booking?: number;
    total_not_arrived?: number;
    total_arrived?: number;
    total_cancel?: number;
    total_finish?: number;
}

export interface ITrack{
    service_id: string;
    branch_id: string;
    ctime: number;
    status: string;
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
    tracks?: ITrack[];
    total_booking?: number;
    serving_at?: number;
}

export interface IResponDetail{
    id?: number;
    tickets?: IAppointmentDetail[]
    total?: number;
    timeBlock?: string;
}

export interface IStatus{
    total_booking?: number;
    total_cancel?: number;
    total_create_new?: number;
    average_reservation_by_day?: number;
    average_reservation_from_cancel_to_appointment_by_day?: number;
    total_update?: number;
    branch_name?: string;
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
    private maxServingSeconds = ProjectConfig.service.max_serving_minute*60;
    private maxWaitingSeconds = ProjectConfig.service.max_waiting_minute*60;
    private bookingHistoryData: IAppointmentDetail[] = [];
    private boookingStatusData: IStatus;
    private bookingStatusTableData: IStatus[] = [];
    private bookingStatusChartData: IStackChart[] = [];
    private bookingStatusReservationChartData: IStackChart[] = [];
    private bookingDetailSumary: BookingDetailSumary;
    private bookingDetailTickets: IResponDetail[] = [];
    private manager;
    
    Update(data: IAppointmentDetail[]) {
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
                    value: Number.parseFloat((record.avg_reserved_by_day/(3600*24)).toFixed(1))
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

    getBranchManager(data: IUser[]){
        let list= data.filter(item => item.role === 'manager');
        this.manager = list.map(item => {
            return item.fullname;
        }).join(', ')
    }

    UpdateBookingStatus(data: IAppointmentDetail[]){
        this.boookingStatusData = {
            total_booking: this.getTotalBooking(data),
            total_cancel: this.getTotalCancelBooking(data),
            total_create_new: this.getTotalCreateNewBooking(data),
            average_reservation_by_day: this.getAverageReservation(data),
            average_reservation_from_cancel_to_appointment_by_day: this.getAverageFromCancelToAppointment(data),
            total_update: this.getTotalBooking(data) - this.getTotalCancelBooking(data) - this.getTotalCreateNewBooking(data)
        }
        this.bookingStatusTableData = this.getBookingStatusTableData(data)
        this.bookingStatusChartData = this.bookingStatusTableData.map(record => {
            return {
                name: record.branch_name,
                series: [
                    { name: 'Create New', value: record.total_create_new },
                    { name: 'Canceled', value: record.total_cancel },
                    { name: 'Updated', value: record.total_update },
                ]
            }
        })
       
        this.bookingStatusReservationChartData = [
            {
                name:  'Average reserved by day',
                series: this.bookingStatusTableData.map(record => {
                    return {
                        name: record.branch_name,
                        value: Number.parseFloat( (record.average_reservation_by_day/86400.0).toFixed(2))
                    }
                })
            },
            {
                name:  'Average reserved from cancel time to meeting time by day',
                series: this.bookingStatusTableData.map(record => {
                    return {
                        name: record.branch_name,
                        value: Number.parseFloat((record.average_reservation_from_cancel_to_appointment_by_day/ 86400.0).toFixed(2))
                    }
                })
            },
        ]
    }

    UpdateBookingDetail(data: IResponDetail[]){
        this.bookingDetailSumary = {
            total_booking : this.getTotalBooking2(data),
            total_cancel: this.getTotalCancelBooking2(data),
            total_finish: this.getTotalFinishBooking2(data),
            total_arrived: this.getTotalArrivedBooking2(data),
            total_not_arrived: this.getTotalNotArrivedBooking2(data)
        }
        // total_booking?: number;
        // total_not_arrived?: number;
        // total_arrived?: number;
        // total_cancel?: number;
        // total_finish?: number;
        this.bookingDetailTickets = data;
    }

    private getTotalBooking2(data: IResponDetail[]){
        let result = 0;
    
        for (let index = 0; index < data.length; index++) {
            for (let i = 0; i < data[index].tickets.length; i++) {
                result +=1;
                let tracks = data[index].tickets[i].tracks.filter(item => item.status === 'deleted' || item.status === 'cus_update' || item.status === 'finished').length
                result += tracks
            }
        }
        return result;
    }

    private getTotalCancelBooking2(data: IResponDetail[]){
        let result = 0;
        for (let index = 0; index < data.length; index++) {
            let tracks = data[index].tickets.filter(item => item.status === 'deleted' || item.status === 'cancelled').length
            result += tracks
        }
        return result;
    }

    private getTotalFinishBooking2(data: IResponDetail[]){
        let result = 0;
        for (let index = 0; index < data.length; index++) {
            let tracks = data[index].tickets.filter(item => item.status === 'finished').length
            result += tracks
        }
        return result;
    }

    private getTotalArrivedBooking2(data: IResponDetail[]){
        let result = 0;
        for (let index = 0; index < data.length; index++) {
            let tracks = data[index].tickets.filter(item => item.check_in_at > 0).length
            result += tracks
        }
        return result;
    }

    private getTotalNotArrivedBooking2(data: IResponDetail[]){
        let result = 0;
        for (let index = 0; index < data.length; index++) {
            let tracks = data[index].tickets.filter(item => item.check_in_at === 0).length
            result += tracks
        }
        return result;
    }

    private getTotalBooking(data:IAppointmentDetail[]){
        let result = 0;
        for (let index = 0; index < data.length; index++) {
            result +=1;
            let tracks = data[index].tracks.filter(item => item.status === 'deleted' || item.status === 'cus_update').length
            result += tracks
        }
        return result;
    }

    private getAverageFromCancelToAppointment(data){
        let result = 0;
        let total = 0;
        for (let index = 0; index < data.length; index++) {
            for (let i = 0; i < data[index].tracks.length; i++) {
                if (data[index].tracks[i].status === 'deleted') {
                    let temp = data[index].time_go_bank - data[index].tracks[i].ctime;
                    if (temp > 0) {
                        total+=temp;
                        result +=1;
                    }
                }                
            }
        }
        if (result>0 && total >0) {
            return total/result;
        }else{
            return 0;
        }
    }

    private getTotalCancelBooking(data: IAppointmentDetail[]){
        let result = 0;
        for (let index = 0; index < data.length; index++) {
            let tracks = data[index].tracks.filter(item => item.status === 'deleted').length
            result += tracks
        }
        return result;
    }

    private getTotalCreateNewBooking(data: IAppointmentDetail[]){
        return data.length;
    }

    private getTotalWattingExcessStandart(data: IAppointmentDetail[]){
        return data.filter(item => item.waiting_time > this.maxWaitingSeconds).length
    }

    private getTotalServedExcessStandart(data: IAppointmentDetail[]){
        return data.filter(item => item.serving_time > this.maxServingSeconds).length
    }

    private getTotalAppointment(data){
        if (data) {
            return data.length;
        }else{
            return 0
        }
    }

    private getTotalStatusArrived(data: IAppointmentDetail[]){
        // console.log(data)
        return data.filter(item => item.check_in_at > 0).length
    }

    private getAverageReservation(data){
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

    private getAverageWattingTime(data){
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

    private getTotalStatusSuccess(data :IAppointmentDetail[]){
        return data.filter(item => item.status === 'finished').length
    }

    private getAvgServedTime(data){
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

    private getTotalArrivedLate(data: IAppointmentDetail[]){
        return data.filter(item => item.check_in_at > 0 && item.check_in_at > item.time_go_bank).length
    }

    private getTotalNotArrived(data: IAppointmentDetail[]){
        return data.filter(item => item.check_in_at === 0).length;
    }

    private getTotalCancel(data: IAppointmentDetail[]): number{
        return data.filter(rowEl => rowEl.check_in_at > 0 && rowEl.status === 'deleted').length;
    }

    private getBranchName(data){
        const item = CacheBranch.GetByID(data[0].branch_id);
        return item ? item.name : '';
    }

    private groupByBranchId(data){
        let value = groupBy(data, 'branch_id');
        let result:ITableData[] = [];
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
                result.push(item);
            }
        }
        // console.log(ressult)
        return result;
    }

    private getBookingStatusTableData(data){
        let value = groupBy(data, 'branch_id');
        let result:IStatus[] = [];
        for (const key in value) {
            if (value.hasOwnProperty(key)) {
                let element = value[key]
                let item:IStatus = {
                    branch_name: this.getBranchName(element),
                    total_booking: this.getTotalBooking(element),
                    total_create_new: this.getTotalCreateNewBooking(element),
                    total_cancel: this.getTotalCancelBooking(element),
                    total_update: this.getTotalBooking(element) - this.getTotalCancelBooking(element) - this.getTotalCreateNewBooking(element),
                    average_reservation_by_day: this.getAverageReservation(element),
                    average_reservation_from_cancel_to_appointment_by_day: this.getAverageFromCancelToAppointment(element)
                }
                result.push(item)
            }
        }
        return result;
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
    
    get getManager(){
        return this.manager
    }

    get BookingStatusData(){
        return this.boookingStatusData
    }

    get BookingStatusTableData() {
        return this.bookingStatusTableData;
    }

    get BookingStatusChartData(){
        return this.bookingStatusChartData
    }

    get BookingStatusReservationChartData(){
        return this.bookingStatusReservationChartData
    }

    get BookingDetailSumary(){
        return this.bookingDetailSumary;
    }

    get BookingDetailTickets() {
        return this.bookingDetailTickets;
    }
}