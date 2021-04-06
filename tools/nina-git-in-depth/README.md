# Git In-depth

## github

https://github.com/nnja/advanced-git

## Exercises

### Exercise1-Commit、Tree、Blob

1. 初始化一个最简单仓库，新建一个 hello.txt
2. 用`git cat-file -t/-p`命令，观察 commit、tree、blob 之间的关系，通过 SHA1 生成的 id 来关联
3. 用`cat`命令观察 ` .git/HEAD` 指向了`.git/refs/heads/master` ，而 master 中是 commit id

### Exercise2-Staging and Stashing

1. 理解 Working Area、Staging Area、Repository 的区别
2. `git ls-files -s`命令查看 Staging Area 的文件，不会展示 working area 的变化
3. 习惯使用`git add -p`命令，可以用来跳过一些不想要 staging area 的改动
4. add 到 staging area 之后想要反悔，用`git reset file`撤回到 working area，但保留了文件的改动，想要撤销改动再用`git checkout file`命令

> stash 的典型场景是，dev 分支正在开发新功能，master 出现了需要紧急修复的 bug，此时无法切换到 master 分支，因为文件有冲突，要么 commit，要么 stash，要么 reset 或者 checkout 文件的变化。
> 最佳实践是，`git stash save "message" --include-untracked`未完成的工作，然后切换到 master 分支，新建一个 bugfix 分支，修复 bug 并 merge 到 master 分支后删除 bugfix 分支，然后切换到 dev 分支`stash pop`

1. stash 对于 working area 和 staging area 的变化都有效，但是想要 stash 新增的 untracked 的文件，需要使用`git stash --include-untracked`
2. `git stash save "message"`描述未完成的工作
3. `git stash branch <optional branch name>`创建一个新的分支
4. `git checkout <stash name> -- <file-name>`从 stash 中恢复单个文件，而不是 apply 整个 stash
5. 清空 stash 可以用 pop、drop、clear（清空所有）

### Exercise3-References

> tag、branch、HEAD 都是 reference，都指向 commit，HEAD 默认指向 branch，branch 会随着 commit 操作自动更新到最新的 commit 上，而 tag 不会移动，是 snapshot。annotated tag 比普通 tag 更加常用。

1. `git show-ref`命令查看所有的 references，`--heads | grep heads-name`，`--tags | grep tag-name`
2. `git tag <tag-name>`不带参数的命令打上 lightweight tag，指向了某次 commit
3. `git tag -a <tag-name> -m <message>`带参数的命令打上 annotated tag，指向了某次 commit 但储存了格外的信息因此 SHA1 值会变
4. `git tag --points-at <commit-id>`来查看某个 commit 上所有的 tag
5. `git show <tag-name>`查看某个 tag 的信息，千万不要打成`git tag show`，这样是打一个叫 show 的 tag
6. `git tag -d <tag-name>`来删除 tag

> 永远不要手动 git checkout 到某个 commit-id ，HEAD 会直接指向这个 commit ，形成 detached HEAD。如果在此基础上进行了一次 commit，就创建了 dangling commit，HEAD 移到到最新的 commit，没有任何 branch 或者 tag 指向这个 commit。要么被垃圾回收，要么为这个 dangling commit 手动创建新的分支。

1. `git log --oneline`命令可以看到这个 dangling commit，以及 HEAD 指向了它
2. `git checkout <branch-name>`会提示当前的 commit 没有任何 branch 指向它
3. `git branch <new-branch-name> <commit-id>`来 connect 这个 dangling commit
