# Cobalt2 for macOS Terminal.app

An unofficial port of [Wes Bos](https://github.com/wesbos)'s **Cobalt2** theme
to the built-in macOS **Terminal.app**.

The colors come directly from his
[Cobalt2-iterm](https://github.com/wesbos/Cobalt2-iterm) repo, which only ships
a color scheme for iTerm2. All credit for the design goes to Wes Bos; this repo
only provides the Terminal.app profile and the converter that creates it.

## Install

```sh
git clone https://github.com/kiliw/cobalt2-terminal.git
open cobalt2-terminal/Cobalt2.terminal
```

Opening the file imports the **Cobalt2** profile into Terminal.app. To use it
for every new window, go to **Terminal → Settings → Profiles**, select
**Cobalt2** and click **Default**.

### Font

The profile uses **Inconsolata-dz for Powerline**, so the arrows in the Cobalt2
zsh prompt display correctly. Install it from
[powerline/fonts](https://github.com/powerline/fonts):

```sh
git clone https://github.com/powerline/fonts.git --depth=1
./fonts/install.sh
```

### zsh prompt

For the full look, also install Wes Bos's
[`cobalt2.zsh-theme`](https://github.com/wesbos/Cobalt2-iterm#step-by-step-installation)
for oh-my-zsh.

## Rebuild

`build.sh` downloads `cobalt2.itermcolors` from the upstream repo and converts
it again:

```sh
./build.sh
FONT=MesloLGS-NF-Regular SIZE=13 ./build.sh   # different font or size
```

The converter works with any `.itermcolors` file:

```sh
osascript -l JavaScript scripts/itermcolors2terminal.js \
  in.itermcolors out.terminal "Profile Name" FontPostScriptName 14
```

To print the colors and font stored in a `.terminal` file:

```sh
osascript -l JavaScript scripts/inspect-terminal.js Cobalt2.terminal
```

## What's converted

All 16 ANSI colors, plus the background, text, bold text, cursor and selection
colors. Some iTerm2 settings have no equivalent in Terminal.app and are left
out: badge, tab, link, underline and cursor guide colors, and the text color
under the cursor.

## License

The converter scripts are MIT licensed (see [LICENSE](LICENSE)). The Cobalt2
color scheme is by Wes Bos. If you're Wes and would like this changed or taken
down, please open an issue.
