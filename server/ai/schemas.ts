import {z} from 'zod';
export const Task=z.enum(['suggestKeywords','suggestEmphasis','generateTitles','generateOutline','generateArticle','evaluateArticle','reviseArticle']);
export const AiRequest=z.object({provider:z.enum(['prompt-only','codex-cli','openai','anthropic']),draft:z.record(z.string(),z.unknown()),prompt:z.string().min(1).max(120000)});
export const GenericResult=z.record(z.string(),z.unknown());
export type TaskName=z.infer<typeof Task>;
export const outputSchema={type:'object',additionalProperties:true};
