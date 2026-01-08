
const SERVER_URL = 'https://31.javascript.htmlacademy.pro/kekstagram';

async function getData() {
  try {
    const response = await fetch(`${SERVER_URL}/data`);
    if (!response.ok) {
      throw new Error('Ошибка загрузки');
    }
    return await response.json();
  } catch (error) {
    throw new Error('Не удалось загрузить фото');
  }
}


async function sendData(formData) {
  try {
    const response = await fetch(SERVER_URL, {
      method: 'POST',
      body: formData,
    });
    if (!response.ok) {
      throw new Error('Ошибка отправки');
    }
    return await response.json();
  } catch (error) {
    throw new Error('Не удалось отправить фото');
  }
}

export { getData, sendData };
