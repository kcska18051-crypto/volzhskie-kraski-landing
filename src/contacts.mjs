// Activate each contact only after the client confirms its value and display label.
// No telephone value is inferred from the conflicting source site's link.
export const contactConfig = {
  officialUrl: 'https://volgacoatings.ru/contacts/',
  phone: {label:'+7 (4852) 58-76-54',value:null,confirmed:false},
  email: {label:'sales@volgakraski.ru',value:null,confirmed:false},
};

export function contactHref(kind,item) {
  if (!item?.confirmed || typeof item.value !== 'string') return null;
  if (kind === 'phone' && /^\+\d{10,15}$/.test(item.value)) return `tel:${item.value}`;
  if (kind === 'email' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(item.value)) return `mailto:${item.value}`;
  return null;
}
