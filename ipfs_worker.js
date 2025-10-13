// worker.js
export default {
  async fetch(request, env, ctx) {
    // Разрешаем CORS запросы
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type',
        }
      });
    }

    // Разрешаем только GET запросы
    if (request.method !== 'GET') {
      return new Response('Method not allowed', { status: 405 });
    }

    try {
      const { searchParams } = new URL(request.url);
      const cid = searchParams.get('cid');
      
      if (!cid) {
        return new Response(JSON.stringify({ error: 'Missing CID parameter' }), {
          status: 400,
          headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
        });
      }

      // Используем IPFS-шлюз для получения контента
      const ipfsGateway = 'https://black-obliged-cricket-162.mypinata.cloud';
      const ipfsUrl = `${ipfsGateway}/ipfs/${cid}`;
      
      const response = await fetch(ipfsUrl);
      
      if (!response.ok) {
        throw new Error(`IPFS gateway error: ${response.status}`);
      }
      
      const content = await response.text();
      
      // Извлекаем ссылки на изображения
      const imageLinks = extractIpfsLinks(content, ipfsGateway);
      
      // Возвращаем данные с CORS заголовками
      return new Response(JSON.stringify({ 
        success: true,
        images: imageLinks 
      }), {
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
          'Access-Control-Allow-Origin': '*',
          'Cache-Control': 'public, max-age=300'
        }
      });

    } catch (error) {
      console.error('Worker error:', error);
      
      return new Response(JSON.stringify({ 
        success: false,
        error: error.message 
      }), {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      });
    }
  }
};

// Функция для извлечения IPFS-ссылок на изображения
function extractIpfsLinks(html, gateway) {
  const regex = /href=["']\/ipfs\/([^"']+)["']/g;
  const matches = [];
  let match;
  
  while ((match = regex.exec(html)) !== null) {
    const path = match[1];
    const cleanPath = path.split('?')[0];
    
    if (/\.(jpg|jpeg|png|gif|webp)$/i.test(cleanPath)) {
      matches.push(`${gateway}/ipfs/${cleanPath}`);
    }
  }
  return matches;
}