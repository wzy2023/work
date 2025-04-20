import { AlertPro, AnchorCard, CodeView, ParamsTable, TabsPro } from '@/components'

export default (): React.ReactNode => [
  <AnchorCard title='基础'>
    <AlertPro message='为什么要使用Git'>
      <div>Git是分布式版本控制系统，将版本记录保存在各自电脑上，有本地库的概念</div>
      <div>从个人的角度，可以恢复自己以前写的代码，避免错误</div>
      <div>从团队的角度，可以多人同时开发，然后合并，提高效率</div>
    </AlertPro>
    <AlertPro message='Git的功能'>
      <div>1.协同修改</div>
      <div>2.版本管理</div>
      <div>3.权限控制</div>
      <div>4.分支管理</div>
    </AlertPro>
    <AlertPro message='Git的区域'>
      <div>工作区 是编辑代码的地方</div>
      <div>暂存区 是git add后临时存储的地方</div>
      <div>本地库 就是历史版本</div>
    </AlertPro>
  </AnchorCard>,
  <AnchorCard title='命令'>
    <TabsPro
      items={[
        {
          label: '仓库',
          children: [
            <AlertPro message='clone'>
              <CodeView language='git'>
                {`
              # 初始化本地库
              git clone $gitUrl
            `}
              </CodeView>
            </AlertPro>,
            <AlertPro message='init'>
              <CodeView language='git'>
                {`
              # 初始化本地库 (信息记录在隐藏的.git文件夹中)
              git init
            `}
              </CodeView>
            </AlertPro>,
          ],
        },
        {
          label: '本地',
          children: [
            <AlertPro message='add'>
              <CodeView language='git'>
                {`
              # 将 (指定文件|全部) 添加到暂存区
              git add ($filePath|.)
            `}
              </CodeView>
            </AlertPro>,
            <AlertPro message='rm'>
              <CodeView language='git'>
                {`
              # 删除文件 (从暂存区和工作区，也就是得先 git add)
              git rm $filePath

              # 删除目录
              git rm -r $filePath

              # 强制删除 (修改过或已放到暂存区域的需要强制删除)
              git rm -f $filePath

              # 删除文件 (只删除暂存区的)
              git rm --cached $filePath
            `}
              </CodeView>
            </AlertPro>,
            <AlertPro message='commit'>
              <CodeView language='git'>
                {`
              # 将添加到暂存区的所有文件提交到版本库
              git commit -m '提交信息'

              # 将添加到暂存区的指定文件提交到版本库
              git commit -m '提交信息' $filePath

              # 曾添加过暂存区的文件可省略add命令
              git commit -a -m '提交信息'

              # 修改上次的提交内容和提交说明
              git commit --amend
            `}
              </CodeView>
            </AlertPro>,
            <AlertPro message='stash'>
              <CodeView language='git'>
                {`
              # 将当前的修改，临时存储起来
              git stash

              # 将当前分支的改动，临时存储起来，并附带备注
              git stash save '备注'

              # 查看当前堆栈中存储的改动，会显示它们的索引
              git stash list

              # 将存到堆栈顶端的改动，删除
              git stash drop

              # 将存到堆栈中的所有改动，释放出来
              git stash pop

              # 将存到堆栈中的指定改动，释放出来
              git stash pop stash@{index}

              # 将存到堆栈中的改动，释放出来 (不会从堆栈中删除)
              git stash apply

              # 清除堆栈中的所有改动
              git stash clear
            `}
              </CodeView>
            </AlertPro>,
            <AlertPro message='reset'>
              <CodeView language='git'>
                {`
              # 回退到最后的commit
              git reset --hard HEAD

              # 回退3个版本
              git reset --hard HEAD^^^

              # 回退10个版本
              git reset --hard HEAD~10

              # 回退到指定版本
              git reset --hard [指定版本号]
            `}
              </CodeView>
            </AlertPro>,
            <AlertPro message='merge'>
              <CodeView language='git'>
                {`
              # 合并本地分支到当前分支
              git merge $branch
            `}
              </CodeView>
            </AlertPro>,
            <AlertPro message='restore'>
              <CodeView language='git'>
                {`
              # 将对指定文件的修改，撤回到暂存区的状态
              git restore $filePath

              # 撤回已添加到暂存区的文件
              git restore --staged $filePath
            `}
              </CodeView>
            </AlertPro>,
            <AlertPro message='rebase'>
              <CodeView language='git'>
                {`
              # 合并多个commit记录
              git rebase -i [startpoint] [endpoint]
              git rebase -i HEAD~2

              # 复制多个commit记录到别的分支
              git rebase [startpoint] [endpoint] --onto [branchName]

              # 撤回已添加到暂存区的文件
              git restore --staged $filePath
            `}
              </CodeView>
            </AlertPro>,
            <AlertPro message='cherry-pick'>
              <CodeView language='git'>
                {`
              # 将别的分支的commit，应用到当前分支
              git cherry-pick $commitId $commitId
            `}
              </CodeView>
            </AlertPro>,
          ],
        },
        {
          label: '分支',
          children: [
            <AlertPro message='branch'>
              <CodeView language='git'>
                {`
              # 查看分支列表
              git branch

              # 查看分支列表 (显示版本号)
              git branch -v

              # 查看分支列表 (包括远程分支)
              git branch -a

              # 删除分支
              git branch -d $branch

              # 重命名分支
              git branch -m $branch $newBranch

              # 创建分支 (根据当前分支的当前版本)
              git branch $newBranch

              # 创建分支 (根据指定版本)
              git branch $newBranch $历史版本号

              # 将当前分支与远程分支关联
              git branch --set-upstream-to=origin/$branch
            `}
              </CodeView>
            </AlertPro>,
            <AlertPro message='checkout'>
              <CodeView language='git'>
                {`
              # 切换到指定分支
              git checkout $branch

              # 切换到指定分支 (没有将创建)
              git checkout -b $branch

              # 切换到指定分支 (没有将创建，根据远程分支)
              git checkout -b $branch origin/$originBranch

              # 撤销指定文件工作区的修改 (优先恢复到该文件在暂存区的状态，暂存区没有就恢复上个版本)
              git checkout -- [filePath]
            `}
              </CodeView>
            </AlertPro>,
          ],
        },
        {
          label: '远端',
          children: [
            <AlertPro message='push'>
              <CodeView language='git'>
                {`
              # 将当前分支，推送到远端分支
              git push origin $branch

              # 将当前分支，推送到远端分支，并关联
              git push -u origin $branch

              # 将当前分支，强制推送到远端分支
              git push -f origin $branch

              # 删除远程分支
              git push -d origin $branch

              # 将当前分支与远程分支关联
              git push --set-upstream origin $branch
            `}
              </CodeView>
            </AlertPro>,
            <AlertPro message='pull'>
              <CodeView language='git'>
                {`
              # 拉取并合并远程相同分支到当前分支
              git pull

              # 拉取并合并远程指定远程分支到当前分支
              git pull origin $branch
            `}
              </CodeView>
            </AlertPro>,
            <AlertPro message='fetch'>
              <CodeView language='git'>
                {`
              # 拉取远程指定分支到本地
              git fetch origin $branch
            `}
              </CodeView>
            </AlertPro>,
            <AlertPro message='remote'>
              <CodeView language='git'>
                {`
              # 查看远端信息
              git remote -v

              # 更新分支信息
              git remote update origin -p

              # 添加与远程的管理
              git remote add origin $httpUrl

              # 删除与远程的关联
              git remote rm origin
            `}
              </CodeView>
            </AlertPro>,
          ],
        },
        {
          label: '其它',
          children: [
            <AlertPro message='config'>
              <CodeView language='git'>
                {`
              # 配置名字和邮箱
              git config [--global] user.name $name
              git config [--global] user.email $email

              # 配置和删除别名 (别名可以简化输入Git指令)
              git config [--global] alias.st 'status'
              git config [--global] --unset alias.st
            `}
              </CodeView>
            </AlertPro>,
            <AlertPro message='status'>
              <CodeView language='git'>
                {`
              # 查看当前工作区和暂存区的文件状态
              git status
            `}
              </CodeView>
            </AlertPro>,
            <AlertPro message='log & reflog'>
              <CodeView language='git'>
                {`
              # 不包括已删除的提交记录和回退版本的记录
              git log [--oneline] [-10]

              # 包括已删除的提交记录和回退版本的记录，有时效，且只在本地
              git reflog
            `}
              </CodeView>
            </AlertPro>,
            <AlertPro message='diff'>
              <CodeView language='git'>
                {`
              # 将工作区和暂存区的文件比较
              git diff $filePath

              # 将工作区和本地库历史版本的文件比较
              git diff $历史版本号
            `}
              </CodeView>
            </AlertPro>,
            <AlertPro message='rev-parse'>
              <CodeView language='git'>
                {`
              # 查看当前分支
              git rev-parse --abbrev-ref HEAD
            `}
              </CodeView>
            </AlertPro>,
            <AlertPro message='help'>
              <CodeView language='git'>
                {`
              # 查看指定命令的文档
              git help $命令
            `}
              </CodeView>
            </AlertPro>,
          ],
        },
      ]}
    />
  </AnchorCard>,
  <AnchorCard title='commit 规范'>
    <AlertPro message='commit标准化的好处'>
      <div>统一团队的commit标准，便于后续代码的review、版本发布</div>
      <div>commit Message应该清晰明了，用精简的语言说明本次提交的目的</div>
    </AlertPro>
    <AlertPro message='commit提交信息'>
      <div>一般包括三部分：Header、Body、Footer</div>
      <div>Header: 修改类型([影响范围]): 简要说明</div>
      <div>Body: 详细描述</div>
      <div>Footer: 不兼容变动</div>
    </AlertPro>
    <AlertPro message='修改类型'>
      <ParamsTable
        data={[
          { desc: `feat`, example: `feat：新增功能` },
          { desc: `fix`, example: `fix：修复bug` },
          { desc: `docs`, example: `docs：修改文档` },
          { desc: `refactor`, example: `refactor：代码重构，未新增任何功能和修复任何bug` },
          { desc: `build`, example: `build：改变构建流程，新增依赖库、工具等（例如webpack修改）` },
          { desc: `style`, example: `style：仅仅修改了空格、缩进等，不改变代码逻辑` },
          { desc: `perf`, example: `perf：改善性能和体现的修改` },
          { desc: `chore`, example: `chore：非src和test的修改` },
          { desc: `test`, example: `test：测试用例的修改` },
          { desc: `ci`, example: `ci：自动化流程配置修改` },
          { desc: `revert`, example: `revert：回滚到上一个版本` },
        ]}
      />
    </AlertPro>
  </AnchorCard>,
  <AnchorCard title='其它'>
    <AlertPro message='commit 空目录'>
      <div>创建 .gitkeep 文件即可</div>
    </AlertPro>
    <AlertPro message='配置忽略文件'>
      <div>.gitignore 文件里指定的目录和文件，可以不被Git管理</div>
    </AlertPro>
    <AlertPro message='push报错: OpenSSL SSL_read: SSL_ERROR_SYSCALL, errno 10054'>
      <div>git config --global http.sslVerify "false"</div>
    </AlertPro>
    <AlertPro message='配置自动生成 Change-Id'>
      <CodeView language='bash'>
        {`
            #!/bin/sh
            # husky

            # Created by Husky v4.3.6 (https://github.com/typicode/husky#readme)
            #   At: 11/1/2021, 5:25:56 PM
            #   From: /Users/code/byte/frontend/node_modules/husky (undefined)

            #!/bin/sh
            # From Gerrit Code Review 2.6
            #
            # Part of Gerrit Code Review (http://code.google.com/p/gerrit/)
            #
            # Copyright (C) 2009 The Android Open Source Project
            #
            # Licensed under the Apache License, Version 2.0 (the "License");
            # you may not use this file except in compliance with the License.
            # You may obtain a copy of the License at
            #
            # http://www.apache.org/licenses/LICENSE-2.0
            #
            # Unless required by applicable law or agreed to in writing, software
            # distributed under the License is distributed on an "AS IS" BASIS,
            # WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
            # See the License for the specific language governing permissions and
            # limitations under the License.
            #

            unset GREP_OPTIONS

            CHANGE_ID_AFTER="Bug|Issue"
            MSG="$1"

            # Check for, and add if missing, a unique Change-Id
            #
            add_ChangeId() {
            clean_message=\`sed -e '
            /^diff --git a\\/.*/{
            s///
            q
            }
            /^Signed-off-by:/d
            /^#/d
            ' "$MSG" | git stripspace\`
            if test -z "$clean_message"
            then
            return
            fi

            # Does Change-Id: already exist? if so, exit (no change).
            if grep -i '^Change-Id:' "$MSG" >/dev/null
            then
            return
            fi

            id=\`_gen_ChangeId\`
            T="$MSG.tmp.$$"
            AWK=awk
            if [ -x /usr/xpg4/bin/awk ]; then
            # Solaris AWK is just too broken
            AWK=/usr/xpg4/bin/awk
            fi

            # How this works:
            # - parse the commit message as (textLine+ blankLine*)*
            # - assume textLine+ to be a footer until proven otherwise
            # - exception: the first block is not footer (as it is the title)
            # - read textLine+ into a variable
            # - then count blankLines
            # - once the next textLine appears, print textLine+ blankLine* as these
            # aren't footer
            # - in END, the last textLine+ block is available for footer parsing
            $AWK '
            BEGIN {
            # while we start with the assumption that textLine+
            # is a footer, the first block is not.
            isFooter = 0
            footerComment = 0
            blankLines = 0
            }

            # Skip lines starting with "#" without any spaces before it.
            /^#/ { next }

            # Skip the line starting with the diff command and everything after it,
            # up to the end of the file, assuming it is only patch data.
            # If more than one line before the diff was empty, strip all but one.
            /^diff --git a/ {
            blankLines = 0
            while (getline) { }
            next
            }

            # Count blank lines outside footer comments
            /^$/ && (footerComment == 0) {
            blankLines++
            next
            }

            # Catch footer comment
            /^\\[[a-zA-Z0-9-]+:/ && (isFooter == 1) {
            footerComment = 1
            }

            /]$/ && (footerComment == 1) {
            footerComment = 2
            }

            # We have a non-blank line after blank lines. Handle this.
            (blankLines > 0) {
            print lines
            for (i = 0; i < blankLines; i++) {
            print ""
            }

            lines = ""
            blankLines = 0
            isFooter = 1
            footerComment = 0
            }

            # Detect that the current block is not the footer
            (footerComment == 0) && (!/^\\[?[a-zA-Z0-9-]+:/ || /^[a-zA-Z0-9-]+:\\/\\//) {
            isFooter = 0
            }

            {
            # We need this information about the current last comment line
            if (footerComment == 2) {
            footerComment = 0
            }
            if (lines != "") {
            lines = lines "\\n";
            }
            lines = lines $0
            }

            # Footer handling:
            # If the last block is considered a footer, splice in the Change-Id at the
            # right place.
            # Look for the right place to inject Change-Id by considering
            # CHANGE_ID_AFTER. Keys listed in it (case insensitive) come first,
            # then Change-Id, then everything else (eg. Signed-off-by:).
            #
            # Otherwise just print the last block, a new line and the Change-Id as a
            # block of its own.
            END {
            unprinted = 1
            if (isFooter == 0) {
            print lines "\\n"
            lines = ""
            }
            changeIdAfter = "^(" tolower("'"$CHANGE_ID_AFTER"'") "):"
            numlines = split(lines, footer, "\\n")
            for (line = 1; line <= numlines; line++) {
            if (unprinted && match(tolower(footer[line]), changeIdAfter) != 1) {
            unprinted = 0
            print "Change-Id: I'"$id"'"
            }
            print footer[line]
            }
            if (unprinted) {
            print "Change-Id: I'"$id"'"
            }
            }' "$MSG" > "$T" && mv "$T" "$MSG" || rm -f "$T"
            }
            _gen_ChangeIdInput() {
            echo "tree \`git write-tree\`"
            if parent=\`git rev-parse "HEAD^0" 2>/dev/null\`
            then
            echo "parent $parent"
            fi
            echo "author \`git var GIT_AUTHOR_IDENT\`"
            echo "committer \`git var GIT_COMMITTER_IDENT\`"
            echo
            printf '%s' "$clean_message"
            }
            _gen_ChangeId() {
            _gen_ChangeIdInput |
            git hash-object -t commit --stdin
            }

            add_ChangeId

            . "$(dirname "$0")/husky.sh"
        `}
      </CodeView>
    </AlertPro>
  </AnchorCard>,
  <AnchorCard title='GitHub'>
    <AlertPro message='与Git的关系'>
      <div>GitHub 是 Git 的托管中心，与之类似的有码云(Gitee)</div>
      <div>局域网内可以用 GitLab，搭建自己的代码托管中心</div>
      <div>代码托管中心的功能是维护远程库</div>
    </AlertPro>
    <AlertPro message='Pages'>
      <div>Pages是GitHub提供的一个用来展示静态页面的功能，省下了开发者自己搭建服务器及域名，</div>
      <div>起初它的目的是为了允许用户自定义首页，用来代替默认的源码列表，</div>
      <div>一个简明易懂的网页，可以说明每一步应该怎么做，比看到一大堆源码好得多，</div>
      <div>现在多用于开发者搭建静态页面服务</div>
    </AlertPro>
    <AlertPro message='Actions'>
      <div>Actions是GitHub提供的一个用来触发工作流的功能</div>
      <div>可以在仓库中的代码有新push后触发一些操作</div>
    </AlertPro>
    <AlertPro message='使用工作流的操作'>
      <TabsPro
        items={[
          {
            label: '第一步',
            children: [
              <div>从 GitHub 上的仓库，在 '.github/workflows' 目录中创建一个名为 'github-actions-demo.yml'
                的新文件，</div>,
            ],
          },
          {
            label: '第二步',
            children: [
              <div>将以下 YAML 内容复制到 github-actions-demo.yml 文件中</div>,
              <CodeView language='html'>
                {`
              name: GitHub Actions Demo
              on: [push]
              jobs:
                Explore-GitHub-Actions:
                  runs-on: ubuntu-latest
                  steps:
                    - run: echo "🎉 The job was automatically triggered by a \${{github.event_name}} event."
                    - run: echo "🐧 This job is now running on a \${{runner.os}} server hosted by GitHub!"
                    - run: echo "🔎 The name of your branch is \${{github.ref}} and your repository is \${{
              github
              .repository
            }}."
                    - name: Check out repository code
                      uses: actions/checkout@v2
                    - run: echo "💡 The \${{github.repository}} repository has been cloned to the runner."
                    - run: echo "🖥️ The workflow is now ready to test your code on the runner."
                    - name: List files in the repository
                      run: |
                        ls \${{github.workspace}}
                    - run: echo "🍏 This job's status is \${{job.status}}."
            `}
              </CodeView>,
            ],
          },
          {
            label: '第三步',
            children: [
              <div>滚动到页面底部，然后选择 Create a new branch for this commit and start a pull
                request（为此提交创建一个新分支并开始拉取请求）
              </div>,
            ],
          },
          {
            label: '第四步',
            children: [
              <div>然后，若要创建拉取请求，请单击 Propose new file（提议新文件）</div>,
            ],
          },
        ]}
      />
    </AlertPro>
    <AlertPro message='使用 ssh key 的操作'>
      <TabsPro
        items={[
          {
            label: '第一步',
            children: [
              <div>用 git config 命令配置好账号和邮箱</div>,
            ],
          },
          {
            label: '第二步',
            children: [
              <div>生成 ssh 密钥</div>,
              <div>ssh-keygen -t rsa -C "你配置的邮箱"</div>,
              <div>一路回车，生成的密钥默认在 ~/.ssh/id_rsa.pub</div>,
              <div>注意：生成的时候可以不用设置密码，设置了密码在每次使用该密钥时，都会要求输入密码</div>,
            ],
          },
          {
            label: '第三步',
            children: [
              <div>在 GitHub 配置 ssh 密钥</div>,
              <div>打开 GitHub 的设置页面，点击左侧的 SSH and GPG keys，点击 New SSH key</div>,
              <div>在 Title 中输入一个标识，比如：work，</div>,
              <div>然后将刚才生成的 id_rsa.pub 中的内容复制到 Key 中，点击 Add SSH key</div>,
              <div>这样以后就可以用 ssh 的方式来 clone 项目了</div>,
            ],
          },
        ]}
      />
    </AlertPro>
  </AnchorCard>,
]
