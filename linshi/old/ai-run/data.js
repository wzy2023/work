const generateNumbers = (isOdd, count = 10, min = 10, max = 99) => {
  const numbers = []
  while (numbers.length < count) {
    let number = Math.floor(Math.random() * (max - min + 1)) + min
    if ((isOdd && number % 2 !== 0) || (!isOdd && number % 2 === 0)) {
      numbers.push(number)
    }
  }
  return {
    nums: numbers,
    isOdd: isOdd ? 1 : 0,
  }
}

const sampleCount = 5 * 10000
const data = [
  ...Array.from({ length: sampleCount }).map(() => generateNumbers(true)),
  ...Array.from({ length: sampleCount }).map(() => generateNumbers(false)),
]

// 导出
module.exports = {
  data,
  generateNumbers,
}
