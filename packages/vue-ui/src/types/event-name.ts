import { EVENT_NAME } from "@darwin-studio/vue-ui/src/constants/event-name";

export type EventName = (typeof EVENT_NAME)[keyof typeof EVENT_NAME];

export default EventName;
