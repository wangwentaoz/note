梯子软件需要修改端口，下面两条命令是修改端口，只需要把最后的10808修改为梯子的端口就可以了。上次使用的梯子右键右下角的小图标，会有复制端口的地址
set http_proxy=socks5://127.0.0.1:10808
set https_proxy=socks5://127.0.0.1:10808
下面的两行命令是取消代理，等号后面不用写东西了
set http_proxy=
set https_proxy=

账户控制
  net user administrator /active:yes 开启管理员账户
  net user administrator /active:no  关闭管理员账户

## GitHub
1. 基本概念
   1. 仓库(Repository):即项目，在GitHub上开源一个项目，那就必须新建一个Repository。
   2. 收藏(Star):仓库主页star按钮
   3. 复制克隆项目(Fork):本意分叉，实际作用是把别人的仓库完完整整复制一份到我的仓库中，独立存在。
   4. 发送请求(Pull Request):基于自己Fork的项目的，如果自己做了一些改进，想要把自己的改进合并到原有项目中，这时就可以Pull Request，简称PR。原有项目创始人就可以看到，选择是否接受这个请求，合并到原仓库中。
   5. 关注(Watch):如果Watch某个项目，只要他有任何更新，第一时间会收到提醒
   6. 事物卡片(Issue)：发现代码有bug，但是目前没有成型代码需要讨论时使用issue，修复bug后就可以一个个close掉
2. 使用github
   1. 目的是借助GitHub托管项目代码。
   2. 翻墙（shadowsocks）
   3. 私有仓库收费
3. 仓库管理
   1. 搜索文件：快捷键t
4. Issues
   1. 发现代码bug，但是目前没有成型的代码，需要讨论商量解决办法，或者使用开源项目出现问题时使用。
5. 开源项目贡献流程
   1. 新建issues，提交使用问题或者建议或者想法
   2. pull request 提交修改的代码
      1. fork项目
      2. 修改自己仓库的项目代码
      3. 发起pull request
      4. 等待作者审核合并

## Git
1. 目的：通过git管理github托管项目代码
   1. git官网下载 https://www.git-scm.com/download/win
2. git工作区域
   1. git repository（git 仓库）：最终确定的文件保存到仓库，称为一个新版本，并且对其他人可见
   2. 暂存区：暂存已经修改的文件，最后统一提交到git仓库中
   3. 工作区（working directory）：添加、编辑、修改文件等动作
3. git本地操作
   1. git初始化
      1. 设置用户名：git config --global user.name 'metaphorwang'
      2. 设置用户名邮箱：git config --global user.email 'a974584968@163.com'
      3. 查看设置:git config --list      按q键退出
      4. 该设置在GitHub仓库主页显示谁提交了该文件
      5. ls 查看当前目录下的文件
      6. pwd 查看当前工作目录
      7. git status 查看git仓库状态
      8. git diff 文件名 查看文件被修改后的内容
      9. git diff HEAD -- readme.txt 查看工作区和版本库里面最新版本的区别
   2. 初始化一个新的git仓库
      1. 新建文件夹
      2. 在文件夹内初始化git，创建git仓库，命令： git init
   3. 向仓库中添加文件
      1. 从工作区添加到暂存区
         1. git add 文件名 
      2. 从暂存区添加到git repository(git仓库)
         1. git commit -m '描述'
      3. 修改文件后需要重新提交
   4. 版本回退
      1. 每次commit的都算一个版本，相当于游戏中的存档，可以进行回退。
      2. git log 查看历史记录中的内容
      3. git log --pretty=oneline 上面命令的精简版，省略了很多信息，里面主要是每次commit的版本号外加文件的名称
      4. 版本中带有HEAD表示的是当前的版本，上个版本就是HEAD^,上上个版本是HEAD^,往上一百个版本HEAD~100
      5. git reset --hard HEAD^ 回退到上一个版本
      6. git reset --hard 1094a 回退后想要返回最新的版本，1094a表示最新版本的版本号
      7. git reflog 查看之前的版本号
   5. 撤销修改
      1. git checkout -- 文件名   可以丢弃工作区的修改
         1. 一种是工作区文件自修改后还没有被放到暂存区，现在，撤销修改就回到和版本库一模一样的状态
         2. 另一种是工作区文件已经添加到暂存区后，又作了修改，现在，撤销修改就回到添加到暂存区后的状态。
         3. 总之，就是让这个文件回到最近一次git commit或git add时的状态。
      2. git reset HEAD 文件名   把暂存区的修改撤销掉（unstage），重新放回工作区
   6. 删除仓库文件
      1. 删除本地文件夹中的文件：使用Linux命令
         1. rm 文件名  
      2. 删除git中的文件
         1. git rm 文件名  
      3. 提交操作
         1. git commit -m '描述'
4. git远程仓库管理
   1. 作用：备份，实现代码共享集中化管理
   2. git克隆操作
      1. 目的：将远程仓库(GitHub上对应的项目)复制到本地。
      2. 之前是下载zip文件，现在我们可以复制它的地址，来下载到本地
         1. git clone https://github.com/metaphorwang/test.git 
   3. 之前我们将工作区文件添加到暂存区，之后又添加到git repository中。现在想将本地git仓库同步到git远程仓库中。
      1. 在本地的test仓库下运行命令
         1. git remote add origin https://github.com/metaphorwang/test.git 
         2. 实现把自己本地的仓库关联GitHub上的仓库
         3. 添加后，远程库的名字就是origin，这是Git默认的叫法，也可以改成别的，但是origin这个名字一看就知道是远程库。
         4. git remote -v 查看远程库信息
         5. 删除远程库，即解除了本地和远程的绑定关系，可以用git remote rm <name>命令，git remote rm origin
      2. 把本地库的所有内容推送到远程库上
         1. git pull --rebase origin main
            1. 首先需要从远程库拉取合并文件
         2. git push -u origin master
         3. 由于远程库是空的，我们第一次推送master分支时，加上了-u参数，Git不但会把本地的master分支内容推送的远程新的master分支，还会把本地的master分支和远程的master分支关联起来，在以后的推送或者拉取时就可以简化命令。
         4. git push origin master
         5. 从现在起，只要本地作了提交，就可以通过上面命令把本地master分支的最新修改推送至GitHub。
5. 分支管理 
   1. git config --global init.defaultBranch main 将 Git 默认分支从 master 修改为 main
   2. 创建与合并分支
      1. 创建了一个分支，别人看不到，还继续在原来的分支上正常工作，想提交就提交，直到开发完毕后，再一次性合并到原来的分支上，这样，既安全，又不影响别人工作。
      2. git switch -c dev // git checkout -b dev
         1. 创建并切换到新的dev分支，相当于以下两条命令
            1. git branch dev
            2. git checkout dev
      3. git branch  查看当前分支
         1. 该命令列出所有分支，当前分支前面会标一个*号。
         2. 然后，我们就可以在dev分支上正常提交
      4. git switch master// git checkout master
         1. dev分支的工作完成，我们就可以切换回master分支
      5. git merge dev
         1. git merge命令用于合并指定分支到当前分支。这里是把dev分支的工作成果合并到master分支上
      6. git branch -d dev
         1. 删除dev分支
   3. 解决冲突
      1. 当我们创建一个分支，修改后，返回到master分支，在master上进行修改，这时想要合并分支就会出现冲突。
      2. 这时我们需要手动编辑master分支，add，commit，最后删除我们创建的分支
      3. 解决冲突就是把Git合并失败的文件手动编辑为我们希望的内容，再提交。
   4. 分支管理策略
      1. 通常，合并分支时，如果可能，Git会用Fast forward模式，但这种模式下，删除分支后，会丢掉分支信息。
      2. 如果要强制禁用Fast forward模式，Git就会在merge时生成一个新的commit，这样，从分支历史上就可以看出分支信息。我们可以使用--no-ff方式的合并。
      3. 首先，仍然创建并切换dev分支，修改readme.txt文件，并提交一个新的commit，现在，我们切换回master。
         1. git merge --no-ff -m "merge with no-ff" dev  合并dev分支，--no-ff参数，表示禁用Fast forward
         2. 因为本次合并要创建一个新的commit，所以加上-m参数，把commit描述写进去
         3. 这时不仅有合并后的分支，原来的分支也被保留，需要手动删除。
      4. 分支策略
         1. 首先，master分支应该是非常稳定的，也就是仅用来发布新版本，平时不能在上面干活
         2. 干活都在dev分支上，也就是说，dev分支是不稳定的，到某个时候，比如1.0版本发布时，再把dev分支合并到master上，在master分支上发布1.0版本。
         3. 每个人都在dev分支上干活，每个人都有自己的分支，时不时地往dev分支上合并就可以了。
   5. Bug分支
      1. 每个bug都可以通过一个新的临时分支来修复，修复后，合并分支，然后将临时分支删除。
      2. 当接到一个修复一个bug的任务时，想创建一个分支来修复它，但是当前正在dev上进行的工作还没有提交，预计完成还需1天时间。
      3. Git还提供了一个stash功能，可以把当前工作现场“储藏”起来，等以后恢复现场后继续工作。
         1. git stash
         2. 现在，用git status查看工作区，就是干净的（除非有没有被Git管理的文件），因此可以放心地创建分支来修复bug。
         3. 工作完成， git switch dev
         4. 两种恢复方法：一是用git stash apply恢复，但是恢复后，stash内容并不删除，你需要用git stash drop来删除；另一种方式是用git stash pop，恢复的同时把stash内容也删了
   6. Feature分支
      1. 添加一个新功能时，你肯定不希望因为一些实验性质的代码，把主分支搞乱了，所以，每添加一个新功能，最好新建一个feature分支，在上面开发，完成后，合并，最后，删除该feature分支。
      2. 接到了一个新任务，完成一个新功能
         1. git switch -c feature-vulcan 切换到新分支
         2. git add vulcan.py   ；  git commit -m "add feature vulcan"
         3. git switch dev  切回dev，准备合并
         4. 一切顺利的话，feature分支和bug分支是类似的，合并，然后删除。但是接到上级命令，因经费不足，新功能必须取消。虽然白干了，但是这个包含机密资料的分支还是必须就地销毁
         5. git branch -D feature-vulcan
            1. feature-vulcan分支还没有被合并，如果删除，将丢失掉修改，如果要强行删除，需要使用大写的-D参数。
   7. 多人协作
      1. 当从远程仓库克隆时，实际上Git自动把本地的master分支和远程的master分支对应起来了，并且，远程仓库的默认名称是origin。要查看远程库的信息，用git remote
      2. 推送分支
         1. 把该分支上的所有本地提交推送到远程库。推送时，要指定本地分支，这样，Git就会把该分支推送到远程库对应的远程分支上： git push origin master
         2. 如果要推送其他分支，比如dev，就改成： git push origin dev
         3. 但是，并不是一定要把本地分支往远程推送
            1. master分支是主分支，因此要时刻与远程同步；
            2. dev分支是开发分支，团队所有成员都需要在上面工作，所以也需要与远程同步；
            3. bug分支只用于在本地修复bug，就没必要推到远程了，除非老板要看看你每周到底修复了几个bug；
            4. feature分支是否推到远程，取决于你是否和你的小伙伴合作在上面开发。
      3. 抓取分支
         1. 多人协作时，大家都会往master和dev分支上推送各自的修改。
         2. 从远程库clone时，默认情况下，你的小伙伴只能看到本地的master分支。
         3. 要在dev分支上开发，就必须创建远程origin的dev分支到本地，于是他用这个命令创建本地dev分支 
            1. git checkout -b dev origin/dev
            2. 现在，他就可以在dev上继续修改，然后，时不时地把dev分支push到远程
            3. git push origin dev
         4. 你的小伙伴已经向origin/dev分支推送了他的提交，而碰巧你也对同样的文件作了修改，并试图推送，推送失败，因为你的小伙伴的最新提交和你试图推送的提交有冲突，解决办法也很简单，Git已经提示我们，先用git pull把最新的提交从origin/dev抓下来，然后，在本地合并，解决冲突，再推送
         5. git pull也失败了，原因是没有指定本地dev分支与远程origin/dev分支的链接，根据提示，设置dev和origin/dev的链接
            1. git branch --set-upstream-to=origin/dev dev
            2. branch 'main' set up to track 'origin/main'. 表示成功
         6. 再pull，这回git pull成功，但是合并有冲突，需要手动解决，解决的方法和分支管理中的解决冲突完全一样。解决后，提交，再push
      4. 因此，多人协作的工作模式通常是这样：
         1. 首先，可以试图用git push origin <branch-name>推送自己的修改；
         2. 如果推送失败，则因为远程分支比你的本地更新，需要先用git pull试图合并；
         3. 如果合并有冲突，则解决冲突，并在本地提交；
         4. 没有冲突或者解决掉冲突后，再用git push origin <branch-name>推送就能成功！
         5. 如果git pull提示no tracking information，则说明本地分支和远程分支的链接关系没有创建，用命令git branch --set-upstream-to <branch-name> origin/<branch-name>。
         6. 这就是多人协作的工作模式，一旦熟悉了，就非常简单。
   8. Rebase
      1. 多人在同一个分支上协作时，很容易出现冲突。即使没有冲突，后push的童鞋不得不先pull，在本地合并，然后才能push成功。
      2. git rebase
6. 标签管理
   1. 发布一个版本时，我们通常先在版本库中打一个标签（tag），这样，就唯一确定了打标签时刻的版本。将来无论什么时候，取某个标签的版本，就是把那个打标签的时刻的历史版本取出来。所以，标签也是版本库的一个快照。
   2. Git的标签虽然是版本库的快照，但其实它就是指向某个commit的指针（跟分支很像对不对？但是分支可以移动，标签不能移动），所以，创建和删除标签都是瞬间完成的。
   3. 创建标签
      1. 在Git中打标签非常简单，首先，切换到需要打标签的分支上
         1. git branch
      2. 然后，敲命令git tag <name>就可以打一个新标签：
         1. git tag v1.0
      3. 可以用命令git tag查看所有标签。
      4. 默认标签是打在最新提交的commit上的。有时候，如果忘了打标签，就可以找到历史提交的commit id，然后打上就可以了：
         1. git log --pretty=oneline --abbrev-commit 查看commit id命令
         2. git tag v0.9 f52c633
      5. 标签不是按时间顺序列出，而是按字母排序的。可以用git show <tagname>查看标签信息：
         1. git show v0.9
      6. 还可以创建带有说明的标签，用-a指定标签名，-m指定说明文字：
         1. git tag -a v0.1 -m "version 0.1 released" 1094adb
   4. 注意：标签总是和某个commit挂钩。如果这个commit既出现在master分支，又出现在dev分支，那么在这两个分支上都可以看到这个标签。
   5. 操作标签
      1. 如果标签打错了，也可以删除。因为创建的标签都只存储在本地，不会自动推送到远程。所以，打错的标签可以在本地安全删除。
         1. git tag -d v0.1
      2. 如果要推送某个标签到远程，使用命令git push origin <tagname>：
         1. git push origin v1.0
      3. 一次性推送全部尚未推送到远程的本地标签：
         1. git push origin --tags
      4. 如果标签已经推送到远程，要删除远程标签就麻烦一点，先从本地删除
         1. git tag -d v0.9
         2. 然后，从远程删除。删除命令也是push，但是格式如下：
         3. git push origin :refs/tags/v0.9
7. 本地仓库有文件，远程仓库也有文件，正确姿势：
   1. git remote add origin 远程仓库地址
   2. git pull origin master --allow-unrelated-histories
   3. git branch --set-upstream-to=origin/master master
   4. git push