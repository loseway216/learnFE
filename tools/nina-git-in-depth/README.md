- [Git In-depth Exercises](#git-in-depth-exercises)
  - [Git Best Practice](#git-best-practice)
  - [Workshop 地址](#workshop-地址)
  - [Git editor config](#git-editor-config)
  - [Exercise-1 Commit Tree Blob](#exercise-1-commit-tree-blob)
  - [Exercise-2 Staging and Stashing](#exercise-2-staging-and-stashing)
    - [Staging](#staging)
    - [Stash](#stash)
  - [Exercise-3 References](#exercise-3-references)
    - [Reference](#reference)
    - [Detached HEAD](#detached-head)
  - [Exercise-4 Merging and ReReRe](#exercise-4-merging-and-rerere)
    - [Fast-Forward](#fast-forward)
    - [git merge --no-ff](#git-merge---no-ff)
    - [处理 merge conflict](#处理-merge-conflict)
  - [Exercise-5 History and Diffs](#exercise-5-history-and-diffs)
    - [git log](#git-log)
    - [^ ~](#-)
    - [git show](#git-show)
    - [git diff](#git-diff)
    - [git branch](#git-branch)
  - [Exercise-6 Fixing Mistakes](#exercise-6-fixing-mistakes)
    - [git checkout](#git-checkout)
    - [git clean](#git-clean)
    - [git reset](#git-reset)
    - [git revert](#git-revert)
  - [Exercise-6 Rebase and Amend](#exercise-6-rebase-and-amend)
    - [git commit --amend](#git-commit---amend)
    - [git rebase](#git-rebase)
    - [rebase tips](#rebase-tips)
  - [Tips](#tips)

# Git In-depth Exercises

## Git Best Practice

> commit often, perfect later, publish once

## Workshop 地址

https://github.com/nnja/advanced-git

## Git editor config

- emacs: `emacs`
- vi: `vi or vim`
- atom: `atom --wait`
- sublime: `subl -n -w`
- vscode: `code --wait`

```bash
git config --global core.editor <YOUR_EDITOR>
```

[less 命令 cheat sheet](https://gist.github.com/nnja/5960fcfed3024a8bfdb272ee468e5c8e)

## Exercise-1 Commit Tree Blob

1. 初始化一个最简单仓库，新建一个 hello.txt
2. 用`git cat-file -t/-p`命令，观察 commit、tree、blob 之间的关系，通过 SHA1 生成的 id 来关联
3. 用`cat`命令观察 ` .git/HEAD` 指向了`.git/refs/heads/master` ，而 master 中是 commit id

## Exercise-2 Staging and Stashing

### Staging

1. 理解 Working Area、Staging Area、Repository 的区别
2. `git ls-files -s`命令查看 Staging Area 的文件，不会展示 working area 的变化
3. 习惯使用`git add -p`命令，可以用来跳过一些不想 add 到 staging area 的改动
4. add 到 staging area 之后想要反悔，用`git reset file`撤回到 working area，但保留了文件的改动，想要撤销改动再用`git checkout file`命令

### Stash

> stash 的典型场景是，dev 分支正在开发新功能，master 出现了需要紧急修复的 bug，此时无法切换到 master 分支，因为文件有冲突，要么 commit，要么 stash，要么 reset 或者 checkout 文件的变化。
> 最佳实践是，`git stash save "message" --include-untracked`未完成的工作，然后切换到 master 分支，新建一个 bugfix 分支，修复 bug 并 merge 到 master 分支后删除 bugfix 分支，然后切换到 dev 分支`stash pop`

1. stash 对于 working area 和 staging area 的变化都有效，但是想要 stash 新增的 untracked 的文件，需要使用`git stash --include-untracked`
2. `git stash save "message"`描述未完成的工作
3. `git stash branch <optional branch name>`创建一个新的分支
4. `git checkout <stash name> -- <file-name>`从 stash 中恢复单个文件，而不是 apply 整个 stash
5. 清空 stash 可以用 pop、drop、clear（清空所有）

## Exercise-3 References

### Reference

> tag、branch、HEAD 都是 reference，都指向 commit，HEAD 默认指向 branch，branch 会随着 commit 操作自动更新到最新的 commit 上，而 tag 不会移动，是 snapshot。annotated tag 比普通 tag 更加常用。

1. `git show-ref`命令查看所有的 references，`--heads | grep heads-name`，`--tags | grep tag-name`
2. `git tag <tag-name>`不带参数的命令打上 lightweight tag，指向了某次 commit
3. `git tag -a <tag-name> -m <message>`带参数的命令打上 annotated tag，指向了某次 commit 但储存了格外的信息因此 SHA1 值会变
4. `git tag --points-at <commit-id>`来查看某个 commit 上所有的 tag
5. `git show <tag-name>`查看某个 tag 的信息，千万不要打成`git tag show`，这样是打一个叫 show 的 tag
6. `git tag -d <tag-name>`来删除 tag

### Detached HEAD

> 永远不要手动 git checkout 到某个 commit-id ，HEAD 会直接指向这个 commit ，形成 detached HEAD。如果在此基础上进行了一次 commit，就创建了 dangling commit，HEAD 移到到最新的 commit，但是没有任何 branch 或者 tag 指向这个 commit。如果不为这个 dangling commit 手动创建新的分支，就会被垃圾回收。

1. `git log --oneline`命令可以看到这个 dangling commit，以及 HEAD 指向了它
2. `git checkout <branch-name>`会提示当前的 commit 没有任何 branch 指向它
3. `git branch <new-branch-name> <commit-id>`来 connect 这个 dangling commit

## Exercise-4 Merging and ReReRe

### Fast-Forward

> 创建 feature 分支后，如果 master 分支没有进行任何 commit，此时将 feature 分支 merge 到 master 分支上，相当于直接把 master 分支指向了 feature 分支指向的 commit。缺点是会形成线性的 commit，无法追踪 feature 分支，不利于定位 bug。

![before ff](./images/fast-forwad.png)

![after-ff](./images/after-ff.png)

### git merge --no-ff

> 保留 merge 历史，即便 master 没有任何 commit，merge 的时候强行创建一次 commit

![no-ff](./images/no-ff.png)

### 处理 merge conflict

> git rerere，用来处理长期存在的 feature branch(某段时间内你在对 codebase 进行 refactor 而其他人同时在进行改动) 或者 rebasing

1. `git merge feature` 遇到 conflict 时
2. `git config rerere.enabled true`，在 project 下开启 rerere
3. `git rerere diff`展示变化
4. 第一次手动处理 conflict 后，后面的 merge 会自动采取之前的方案，直接修改文件，但不会自动 add 和 commit

## Exercise-5 History and Diffs

### git log

> 场景：查找符合条件的 commit

1. commit message 的 bset practice：简短的一句话描+空白的一行+详细描述
2. `git log --name-status --follow --oneline file-name`，追踪某个文件的变化，包括 add、modified、rename 等操作
3. `git log --grep=i18n --author=nina --since=2.weeks`，查找符合条件的某个 commit，`--since="yesterday"`、`--since="2 weeks ago"`
4. `git log --diff-filter=R --find-renames`，查找有文件被 rename 的 commit
5. `git log --diff-filter=M --oneline`，查找文件被修改的 commit

### ^ ~

> 用来引用 commit

![hat&tilde](./images/hat&tilde.png)

---

### git show

> 场景：显示 commit 信息，更改了什么内容

1. `git show commit --stat --oneline`，查看 commit 信息
2. `git show <commit>:<file>`，查看某次 commit 下某个文件的信息

### git diff

1. `git diff`：unstaged changes
2. `git diff --staged`：staged changes
3. `git diff A B`，比较两个 branch 的区别

![diffAB](./images/diffAB.png)

---

### git branch

> 判断 branch 是否已经 merge

1. `git branch --merged master`
2. `git branch --no-merged master`

## Exercise-6 Fixing Mistakes

### git checkout

1. `git checkout -- <file_path>`，用 staging area 的文件内容，覆盖 working area 的内容
2. `git checkout <commit> -- <file_path>`，将 commit 中的该文件，更新到 staging area 和 working area
3. `git checkout <deleting_commit>^ -- <file_path>`，删除了某个文件想要恢复，比`git reset <commit> -- <file_path>`多一步覆盖 working area

![checkout-branch](./images/checkout-branch.png)

---

> -- flag 用来区分 branch 还是文件

![checkout-file](./images/checkout-file.png)

---

> checkout commit -- file 会将这个文件更新到当前 staging area 和 working area

![checkout-commit-file](./images/checkout-commit-file.png)

---

### git clean

> 清理 untracked files

1. `git clean -d --dry-run`，确认要 clean 的文件,`-d`包含目录
2. `git clean -d -f`，进行 clean

### git reset

> 永远不要对已经 push 或者 shared 的项目进行 rest，因为 reset 改变了 commit 的历史记录
> 操作 commit，HEAD 和 branch 一起移动，checkout 的区别是 branch 不动，HEAD 移动

1. `git reset --soft <commit>`
2. `git reset <commit>`，默认是`--mixed`
3. `git reset --hard <commit>`

> 操作 file，默认是 mixed 模式

1. `git reset -- <file>`，省略了 HEAD 参数，从 repository 到 staging area
2. `git reset <commit> -- <file>`，从目标 commit 的 repository 到 staging area

![reset-head](./images/reset-head.png)

---

> 操作文件

![reset-file](./images/reset-file.png)

---

> reset 之后，原来那个 commit 其实成了 dangling commit，如何返回： git reset ORIG_HEAD

![reset-orig](./images/reset-orig.png)

---

### git revert

> revert is SAFE reset
> reset 会改变 commit history，永远不要在 public 项目上 reset 再进行新的 commit
> revert 会新建 commit，用来撤销已经 push 或者说已经 shared 的操作

## Exercise-6 Rebase and Amend

### git commit --amend

> amend 可以修改上一次 commit，但是 SHA1 值仍然会变，其实是创建了一个新的 commit，旧的 commit 变成 dangling commit 被垃圾回收

1. 基于上一次 commit，`git add`添加到 staging area
2. `git commit --amend`

### git rebase

> rebase = give a commit a new parent(a new "base" commit)

> 场景 1：在 feature branch 上干活， master 分支上 pull 同事的更新，导致了 master 和 feature 分叉（diverged），最好经常将 master 上的更新通过 rebase 合到 feature 上来, 并处理 conflict，这样当 feature branch 最终 merged into master 的时候，尽可能减少 conflict，并且比创建一次 merge commit 更优雅。

1. `git checkout feature`，rebase 之前，切换到 feature 分支上
2. `git rebase master`，相当于在 master 上，进行了一次 feature 的 copy commit
3. `git log --oneline`观察 commit 记录，最新一次 commit 是 feature 的，再早一次 commit 的 master 的

![merge-vs-rebase](./images/merge-rebase.png)

---

> 场景 2：amend 只能修改上一次 commit，如何修改任意一次 commit？

1. `git add new files`，修改想要合并到目标 commit 的内容
2. `git commit --fixup <SHA>`，针对目标 commit 创建一次新的 commit，message 以“fixup！”开头
3. `git rebase -i --autosquash <SHA>^`
4. save and quit

> 场景 3：想把某个 commit 拆分成多个

1. `git rebase -i`
2. 选择 edit
3. `git reset HEAD~`
4. `git add`+`git commit`多次
5. `git rebase --continue`

> 场景 4：干活阶段应该尽可能 commit 多次，在 push 之前进行本地 rebase 进行合并，提供一次简洁干净的 commit

1. `git rebase -i HEAD~n`，n 就是想要操作的前几次 commit

![rebase-options](./images/rebase-options.png)

---

### rebase tips

1. `git rebase --abort`退出 rebase
2. rebase 之前，保险的做法是先 copy 一份当前的 branch`git branch my_branch_backup`，创建但不切换到该分支，如果搞砸了，通过`git reset --hard my_branch_backup`恢复

## Tips

1. `git checkout -`返回上一个 branch
