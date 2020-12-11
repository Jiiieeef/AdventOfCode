const sortedInput = `49
89
70
56
34
14
102
148
143
71
15
107
127
165
135
26
119
46
53
69
134
1
40
81
140
160
33
117
82
55
25
11
128
159
61
105
112
99
93
151
20
108
168
2
109
75
139
170
65
114
21
92
106
162
124
158
38
136
95
161
146
129
154
121
86
118
88
50
48
62
155
28
120
78
60
147
87
27
7
54
39
113
5
74
169
6
43
8
29
18
68
32
19
133
22
94
47
132
59
83
12
13
96
35`.split('\n').map(number => +number).sort((a, b) => a > b ? 1 : -1);

const maxNumber = Math.max(...sortedInput);

const mapping = {
  1: 0,
  2: 0,
  3: 1
};

let currentNumber = 0;
const path = [currentNumber];

while (currentNumber !== maxNumber) {
  for (let i = 1; i <= 3; i++) {
    if (sortedInput.includes(currentNumber + i)) {
      mapping[i]++;
      currentNumber += i;
      path.push(currentNumber);
      break;
    }
  }
}

console.log(currentNumber, mapping[1] * mapping[3]);

// Brute force way
// let numberOfPossibilities = 0;
// const countNumberOfPossibilities = (number) => {
//   if (!sortedInput.includes(number + 1) && !sortedInput.includes(number + 2) && !sortedInput.includes(number + 3) && number === maxNumber) {
//     numberOfPossibilities++;
//     return;
//   }

//   for (let i = 1; i <= 3; i++) {
//     if (sortedInput.includes(number + i)) {
//       countNumberOfPossibilities(number + i);
//     }
//   }
// };
// countNumberOfPossibilities(0)

// Tribonnaci way
const tribonnaci = [
  0,
  1,
  2,
  4,
  7,
  13,
  24,
  44,
  81,
  149,
  274,
  504,
  927,
  1705,
  3136,
  5768,
  10609,
  19513,
  35890,
  66012,
  121415,
  223317,
  410744,
  755476,
  1389537,
  2555757,
  4700770,
  8646064,
  15902591,
  29249425,
  53798080,
  98950096,
  181997601,
  334745777,
  615693474,
  1132436852,
  2082876103,
  3831006429,
  7046319384,
  12960201916
];

let countOneJolt = 0;
let total = 1;
for (let i = 0; i <= sortedInput.length; i++) {
  const diff = i == 0 ? (sortedInput[i] - 0) : (sortedInput[i] - sortedInput[i - 1]);
  if (diff === 1) {
    countOneJolt++
  } else {
    if (countOneJolt > 0) {
      total *= tribonnaci[countOneJolt];
      countOneJolt = 0;
    }
  }
}

console.log(total);
