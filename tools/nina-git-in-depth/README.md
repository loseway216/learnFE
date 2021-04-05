# Git In-depth

## github

https://github.com/nnja/advanced-git

## Exercises

### Exercise1-Commit tree blob

1. 初始化一个最简单仓库，新建一个 hello.txt
2. 用`git cat-file -t/-p`命令，观察 commit、tree、blob 之间的关系，通过 SHA1 生成的 id 来关联
3. 用`cat`命令观察 ` .git/HEAD` 指向了`.git/refs/heads/master` ，而 master 中是 commit id

### Exercise2-Staging and Stashing

1. 理解 Working Area、Staging Area、Repository 的区别
2. `git ls-files -s`命令查看 Staging Area 的文件，不会展示 working area 的变化
3. 习惯使用`git add -p`命令，可以用来跳过一些不想要 staging area 的改动
4. add 到 staging area 之后想要反悔，用`git reset file`撤回到 working area，但保留了文件的改动，想要撤销改动再用`git checkout file`命令
5. stash 对于 working area 和 staging area 的变化都有效，但是想要 stash 新增的 untracked 的文件，需要使用`git stash --include-untracked`
6. `git stash save "message"`描述未完成的工作
7. `git stash branch <optional branch name>`创建一个新的分支
8. `git checkout <stash name> -- <filename>`从 stash 中恢复单个文件，而不是 apply 整个 stash
9. 清空 stash 可以用 pop、drop、clear（清空所有）

stash 的典型场景是，dev 分支正在开发新功能，master 出现了需要紧急修复的 bug，此时无法切换到 master 分支，因为文件有冲突，要么 commit，要么 stash，要么 reset 或者 checkout 文件的变化。
最佳实践是，`git stash save "message" --include-untracked`未完成的工作，然后切换到 master 分支，新建一个 bugfix 分支，修复 bug 并 merge 到 master 分支后删除 bugfix 分支，然后切换到 dev 分支`stash pop`

### Exercise3-References
