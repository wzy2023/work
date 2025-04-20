const tf = require('@tensorflow/tfjs-node')
const data = require('./data.json')

console.log('使用数据量', data.length)

// 将数据转换为适合训练的格式
const xs = tf.tensor2d(data.map(item => item.prev), [data.length, data[0].prev.length])
const ys = tf.tensor2d(data.map(item => item.next <= 10 ? 1 : 0), [data.length, 1])

// 创建模型
const model = tf.sequential()
model.add(tf.layers.dense({ units: 64, activation: 'relu', inputShape: [data[0].prev.length] }))
model.add(tf.layers.dense({ units: 32, activation: 'relu' }))
model.add(tf.layers.dense({ units: 16, activation: 'relu' }))
model.add(tf.layers.dense({ units: 1, activation: 'sigmoid' }))

model.compile({
  optimizer: 'adam',
  loss: 'binaryCrossentropy',
  metrics: ['accuracy'],
})

// 定义一个预测函数
const predict = (nums) => {
  const input = tf.tensor2d([nums], [1, nums.length])
  const output = model.predict(input)
  return output.dataSync()[0]
}

module.exports = {
  model,
  xs,
  ys,
  predict,
}
