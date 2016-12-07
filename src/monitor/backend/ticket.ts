
import { Branch, Model } from '../shared/';
import { Track, TrackGroup } from './track';

export class TicketTrack extends Track {
	service_id: string;
	cnum: string;
	c_at: number;
	s_at: number;
	t_wait: number;
	t_serve: number;
	object: any;
	service: string;
}

class TicketTrackGroup extends TrackGroup<TicketTrack> {
	beforeAdd(v: TicketTrack) {
		v.service = Model.Center.ServiceName(v.service_id);
		var timeStamp = Math.floor(Date.now() / 1000);
		// name
		if (v.tag === 'wait') {
			v.t_wait = timeStamp - v.c_at;
		}
		if (v.tag === 'serve') {
			v.t_serve = timeStamp - v.s_at;
		}
	}
}

export const TicketTracks = new TrackGroup<TicketTrack>();
