import fs from 'fs'

const configPath = './electron/config.json'

export function readConfig(field?: string) {
  const config = JSON.parse(fs.readFileSync(configPath, 'utf-8'))
  if (field) {
    return config[field]
  }
  return config
}

// 写入配置
export function writeConfig(newConfig: any) {
  const config = readConfig()
  fs.writeFileSync(configPath, JSON.stringify({
    ...config,
    ...newConfig,
  }))
}
