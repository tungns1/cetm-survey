
export type TicketState = "waiting" | "serving" | "missed" | "cancelled" | "finished" | "unknown";


const TicketStateWaiting: TicketState = "waiting";
const TicketStateServing: TicketState = "serving";
const TicketStateMissed: TicketState = "missed";
const TicketStateFinished: TicketState = "finished";
const TicketStateCancelled: TicketState = "cancelled";
const TicketStateUnknown: TicketState = "unknown";

export const TicketStates = {
    Waiting: TicketStateWaiting,
    Serving: TicketStateServing,
    Missed: TicketStateMissed,
    Finished: TicketStateFinished,
    Cancelled: TicketStateCancelled,
    Unknown: TicketStateUnknown
}
