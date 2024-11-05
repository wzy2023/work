import { cookies } from 'next/headers'

export default function ComB() {
  cookies()

  // function delayByComputation(durationInSeconds: number) {
  //   const startTime = performance.now()
  //   let currentTime
  //   let counter = 0
  //
  //   // 进行密集的浮点数运算
  //   while ((currentTime = performance.now()) < startTime + durationInSeconds) {
  //     // 进行一些浮点数运算
  //     const x = Math.sin(counter) * Math.cos(counter)
  //     counter += 0.0001
  //   }
  //
  //   return currentTime - startTime
  // }

  return (
    <div style={{ border: 'solid .5px yellow' }}>
      <span>ComB {Math.random()}</span>
      {/*<div>{delayByComputation(3000)}</div>*/}
    </div>
  )
}
