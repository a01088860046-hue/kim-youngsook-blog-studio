# 김영숙부동산 블로그 스튜디오

공인중개사가 근거와 직접 경험을 바탕으로 네이버 블로그용 정보성 글을 기획·편집·보관하는 로컬 웹앱입니다. 상위노출을 보장하지 않으며 최종 사실 확인은 사람이 수행해야 합니다.

## Windows 11 실행

1. Node.js LTS(22 이상)를 설치합니다.
2. PowerShell에서 프로젝트 폴더로 이동합니다.
3. `npm install`
4. `npm run dev`
5. Chrome 또는 Edge에서 `http://127.0.0.1:5173`을 엽니다.

### 가장 쉬운 Windows 실행

`김영숙부동산-시작.cmd`를 더블클릭하면 프로덕션 빌드를 백그라운드에서 시작하고 `http://127.0.0.1:8787`을 엽니다. 이 방식은 Codex 작업 세션이 끝나도 서버가 유지됩니다. 종료할 때는 `김영숙부동산-종료.cmd`를 더블클릭하세요.

빌드: `npm run build` / 테스트: `npm test` / 타입 검사: `npm run typecheck`

## AI 모드

- 프롬프트 복사·결과 붙여넣기: 키 없이 항상 사용 가능합니다.
- Codex CLI: `codex login` 후 설정에서 사용 가능 상태를 확인합니다. 서버는 고정 인자, stdin, read-only sandbox, 타임아웃과 출력 제한을 적용합니다. 실제 사용 가능 범위는 계정 플랜·정책·한도에 따라 달라질 수 있습니다.
- OpenAI API: `.env`의 `OPENAI_API_KEY`, `OPENAI_MODEL`을 설정합니다.
- Anthropic API: `.env`의 `ANTHROPIC_API_KEY`, `ANTHROPIC_MODEL`을 설정합니다.

ChatGPT/Claude 구독료와 API 사용료는 별개일 수 있습니다. 키는 서버 환경변수에서만 읽고 브라우저·localStorage·Git에 저장하지 않습니다.

## 데이터와 한계

텍스트·메타데이터는 브라우저 localStorage, 업로드 이미지는 IndexedDB에 저장됩니다. JSON 내보내기로 백업하세요. 뉴스 API가 연결되지 않으면 가짜 기사를 만들지 않고 직접 입력만 제공합니다. `블로그포스팅 프롬프트.txt`는 발견되지 않아 추가 가이드 기준을 적용하지 않았습니다. 네이버 자동 발행은 범위에서 제외했습니다.

Codex CLI 자동 호출은 로컬 단일 사용자용입니다. 서버는 반드시 `127.0.0.1`에만 바인딩하세요.

## GitHub Pages 배포

`main` 브랜치에 푸시하면 `.github/workflows/deploy-pages.yml`이 테스트와 빌드를 실행하고 GitHub Pages에 배포합니다.

GitHub Pages는 정적 호스팅이므로 랜딩 화면, 단계별 편집, 브라우저 저장, 프롬프트 복사 모드를 사용할 수 있습니다. 로컬 Express 서버가 필요한 Codex CLI·OpenAI API·Anthropic API·뉴스 연동은 로컬 실행에서만 사용할 수 있습니다.
