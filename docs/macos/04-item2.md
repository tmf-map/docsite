---
title: Iterm2
sidebar_label: 3. Iterm2
---

## Install

https://www.iterm2.com

## Settings

## Keymap

| Command | Keybindings | Note |
| ------- | ----------- | ---- |
|         | ⌘ D         |      |
|         | ⌘ ⇧ D       |      |
|         | ⌘ K         |      |
|         | ⌘ R         |      |
|         | ⌃ C         |      |
|         | ⌃ D         |      |

## Zsh

### Install

- https://github.com/robbyrussell/oh-my-zsh/wiki/Installing-ZSH

```bash
brew install zsh zsh-completions
```

To set zsh as your default shell, execute the following for macOS High Sierra

```bash
chsh -s /bin/zsh
```

### oh-my-zsh

```bash
sh -c "$(curl -fsSL https://raw.githubusercontent.com/robbyrussell/oh-my-zsh/master/tools/install.sh)"
```

### Theme: pure

https://github.com/sindresorhus/pure

<Img w="500" src='https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/K1Ds7b.jpg' alt='K1Ds7b'/>

```bash
brew install pure
```

```bash title=".zshrc"
autoload -U promptinit; promptinit
prompt pure
```

### Open via VSCode

```bash
code () { VSCODE_CWD="$PWD" open -n -b "com.microsoft.VSCode" --args $* ;}
```

### PATH

### Alias

```bash
alias szsh="source ~/.zshrc"
```

### Plugins

#### autojump

autojump 是一个命令行工具，它允许你可以直接跳转到你喜爱的目录，而不用管你现在身在何处。

1. 命令行安装:

```sh
brew install autojump
```

2. 在用户目录下的 `.zshrc`文件中找到 `plugins=""`这一行，设置为

```sh
plugins=(git autojump)
```

如果 `.zshrc`文件中没有这一行，则在文件的末尾添加

```sh
plugins=(git autojump)
```

3. 在 `.zshrc` 文件的末尾添加

```sh
[[ -s $(brew --prefix)/etc/profile.d/autojump.sh ]] && . $(brew --prefix)/etc/profile.d/autojump.sh
```

4. 最后命令行输入 `source ~/.zshrc` 使 `.zshrc` 文件生效。

:::tip

- 假设你现在需要进入用户目录下的 Music 文件夹，可以使用 ` autojump Music` 或者` j Music` 即可进入 Music 文件夹，但**前提是要用 cd Music 进入 Music 文件夹一次**，否则 autojump Music 或者 j Music 是无法生效的。
- autojump 有一个文件（里面存放着所有你去过的目录），你可以根据自己的情况，修改每一个路径权重(权重是根据你使用的频率决定)

:::

#### thefuck

<Img w="600" src='https://cosmos-x.oss-cn-hangzhou.aliyuncs.com/Gnq0J1.gif' alt='Gnq0J1'/>

```sh
brew install thefuck
```

You should place this command in your .bash_profile, .bashrc, .zshrc or other startup script:

```sh
eval $(thefuck --alias)
# You can use whatever you want as an alias, like for Mondays:
eval $(thefuck --alias FUCK)
```

Changes will be available only in a new shell session. To make them available immediately, run source `~/.bashrc` (or your shell config file like `.zshrc`.

If you want separate alias for running fixed command without confirmation you can use alias like:

```sh
alias fuck-it='export THEFUCK_REQUIRE_CONFIRMATION=False; fuck; export THEFUCK_REQUIRE_CONFIRMATION=True'
```

#### tree

mac 下默认是没有 tree 命令的，不过我们可以使用 find 命令模拟出 tree 命令的效果，如显示当前目录的 tree 的命令：

```bash
find . -print | sed -e 's;[^/]*/;|____;g;s;____|; |;g'
```

当然你也可以写一个别名来快速执行该命令，运行如下命令，将上面这个命令写到~/.bash_profile 里，以后直接运行 tree 命令就更方便了:

```bash title=".zshrc"
alias tree="find . -print | sed -e 's;[^/]*/;|____;g;s;____|; |;g'"
```

也可以使用  homebrew 安装 tree 命令行：

```bash
brew install tree
```

这样就在你的 mac 上安装了 tree 命令行了。

## References

1. [oh my zsh + autojump 的安装和使用](http://www.jianshu.com/p/51e71087f732)
1. [nvbn/thefuck](https://github.com/nvbn/thefuck)
