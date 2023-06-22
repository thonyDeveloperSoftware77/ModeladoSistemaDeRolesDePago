export default async function handler(req, res) {

    const { codigocentrocostos, descripcioncentrocostos } = req.query;
  
    // Hacer una solicitud a la API externa
    const response = await fetch(`http://apiservicios.ecuasolmovsa.com:3009/api/Varios/CentroCostosUpdate?codigocentrocostos=${codigocentrocostos}&descripcioncentrocostos=${encodeURIComponent(descripcioncentrocostos)}`);
    const data = JSON.parse(await response.text());
  
    // Agregar un encabezado CORS a la respuesta
    res.setHeader('Access-Control-Allow-Origin', '*');
  
    // Enviar la respuesta
    res.status(200).json(data);
  }
  