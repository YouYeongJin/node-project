# node-project

# 스크립트는 항상 root 디렉토리에서 사용 해야함

# ============================================

# 설치법 각각 frontend / backend 디렉토리에 가서 npm install

# 실행 법 > npm run "script"

# 스크립트 목록

# --linux--

# "react-build" > linux 버전 frontend 빌드

# "express-build" > linux 버전 frontend 빌드

# "all-build" > linux 버전 frontened/backend 둘다 빌드

# --window--

# "win-react-build" > window 버전 frontend 빌드

# "win-express-build" > window 버전 backend 빌드

# "all-win-build" > window 버전 frontend/backend 둘다 빌드

# --실행 스크립트

# "all-start" > 두개서버 동시시작

# "react-start" > frontend 시작

# "express-start" > backend 시작

# ============================================

# ==============디버깅 설정======================

# .vscode > launch.json

#

#

# {

# // Use IntelliSense to learn about possible attributes.

# // Hover to view descriptions of existing attributes.

# // For more information, visit: https://go.microsoft.com/fwlink/?linkid=830387

# "version": "0.2.0",

# "configurations": [

# {

# "type": "node",

# "request": "launch",

# "name": "Launch Program",

# "program": "\${workspaceFolder}/backend/app.ts",

# "sourceMaps": true,

# "preLaunchTask": "npm: express-build",

# "outFiles": [

# "\${workspaceFolder}/build/backend/\*_/_.js"

# ]

# }

# ]

# }
