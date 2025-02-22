const cookie = '__stripe_mid=1f328f04-1d97-41be-8216-0c7b26fccd5383b09a; AMP_MKTG_437c42b22c=JTdCJTdE; __Host-Midjourney.AuthUserTokenV3_r=AMf-vBw-ltDp94ERldrFSw5gSuGg1BKpq5qCPXKpEKB7z848kMW2rl0TJGHd9zxX0yRWP6KK7lPPV_WXacM_EpWWIi4M5tOngGAg1U7Q4gwbBK8wJOaMWUlTvlaKFxzvf2-amBrd3Zo5woLCsKhRT0ehsYVUD8-i9cV5EAcAEnzoNfPd0L2aCp0; cf_clearance=I5IFR3OBdgTdsSN8.CMxlo23uoKNngPXSWQIjb6H9lY-1732555184-1.2.1.1-hj72M8PdKuRecy4kBAmmDMFKdntH4devt2dINTVgXlWE464qDsaoxB3MakSOr6UX1GXXkAPvta1DMckX7G.6kUpdCcmweruP4uBsvfdmvX3DeoTEhCQwkM2n61htPZFLc88nQ.bc5OPwxxiGiqzDB5k18s9u76Ymj0_J2fPqH31WapSTdl5RDca6t_WN0CUCn9RTsF85V1X6iFW0q3OIYlJtwz35S.HPFWyJk5muBAP2gC_PZAKcBXuS6C4QCckkILN8rYYEJL9siNQTkWAfyr04_RdjTGXkbmpUT5LvQRD_zSei8qlMTJe1l688viGO7byAI.xNIZceY5Ni.Uyh_bO.XdM9aAXuaLutM3WswHk4sRyc7bGCAdFeGJMXAaMBcaBz3QKYWJD_8g15KDlBvA; __Host-Midjourney.AuthUserTokenV3_i=eyJhbGciOiJSUzI1NiIsImtpZCI6IjkyODg2OGRjNDRlYTZhOThjODhiMzkzZDM2NDQ1MTM2NWViYjMwZDgiLCJ0eXAiOiJKV1QifQ.eyJuYW1lIjoidTIzOTU0MjQ0MzQiLCJwaWN0dXJlIjoiaHR0cHM6Ly9saDMuZ29vZ2xldXNlcmNvbnRlbnQuY29tL2EvQUNnOG9jSldnQ0hwQmFjYTJKa2RFandINmxnck1EOXN2d3dCWlU3UmY0Ykkyckp5R19LaUlnPXM5Ni1jIiwibWlkam91cm5leV9pZCI6ImY5NmM0NmJkLWNmNmItNGU2MS1hMzM1LTBjMDUxNzMxMWE3OSIsImlzcyI6Imh0dHBzOi8vc2VjdXJldG9rZW4uZ29vZ2xlLmNvbS9hdXRoam91cm5leSIsImF1ZCI6ImF1dGhqb3VybmV5IiwiYXV0aF90aW1lIjoxNzI2ODQyMTc3LCJ1c2VyX2lkIjoiZFhpT3Q2YTVoOFJ5bDRvdXExQkhyekZPNkZyMSIsInN1YiI6ImRYaU90NmE1aDhSeWw0b3VxMUJIcnpGTzZGcjEiLCJpYXQiOjE3MzI2MDI0NTAsImV4cCI6MTczMjYwNjA1MCwiZW1haWwiOiJ3YW5nemhlbnpoZW4yMDIzQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJmaXJlYmFzZSI6eyJpZGVudGl0aWVzIjp7Imdvb2dsZS5jb20iOlsiMTA5ODk2MTA0MzE0OTA2NDczMDY3Il0sImRpc2NvcmQuY29tIjpbIjEyMTc3MTYxNzMwNjA0NDAwODUiXSwiZW1haWwiOlsid2FuZ3poZW56aGVuMjAyM0BnbWFpbC5jb20iXX0sInNpZ25faW5fcHJvdmlkZXIiOiJjdXN0b20ifX0.kRBY8pvzAlXBHSUOVb5GPSnsfQ0V4JTy0ZLLJUmt3Ml--XowA2Qi8jZDPlNZ4aIVsGlUuMemkI6LjzWhZulD1oyXISxFJy23WB2bchna2gM4yosU9TGUdrStHI0zYxaf1tDN9-UDJrZk1s6hvm55gnxhb9ijh1Eeipfvy4xSTvna_nqttDQ-M5bJcYUN7Xv4TG1q3KKUyxt_Z5M4I7hQGZcRYJZGjeZgOF2WjMkIyi2LzVrdSMmduT9LEIKGxxSImBRzJEYDN3Dn52-GwaWgl42fj_Jy_DYXLkag1--QrRW1Z1SXMU8ZCTY4wCoDwlO2NzUNhVe1uQ7-dWi-ncTPww; __cf_bm=Q.pL7QiFnMcWEdG7EOM7RWfSWopTUVPcPAFj3sgRdWI-1732602450-1.0.1.1-v.QCSLMfRTjXXDKKsJqEN7rgObDDXHxKleir._fZPGTuACy4sWVmP_77tw6D8meRIOeZS5mcnqTdprgVO3CvMw; AMP_437c42b22c=JTdCJTIyZGV2aWNlSWQlMjIlM0ElMjJmOWUxYjg1MS1iMzVjLTQzMzgtOWVkYi01MWNlYjU2YWQ0ZGUlMjIlMkMlMjJ1c2VySWQlMjIlM0ElMjJmOTZjNDZiZC1jZjZiLTRlNjEtYTMzNS0wYzA1MTczMTFhNzklMjIlMkMlMjJzZXNzaW9uSWQlMjIlM0ExNzMyNTQ4NTEyMzcyJTJDJTIyb3B0T3V0JTIyJTNBZmFsc2UlMkMlMjJsYXN0RXZlbnRUaW1lJTIyJTNBMTczMjU1NTE4NDMxNSUyQyUyMmxhc3RFdmVudElkJTIyJTNBODIyMSU3RA=='

export const headers = {
  'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36',
  'Content-Type': 'application/json',
  'x-csrf-protection': '1',
  'Cookie': cookie,
}

export const sendRequest = ({ url = '', method = 'GET', data = null }) => {
  const { exec } = require('child_process')
  const fs = require('fs')

  return new Promise((resolve, reject) => {
    let cmd = `curl -X ${method} ${url}`

    for (const [key, value] of Object.entries(headers)) {
      cmd += ` -H '${key}: ${value}'`
    }

    if (data) {
      const dataString = typeof data === 'string' ? data : JSON.stringify(data).replaceAll('"', '\\"')
      cmd += ` -d "${dataString}"`
    }

    exec(cmd, (error: any, stdout: any) => {
      if (error) {
        fs.writeFile('/Users/wangzhenyu/Code/work/persons/video/error.txt', error.toString(), 'utf-8', () => {
          console.log('文件写入成功')
        })
        reject(error)
        return
      }
      resolve(stdout)
    })
  })
}

export const downloadImageWithCurl = (imageUrl: string) => {
  const { exec } = require('child_process')

  return new Promise((resolve, reject) => {
    let cmd = `curl -s '${imageUrl}'`

    for (const [key, value] of Object.entries(headers)) {
      cmd += ` -H '${key}: ${value}'`
    }

    exec(cmd, { maxBuffer: 1024 * 1024 * 10, encoding: null }, (error: any, stdout: any) => {
      if (error) {
        console.error('下载图片失败:', error)
        reject(error)
        return
      }

      resolve(Buffer.from(stdout, 'binary'))
    })
  })
}
