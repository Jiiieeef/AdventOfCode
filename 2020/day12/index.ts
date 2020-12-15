import { splitInputFile } from '../../utils';
import { Coordinates, Direction, Instruction, Turn, Forward } from './interface';

const inputArray = splitInputFile('./input.txt');

const NORTH: Direction = 'N';
const EAST: Direction = 'E';
const SOUTH: Direction = 'S';
const WEST: Direction = 'W';
const DIRECTIONS: Direction[] = [NORTH, EAST, SOUTH ,WEST];

const RIGHT: Turn = 'R';
const LEFT: Turn = 'L';
const TURNS: Turn[] = [RIGHT, LEFT];

const FORWARD: Forward = 'F';

const mapping = {
  [NORTH]: (coordinates: Coordinates, value: number) => ({...coordinates, Y: coordinates.Y + value}),
  [SOUTH]: (coordinates: Coordinates, value: number) => ({...coordinates, Y: coordinates.Y - value}),
  [EAST]: (coordinates: Coordinates, value: number) => ({...coordinates, X: coordinates.X + value}),
  [WEST]: (coordinates: Coordinates, value: number) => ({...coordinates, X: coordinates.X - value})
};

const splitInstruction = (instruction: string): Instruction => {
  const matchingString = instruction.match(/[0-9]+$/g);

  if (!matchingString) {
    return [currentDirection, 0];
  }

  const letter = instruction[0] as Direction;
  const value = matchingString[0];

  return [letter, +value];
};

const rotateShip = (letter: Turn, value: number): Direction => {
  const degrees = value / 90;
  let positionIndex = DIRECTIONS.indexOf(currentDirection);
  const rotation = letter === RIGHT ? 1 : -1;

  for (let i = 0; i < degrees; i++) {
    if (positionIndex + rotation === DIRECTIONS.length) {
      positionIndex = 0;
    } else if (positionIndex + rotation < 0) {
      positionIndex = DIRECTIONS.length - 1;
    } else {
      positionIndex += rotation;
    }
  }

  return DIRECTIONS[positionIndex];
};

let currentDirection: Direction = EAST;
let shipCoordinates: Coordinates = {
  X: 0,
  Y: 0
};

const letterIsDirection = (letter: any) : letter is Direction => DIRECTIONS.includes(letter);
const letterIsTurn = (letter: any) : letter is Turn => TURNS.includes(letter);

// Part 1
inputArray.forEach(instruction => {
  const [letter, value]: Instruction = splitInstruction(instruction);

  if (letterIsDirection(letter)) {
    shipCoordinates = mapping[letter](shipCoordinates, value);
  } else if (letterIsTurn(letter)) {
    currentDirection = rotateShip(letter, value);
  } else {
    shipCoordinates = mapping[currentDirection](shipCoordinates, value);
  }
});
console.log(shipCoordinates, Math.abs(shipCoordinates.X) + Math.abs(shipCoordinates.Y))
