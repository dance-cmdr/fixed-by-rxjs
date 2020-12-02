import { interval, fromEvent, merge, from, zip } from 'rxjs';
import {
  bufferTime,
  throttleTime,
  filter,
  map,
  switchMap,
} from 'rxjs/operators';

const INTERVAL = 600;

const source = fromEvent(document, 'click');
const throttled = source.pipe(throttleTime(INTERVAL));
const buffered = source.pipe(
  bufferTime(INTERVAL),
  filter((clicks) => clicks.length > 1),
  map((clicks) => {
    console.log(clicks.length);
    return clicks.slice(1, 3);
  }),
  switchMap((clicks) =>
    zip(from(clicks), interval(INTERVAL)).pipe(map(([click]) => click))
  )
);

const example = merge(throttled, buffered);

const subscribe = example.subscribe((val) =>
  console.log('Buffered with Time:', val)
);
