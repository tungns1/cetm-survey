
import { Branch, Model } from '../shared/';
import { Track, TrackGroup } from './track';

export interface TicketTrack extends Track {
	cnum: string;
	f_at: number;
	c_at: number;
	s_at: number;
	swtime: number;
	state:string;
	sstime: number;
	service: string;
	service_id: string;
	services: string[];
}

class ticketTrackGroup extends TrackGroup<TicketTrack> {
	protected canAdd(v: TicketTrack) {
		var timeStamp = Math.floor(Date.now() / 1000);

		if (!v.service_id) {
			v.service_id = v.services[0];
		}
		v.service = Model.Center.ServiceName(v.service_id);
		return true;
	}
}

export const TicketTrackGroup = new ticketTrackGroup("ticket");

export const RxTicketData = TicketTrackGroup.RxData;

