import { getField, sendEvent, setField } from "pxc:sandbox/state";

export function onAction(name, data, context, permission) {
  const value = JSON.parse(data);
  if (name === "config.save") {
    if (permission !== "edit") {
      return "";
    }
    setField("video_id", JSON.stringify(value.video_id));
    sendEvent("fields.change.video_id", JSON.stringify(value.video_id), null, "play");
    const startTime = value.start_time ?? 0;
    setField("start_time", JSON.stringify(startTime));
    sendEvent("fields.change.start_time", JSON.stringify(startTime), null, "play");
  }
  return "";
}

export function getState() {
  const state = {
    video_id: JSON.parse(getField("video_id")),
    start_time: JSON.parse(getField("start_time")),
  };
  return JSON.stringify(state);
}
