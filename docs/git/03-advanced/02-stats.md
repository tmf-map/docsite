---
title: Stats
---

Imaging that you want to know the committed code lines in the past one year, meanwhile exclude some auto-generated large files, take below example as your reference:

```bash
git log --since=1.year.ago --pretty=tformat: --numstat -- . ":(exclude)src/resources" ":(exclude)static" ":(exclude)package-lock.json" ":(exclude)yarn.lock" | awk '{ add += $1; subs += $2; loc += $1 - $2 } END { printf "added lines: %s, removed lines: %s, total lines: %s\n", add, subs, loc }' -
```