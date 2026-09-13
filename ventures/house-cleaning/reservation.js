'use strict';
const services = Object.freeze({
 bath: {name:'浴室クリーニング',price:15400,scope:'床面積4㎡まで／目安3時間。浴槽エプロン・配管・換気設備の内部などは対象外。'},
 kitchen: {name:'キッチンクリーニング',price:14300,scope:'幅3mまで／目安3時間。レンジフード、収納内部、家電内部は対象外。'},
 hood: {name:'レンジフードクリーニング',price:13200,scope:'幅90cmまで／目安2.5時間。取り外せるファンが対象。ダクト内部は対象外。'},
 set: {name:'キッチン＋レンジフード',price:26400,scope:'各標準サイズ1か所／目安4.5時間。各単品と同じ作業範囲。'},
 consult: {name:'内容を相談したい',price:null,scope:'清掃箇所・大きさ・素材を確認して料金をご案内します。'}
});
function serviceInfo(key) {
 if (!Object.hasOwn(services,key)) throw new Error('サービスを選択してください。');
 return services[key];
}
function tokyoDay(now = new Date()) {
 const parts = new Intl.DateTimeFormat('en-US',{timeZone:'Asia/Tokyo',year:'numeric',month:'2-digit',day:'2-digit'}).formatToParts(now);
 const val = type => parts.find(p=>p.type===type).value;
 return `${val('year')}-${val('month')}-${val('day')}`;
}
function nextDay(day) {const d=new Date(`${day}T00:00:00Z`);d.setUTCDate(d.getUTCDate()+1);return d.toISOString().slice(0,10);}
function dateError(value,today=tokyoDay()) {
 if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return '希望日を入力してください。';
 const d=new Date(`${value}T00:00:00Z`);
 if (!Number.isFinite(d.getTime()) || d.toISOString().slice(0,10)!==value) return '有効な日付を入力してください。';
 if(value<=today)return '翌日以降の日付を選択してください。';
 if([0,3].includes(d.getUTCDay()))return '水曜・日曜以外の日付を選択してください。';
 return '';
}
if(typeof module!=='undefined') module.exports={serviceInfo,tokyoDay,nextDay,dateError};
if(typeof document!=='undefined') {
 const byId=id=>document.getElementById(id);
 const form=byId('booking'), service=byId('service'), date=byId('date');
 const priceText=info=>info.price===null?'内容確認後にお見積もり':new Intl.NumberFormat('ja-JP').format(info.price)+'円';
 function updateService() {
  if(!Object.hasOwn(services,service.value)){byId('estimate').textContent='サービスを選択してください';byId('scope').textContent='内容を確認したうえで、お見積もりをご案内します。';return;}
  const info=serviceInfo(service.value);byId('estimate').textContent=priceText(info);byId('scope').textContent=info.scope;
 }
 function checkDate(){date.min=nextDay(tokyoDay());date.setCustomValidity(date.value?dateError(date.value):'');}
 service.addEventListener('change',updateService);date.addEventListener('input',checkDate);checkDate();
 const selected=new URLSearchParams(location.search).get('service');
 if(selected&&Object.hasOwn(services,selected))service.value=selected;
 updateService();
 form.addEventListener('submit',event=>{
  event.preventDefault();checkDate();
  byId('name').setCustomValidity(byId('name').value.trim()?'':'お名前を入力してください。');
  if(!form.reportValidity())return;
  const info=serviceInfo(service.value), data=new FormData(form);
  const rows=[['サービス',info.name],['標準料金の目安',priceText(info)],['対象範囲',info.scope],['お住まいの区',data.get('ward')],['住居の種類',data.get('home')],['駐車スペース',data.get('parking')],['希望日時',`${data.get('date')} ${data.get('time')}`],['お名前',data.get('name')],['メールアドレス',data.get('email')],['ご相談内容',data.get('message')||'なし']];
  byId('summary').replaceChildren();
  for(const [label,value] of rows){const dt=document.createElement('dt'),dd=document.createElement('dd');dt.textContent=label;dd.textContent=value;byId('summary').append(dt,dd);}
  form.hidden=true;byId('review').hidden=false;byId('review-heading').focus();
 });
 byId('name').addEventListener('input',()=>byId('name').setCustomValidity(''));
 byId('edit').addEventListener('click',()=>{byId('review').hidden=true;form.hidden=false;service.focus();});
 byId('complete').addEventListener('click',()=>{byId('review').hidden=true;byId('done').hidden=false;byId('done-heading').focus();});
 byId('restart').addEventListener('click',()=>{form.reset();byId('summary').replaceChildren();byId('name').setCustomValidity('');byId('done').hidden=true;form.hidden=false;checkDate();updateService();service.focus();});
 byId('review-button').disabled=false;byId('review-button').type='submit';
 if(document.modelContext?.registerTool){
  const lifecycle=new AbortController();
  const tool={name:'select_cleaning_service',title:'清掃サービスを選択する',description:'確認用予約フォームのサービスを選び、画面の標準料金を更新する。予約・送信は行わない。',inputSchema:{type:'object',properties:{service:{type:'string',enum:Object.keys(services)}},required:['service'],additionalProperties:false},annotations:{readOnlyHint:false,untrustedContentHint:false},execute(input){if(!input||typeof input!=='object'||Object.keys(input).length!==1||typeof input.service!=='string')throw new Error('serviceのみ指定してください。');const info=serviceInfo(input.service);if(form.hidden)throw new Error('入力画面に戻ってから選択してください。');service.value=input.service;updateService();return {service:info.name,price:info.price,currency:'JPY',demo:true};}};
  try{Promise.resolve(document.modelContext.registerTool(tool,{signal:lifecycle.signal})).catch(()=>{});}catch{}
  window.addEventListener('pagehide',event=>{if(!event.persisted)lifecycle.abort();});
 }
}
