import { splitInputFile } from '../../utils';
import { NearestTimestamp, OUT_OF_SERVICE } from './interface';

const inputArray = splitInputFile('./input.txt');

const earliestTimestamp = +inputArray[0];
const busIds = inputArray[1]
  .split(',')
  .filter((busId: string) => busId !== OUT_OF_SERVICE)
  .map((busId: string) => +busId);

const nearestTimestamps: NearestTimestamp[] = busIds
  .map((busId: number) => {
    let nearestTimestamp = busId;

    while (nearestTimestamp < earliestTimestamp) {
      nearestTimestamp += busId;
    }

    return {
      busId,
      nearestTimestamp
    };
  })
  .filter((timestamp: NearestTimestamp) => timestamp.nearestTimestamp >= earliestTimestamp)
  .sort((timestampA: NearestTimestamp, timestampB: NearestTimestamp) =>
    timestampA.nearestTimestamp > timestampB.nearestTimestamp ? 1 : -1
  );

console.table((nearestTimestamps[0].nearestTimestamp - earliestTimestamp) * nearestTimestamps[0].busId);
