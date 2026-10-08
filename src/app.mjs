import { validateRequest, demoTransport } from './forms.mjs';
import { contactConfig, contactHref } from './contacts.mjs';
const form = document.querySelector('#request-form');
const dialog = document.querySelector('#request-dialog');
const home = document.querySelector('#form-home');
const taskField = document.querySelector('#task-field');
const tdsField = document.querySelector('#tds-field');
const status = document.querySelector('.form-status');
document.querySelector('.submit').disabled = false;
let opener;
const clearErrors = () => {
  form.querySelectorAll('[aria-invalid]').forEach(el => el.removeAttribute('aria-invalid'));
  form.querySelectorAll('.error').forEach(el => el.textContent = '');
  status.textContent = ''; status.classList.remove('checked');
};
function setMode(mode, context = {}) {
  clearErrors();
  form.elements.mode.value = mode;
  const tds = mode === 'tds';
  taskField.hidden = tds; tdsField.hidden = !tds;
  // Description and a nonempty selected file are alternatives; validate them together.
  form.elements.task.required = false;
  form.elements.tdsMaterial.required = tds;
  document.querySelector('#additional-fields').hidden = tds;
  document.querySelector('#form-title').textContent = tds ? 'Запросить техническое описание' : (context.title || 'Заполнить техническое задание');
  if (context.ready) document.querySelector('#additional-fields').open = true;
  if (context.material) form.elements[tds ? 'tdsMaterial' : 'material'].value = context.material;
  if (context.application) {
    form.elements.application.value = context.application;
    document.querySelector('#additional-fields').open = true;
  }
  if (context.intent && !form.elements.task.value.trim()) form.elements.task.value = `${context.intent}: `;
}
document.querySelectorAll('.open-request').forEach(link => link.addEventListener('click', event => {
  if (!dialog.showModal) return;
  event.preventDefault();
  opener = link;
  setMode(link.dataset.mode || 'production', link.dataset);
  document.querySelector('#dialog-form').append(form);
  dialog.showModal(); document.body.classList.add('dialog-open');
  form.elements.company.focus({preventScroll:true});
}));
document.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
dialog.addEventListener('keydown', event => {
  if (event.key !== 'Tab') return;
  const elements = [...dialog.querySelectorAll('button,input,select,textarea,summary,a[href]')].filter(el => !el.disabled && el.type !== 'hidden' && el.getClientRects().length);
  const first = elements[0], last = elements.at(-1);
  if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
  else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
});
dialog.addEventListener('click', e => { if(e.target === dialog) {const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom) dialog.close();} });
dialog.addEventListener('close', () => {
  home.append(form); document.body.classList.remove('dialog-open');
  setMode('production'); opener?.focus({preventScroll:true});
});
form.addEventListener('submit', async event => {
  event.preventDefault(); clearErrors();
  const data = Object.fromEntries(new FormData(form));
  if (data.mode === 'tds') data.material = data.tdsMaterial;
  const errors = validateRequest(data);
  const targets = {company:form.elements.company,contact:form.elements.contact,task:form.elements.task,material:form.elements.tdsMaterial};
  for(const [key,message] of Object.entries(errors)) {
    targets[key].setAttribute('aria-invalid','true');
    document.querySelector(`#${key}-error`).textContent = message;
  }
  if (Object.keys(errors).length) { targets[Object.keys(errors)[0]].focus(); status.textContent = 'Проверьте выделенные поля.'; return; }
  const result = await demoTransport(data);
  status.textContent = result.message; status.classList.add('checked');
});
const menu = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');
function closeMenu(){nav.classList.remove('open');menu.setAttribute('aria-expanded','false');}
menu.addEventListener('click',()=>{const open=menu.getAttribute('aria-expanded')!=='true';nav.classList.toggle('open',open);menu.setAttribute('aria-expanded',String(open));});
nav.querySelectorAll('a').forEach(link=>link.addEventListener('click',closeMenu));
document.addEventListener('keydown',event=>{if(event.key==='Escape'&&menu.getAttribute('aria-expanded')==='true'){closeMenu();menu.focus();}});
const art = document.querySelector('.hero-art');
document.querySelectorAll('.color-choice').forEach(button=>button.addEventListener('click',()=>{
  art.classList.remove('red','blue','grey');art.classList.add(button.dataset.color);
  document.querySelectorAll('.color-choice').forEach(other=>{const active=other===button;other.classList.toggle('active',active);other.setAttribute('aria-pressed',String(active));});
}));

const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
const finePointer = matchMedia('(hover: hover) and (pointer: fine)');
const motionSurfaces = [art,...document.querySelectorAll('.application-card')];
const resetSurface = element => {
  element.style.setProperty('--surface-x','0px');
  element.style.setProperty('--surface-y','0px');
  element.style.setProperty('--surface-turn','0deg');
};
for (const element of motionSurfaces) {
  const isHero = element === art;
  element.addEventListener('pointermove', event => {
    if (!finePointer.matches || reducedMotion.matches || event.pointerType === 'touch') return;
    const bounds = element.getBoundingClientRect();
    if (!bounds.width || !bounds.height) return;
    const x = Math.max(-1,Math.min(1,2*(event.clientX-bounds.left)/bounds.width-1));
    const y = Math.max(-1,Math.min(1,2*(event.clientY-bounds.top)/bounds.height-1));
    element.style.setProperty('--surface-x',`${x*(isHero?9:5)}px`);
    element.style.setProperty('--surface-y',`${y*(isHero?7:4)}px`);
    element.style.setProperty('--surface-turn',`${isHero?x*.6:0}deg`);
  });
  element.addEventListener('pointerleave',()=>resetSurface(element));
}
reducedMotion.addEventListener?.('change',()=>motionSurfaces.forEach(resetSurface));
finePointer.addEventListener?.('change',()=>motionSurfaces.forEach(resetSurface));

const finishNames = {red:'красный',blue:'синий',grey:'серый'};
const finishTokens = {red:'--red',blue:'--blue',grey:'--muted'};
document.querySelectorAll('.finish-choice').forEach(button=>button.addEventListener('click',()=>{
  const finish = button.dataset.finish;
  const color = getComputedStyle(document.documentElement).getPropertyValue(finishTokens[finish]).trim();
  document.querySelector('.color-surface').style.fill = color;
  document.querySelectorAll('.finish-choice').forEach(other=>other.setAttribute('aria-pressed',String(other===button)));
  document.querySelector('.finish-status').textContent = `Демонстрационный оттенок: ${finishNames[finish]}`;
}));
for (const kind of ['phone','email']) {
  const element = document.querySelector(`[data-contact="${kind}"]`);
  const item = contactConfig[kind];
  const href = contactHref(kind,item);
  element.textContent = item.label;
  if (href) {
    const link = document.createElement('a');
    link.href = href; link.textContent = item.label; element.replaceChildren(link);
  }
}
document.querySelector('[data-official-contacts]').href = contactConfig.officialUrl;
document.querySelector('.contact-note').hidden = ['phone','email'].every(kind=>contactHref(kind,contactConfig[kind]));

// No hidden pre-animation state: missing/failed observer never conceals content.
if ('IntersectionObserver' in window && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const targets = document.querySelectorAll('.section-head,.color-product,.color-controls,.quality-points,.cooperation-heading,.faq>div:first-child,.partners,.application-card,.material,.quality-steps li,.process-line>div,.cooperation-options article,.production-cover,.production-details');
  let observer;
  try {
    observer = new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('reveal-ready');observer.unobserve(entry.target);}}),{threshold:.04});
    targets.forEach(el=>{
      const siblings = [...el.parentElement.children];
      el.style.setProperty('--reveal-delay',`${Math.min(siblings.indexOf(el),2)*60}ms`);
      observer.observe(el);
    });
  } catch {
    observer?.disconnect();
    targets.forEach(el=>el.classList.remove('reveal-ready'));
  }
}
