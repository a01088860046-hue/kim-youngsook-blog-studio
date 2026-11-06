import type {Draft} from '../types';
const KEY='landlanguage:v1:drafts',ACTIVE='landlanguage:v1:active',THEME='landlanguage:theme';
export function safeParse<T>(raw:string|null,fallback:T):T{try{return raw?JSON.parse(raw) as T:fallback}catch{return fallback}}
export function loadDrafts():Draft[]{return safeParse(localStorage.getItem(KEY),[])}
export function saveDrafts(drafts:Draft[]){try{localStorage.setItem(KEY,JSON.stringify(drafts));return true}catch{return false}}
export function loadActive():Draft|null{return safeParse(localStorage.getItem(ACTIVE),null)}
export function saveActive(draft:Draft){try{localStorage.setItem(ACTIVE,JSON.stringify(draft));return true}catch{return false}}
export function getTheme(){return localStorage.getItem(THEME)||'light'}export function setTheme(v:string){localStorage.setItem(THEME,v)}
const DB='landlanguage-media',STORE='blobs';
function db():Promise<IDBDatabase>{return new Promise((resolve,reject)=>{const r=indexedDB.open(DB,1);r.onupgradeneeded=()=>r.result.createObjectStore(STORE);r.onsuccess=()=>resolve(r.result);r.onerror=()=>reject(r.error)})}
export async function putBlob(id:string,blob:Blob){const d=await db();await new Promise<void>((ok,no)=>{const t=d.transaction(STORE,'readwrite');t.objectStore(STORE).put(blob,id);t.oncomplete=()=>ok();t.onerror=()=>no(t.error)})}
export async function getBlob(id:string){const d=await db();return new Promise<Blob|undefined>((ok,no)=>{const r=d.transaction(STORE).objectStore(STORE).get(id);r.onsuccess=()=>ok(r.result);r.onerror=()=>no(r.error)})}
export async function deleteBlob(id:string){const d=await db();return new Promise<void>((ok,no)=>{const t=d.transaction(STORE,'readwrite');t.objectStore(STORE).delete(id);t.oncomplete=()=>ok();t.onerror=()=>no(t.error)})}
