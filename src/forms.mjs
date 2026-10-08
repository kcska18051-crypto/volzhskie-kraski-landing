export function validateRequest(data) {
  const errors = {};
  if (!data.company?.trim()) errors.company = 'Укажите название компании.';
  const contact = data.contact?.trim() || '';
  const email = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact);
  const phone = /^[+\d\s().-]+$/.test(contact) && contact.replace(/\D/g,'').length >= 10 && contact.replace(/\D/g,'').length <= 15;
  if (!email && !phone) errors.contact = 'Укажите email или телефон с кодом города / страны.';
  if (data.mode === 'tds') {
    if (!data.material?.trim()) errors.material = 'Выберите материал или помощь с подбором.';
  } else {
    const attachment = data.attachment;
    const hasFile = typeof File !== 'undefined' && attachment instanceof File && attachment.name.trim() && attachment.size > 0;
    if (!data.task?.trim() && !hasFile) errors.task = 'Опишите задачу или приложите непустой файл готового ТЗ. Неизвестные параметры можно пропустить.';
  }
  return errors;
}
// Replace this adapter only after the delivery channel, consent documents and file rules are approved.
export async function demoTransport() {
  return { sent: false, status: 'demo', message: 'Заполнение проверено. Это демонстрация: запрос не отправлен, файл не загружен. Реальную отправку подключим после согласования канала связи.' };
}
