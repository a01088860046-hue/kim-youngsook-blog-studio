export type Tone='~해요'|'~습니다'|'~한다'|'~과거형';
export type Source={id:string;title:string;organization:string;publishedAt:string;url:string;excerpt:string;verified:boolean};
export type OutlineSection={id:string;type:string;heading:string;notes:string;order:number;sourceIds:string[];imageIdeas:string[]};
export type EvaluationItem={name:string;max:number;score:number;reason:string;fix:string};
export type Evaluation={items:EvaluationItem[];total:number;grade:string;topFixes:string[];evaluatedAt:string;evaluatorType:string};
export type OfficeProfile={businessName:string;address:string;representative:string;phone:string;registrationNumber:string;position:'상단'|'하단'|'미표시'};
export type Draft={schemaVersion:1;id:string;createdAt:string;updatedAt:string;author:string;topic:string;title:string;titles:string[];audience:string;keywords:string[];emphasis:string[];tone:Tone;experienceMemo:string;sources:Source[];informationDate:string;targetLength:number;officeProfile:OfficeProfile;outline:OutlineSection[];article:string;metaDescription:string;images:Array<{id:string;caption:string;alt:string;blobRef?:string}>;evaluation?:Evaluation;status:'초안'|'완료'};
export type ProviderInfo={id:'prompt-only'|'codex-cli'|'openai'|'anthropic';label:string;available:boolean;detail:string};
