## 터미널 Colorize
SSH 혹은 root 권한을 가지는 터미널에서 ls와 같은 모든 Color 효과가 사라지는 현상 해결

- bashrc(Bourne Again Shell)
  - root 권한을 가진 터미널의 symbol은 #이며, 일반 사용자는 $로 표기
  - 홈 디렉토리의 bashrc는 실행 시 자동으로 동기화
- bashrc 설정
  1. bashrc 실행
        ```
        # vi ~/.bashrc
        ```
  2. bashrc에 아래의 Colorize 설정 내용을 최하단에 삽입
        ```bash
        # enable color support of ls and also add handy aliases
        if [ -x /usr/bin/dircolors ]; then
            test -r ~/.dircolors && eval "$(dircolors -b ~/.dircolors)" || eval "$(dircolors -b)"
            alias ls='ls --color=auto'
            #alias dir='dir --color=auto'
            #alias vdir='vdir --color=auto'

            alias grep='grep --color=auto'
            alias fgrep='fgrep --color=auto'
            alias egrep='egrep --color=auto'
        fi
        ```
  3. bashrc 동기화
        ```
        # source ~/.bashrc
        ```

