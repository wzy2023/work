import { exec } from 'child_process'

async function getLatestCommitMsg(): Promise<string> {
  return execGitCommand(`git log -1 --pretty=%B`) as Promise<string>
}

function getContinuousCommitCount() {
  return new Promise((resolve, reject) => {
    exec(`git log --oneline --format=%s`, (err: any, stdout: string) => {
      if (err) {
        reject(err)
        return
      }
      const messages = stdout.split('\n')
      const msg = messages[0]
      let count = 0
      for (const item of messages) {
        if (item !== msg) {
          break
        }
        count++
      }
      resolve(count)
    })
  })
}

function execGitCommand(command: string): Promise<string> {
  return new Promise((resolve, reject) => {
    exec(command, (err: any, stdout: string) => {
      if (err) {
        reject(err)
        return
      }
      resolve(stdout)
    })
  })
}

export default async (options: { count: number, commit: boolean, push: boolean }) => {
  const hasChange = await execGitCommand('git status -s')

  if (hasChange) {
    if (options?.commit) {
      console.log('commit success', await execGitCommand(`git commit -a -m "${(await getLatestCommitMsg()).trim()}"`))
    } else {
      console.log('stash success', await execGitCommand('git stash'))
    }
  }

  const count = options?.count || await getContinuousCommitCount()
  const command = `GIT_EDITOR=true GIT_SEQUENCE_EDITOR="sed -i -e '2,\\$s/^pick/squash/'" git rebase -i HEAD~${count}`
  console.log('rebase success', await execGitCommand(command))

  if (options?.push) {
    console.log('push success', await execGitCommand('git push origin HEAD --force'))
  }

  if (hasChange && !options?.commit) {
    await execGitCommand('git stash pop')
  }
}
