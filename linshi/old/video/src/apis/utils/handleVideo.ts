import ffmpeg from 'fluent-ffmpeg'
import * as path from 'path'
import fs from 'fs-extra'

async function concatVideos(video1Path: string, video2Path: string, outputPath: string): Promise<void> {
  try {
    const concatFile = path.join(__dirname, '../../../concat.txt')
    const fileListContent = `file '${video1Path}'\nfile '${video2Path}'\n`
    await fs.writeFile(concatFile, fileListContent)

    return new Promise((resolve, reject) => {
      ffmpeg()
      .input(concatFile)
      .inputOptions('-f', 'concat')
      .inputOptions('-safe', '0')
      .outputOptions('-c', 'copy')
      .output(outputPath)
      .on('end', () => {
        console.log('视频合并完成')
        resolve()
        // 删除临时文件
        fs.unlink(concatFile)
      })
      .on('error', (err: any) => {
        console.error('An error occurred during concatenation:', err.message)
        console.error('ffmpeg stderr:', err)
        reject(err)
      })
      .run()
    })
  } catch (error) {
    console.error(`Error during concatenation process: ${error}`)
    throw error
  }
}

async function cutFirstEightSeconds(inputPath: string, outputPath: string): Promise<void> {
  try {
    return new Promise((resolve, reject) => {
      // 使用 ffmpeg 截取视频的前 8 秒
      ffmpeg(inputPath)
      .setStartTime(0)
      .setDuration(8)
      .outputOptions('-preset', 'ultrafast') // 设置编码速度更快的选项
      .outputOptions('-threads', '4') // 设置线程数量，根据机器的核心数调整
      .output(outputPath)
      .on('end', () => {
        console.log('视频截取完成')
        resolve()
      })
      .on('error', (err) => {
        console.error('An error occurred during video cutting:', err.message)
        reject(err)
      })
      .run()
    })
  } catch (error) {
    console.error(`Error during video cutting process: ${error}`)
  }
}

async function addAudioToVideo(videoPath: string, audioPath: string, outputPath: string): Promise<void> {
  try {
    return new Promise((resolve, reject) => {
      // 使用 ffmpeg 将音频与视频合并
      ffmpeg()
      .input(videoPath)
      .input(audioPath)
      .videoCodec('copy') // 直接复制视频流
      .audioCodec('aac') // 将音频编码为 AAC
      .outputOptions('-strict', 'experimental') // 允许使用实验选项
      .outputOptions('-map', '0:v:0') // 映射第一个输入文件中的视频流
      .outputOptions('-map', '1:a:0') // 映射第二个输入文件中的音频流
      .outputOptions('-shortest') // 确保输出文件的长度与较短的输入文件一致
      .outputOptions('-y') // 强制覆盖输出文件
      .output(outputPath)
      .on('end', () => {
        console.log('音频和视频合并完成')
        resolve()
      })
      .on('error', (err) => {
        console.error('An error occurred during audio and video merging:', err.message)
        reject(err)
      })
      .run()
    })
  } catch (error) {
    console.error(`Error during audio and video merging process: ${error}`)
    throw error
  }
}

async function cropVideo(inputPath: string, outputPath: string): Promise<void> {
  try {
    return new Promise((resolve, reject) => {
      ffmpeg(inputPath)
      .videoFilters('crop=in_w:in_h*0.92')
      .on('end', () => {
        console.log('视频裁剪完成')
        resolve()
      })
      .on('error', (err: any) => {
        console.error('裁剪过程中出错:', err.message)
        reject(err)
      })
      .save(outputPath)
    })
  } catch (error) {
    console.error(`裁剪过程出错: ${error}`)
    throw error
  }
}

export const handleVideo = async (sourcePath: string) => {
  const videoSourcePath = sourcePath
  const videoMergedPath = './merged.mp4'
  const video8sPath = './merged8s.mp4'
  const videoCropPath = './mergedCrop.mp4'
  const audioPath = path.join(__dirname, './audio.wav')
  const videoProcessedPath = `${sourcePath.replace(/\.[^/.]+$/, '')}_handle.mp4`

  try {
    // 合并视频
    await concatVideos(videoSourcePath, videoSourcePath, videoMergedPath)

    // 截取合并后的视频的前 8 秒
    await cutFirstEightSeconds(videoMergedPath, video8sPath)

    // 将音频添加到截取后的视频中
    await addAudioToVideo(video8sPath, audioPath, videoCropPath)

    // 裁剪视频高度
    await cropVideo(videoCropPath, videoProcessedPath)

    // 删除临时文件
    await fs.unlink(sourcePath)
    await fs.unlink(videoMergedPath)
    await fs.unlink(video8sPath)
    await fs.unlink(videoCropPath)

    return videoProcessedPath
  } catch (error) {
    console.error('Error during video processing:', error)
    throw error
  }
}

interface VideoProcessingOptions {
  inputFile: string;
  outputFile: string;
  mirror?: boolean;          // 是否启用镜像
  noiseReduction?: boolean; // 是否启用去噪
  sharpening?: boolean;     // 是否启用锐化
}

function processVideo(options: VideoProcessingOptions): Promise<void> {
  return new Promise((resolve, reject) => {
    let filters = ''

    if (options.mirror ?? true) {
      filters += 'hflip,'
    }

    if (options.noiseReduction ?? true) {
      filters += 'hqdn3d,'
    }

    if (options.sharpening ?? true) {
      filters += 'unsharp=5:5:0.75:3:3,'
    }

    if (filters.length > 0) {
      filters = filters.slice(0, -1) // 移除最后一个逗号
    }

    // 使用 fluent-ffmpeg 进行视频处理
    ffmpeg(options.inputFile)
    .outputOptions('-vf', filters)
    .on('start', (commandLine) => {
      console.log(`Executing command: ${commandLine}`)
    })
    .on('end', () => {
      console.log(`Finished processing ${options.inputFile} to ${options.outputFile}`)
      resolve()
    })
    .on('error', (err: Error) => {
      console.error('An error occurred: ', err.message)
      reject(err)
    })
    .save(options.outputFile)
  })
}

export const handleVideo2 = async (sourcePath: string) => {
  const videoSourcePath = sourcePath
  const videoProcessedPath = `${sourcePath.replace(/\.[^/.]+$/, '')}_handle.mp4`

  try {
    await processVideo({
      inputFile: videoSourcePath,
      outputFile: videoProcessedPath,
    })
    return videoProcessedPath

  } catch (error) {
    console.error('Error during video processing:', error)
    throw error
  }
}
