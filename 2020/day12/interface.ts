export interface Coordinates {
  X: number;
  Y: number;
}
export type Direction = 'N' | 'E' | 'S' | 'W';
export type Turn = 'R' | 'L';
export type Forward = 'F';

export type Letter = Direction | Turn | Forward;

export type Instruction = [Letter, number];