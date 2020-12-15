import fs from 'fs';

export const splitInputFile = (inputPath: string): string[] => {
  const input = fs.readFileSync(inputPath, 'utf-8');
  return input.split('\n');
};
