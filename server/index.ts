import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import {resolve} from 'node:path';
import {AiRequest,Task} from './ai/schemas.js';
import {codexStatus,runAnthropic,runCodex,runOpenAI} from './ai/providers.js';

const app=express();
const port=Number(process.env.PORT||8787);
const host='127.0.0.1';
const webRoot=resolve(process.cwd(),'dist');

app.disable('x-powered-by');
app.use(cors({origin:['http://127.0.0.1:5173','http://localhost:5173',`http://${host}:${port}`]}));
app.use(express.json({limit:'512kb'}));
app.get('/api/health',(_q,s)=>s.json({ok:true,time:new Date().toISOString(),localOnly:true}));
app.get('/api/providers',async(_q,s)=>{const codex=await codexStatus();s.json([{id:'prompt-only',label:'프롬프트 복사',available:true,detail:'키 없이 항상 사용 가능'},{id:'codex-cli',label:'로컬 Codex CLI',...codex},{id:'openai',label:'OpenAI API',available:Boolean(process.env.OPENAI_API_KEY&&process.env.OPENAI_MODEL),detail:'서버 환경변수 필요 · 구독과 API 요금은 별개'},{id:'anthropic',label:'Anthropic API',available:Boolean(process.env.ANTHROPIC_API_KEY&&process.env.ANTHROPIC_MODEL),detail:'서버 환경변수 필요'}])});
app.get('/api/news/today',(_q,s)=>s.json({connected:false,items:[],message:'뉴스 검색 연결이 없어 실제 기사 목록을 제공하지 않습니다. 직접 입력을 이용하세요.'}));
app.post('/api/ai/:task',async(q,s)=>{try{Task.parse(q.params.task);const body=AiRequest.parse(q.body);if(body.provider==='prompt-only')return s.json({mode:'prompt-only',prompt:body.prompt});const result=body.provider==='codex-cli'?await runCodex(body.prompt):body.provider==='openai'?await runOpenAI(body.prompt):await runAnthropic(body.prompt);s.json({mode:body.provider,result})}catch(e){s.status(400).json({error:e instanceof Error?e.message:'요청을 처리하지 못했습니다.'})}});

app.use(express.static(webRoot,{index:'index.html'}));
app.use((q,s,next)=>{if(q.method==='GET'&&!q.path.startsWith('/api/'))return s.sendFile(resolve(webRoot,'index.html'));next()});
app.listen(port,host,()=>console.log(`김영숙부동산 블로그 스튜디오: http://${host}:${port}`));
