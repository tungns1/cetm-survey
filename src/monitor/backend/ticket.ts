
import { Branch, Model } from '../shared/';
import { Track, TrackGroup } from './track';

export class TicketTrack extends Track {
	cnum: string;
	f_at: number;
	c_at: number;
	s_at: number;
	swtime: number;
	sstime: number;
	object: any;
	service: string;
	service_id: string;
	services: string[];
}

class TicketTrackGroup extends TrackGroup<TicketTrack> {
	beforeAdd = (v: TicketTrack) => {
		var timeStamp = Math.floor(Date.now() / 1000);

		if (v.service_id) {
			v.service_id = v.services[0];
		}
		v.service = Model.Center.ServiceName(v.service_id);
	}

	static sort(a: TicketTrack, b: TicketTrack) {
		return a.c_at > b.c_at ? -1 : 1;
	}


	public WaitLong() {
		return this.RxData.map(data => data.filter(d => d.swtime > 0).sort(TicketTrackGroup.sort));
	}

	public ServeLong() {
		return this.RxData.map(data => data.filter(d => d.sstime > 0).sort(TicketTrackGroup.sort));
	}
}

export const TicketTracks = new TicketTrackGroup();
