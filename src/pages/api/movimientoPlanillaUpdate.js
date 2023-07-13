export default async function handler(req, res) {

  const {codigoplanilla,conceptos, prioridad, tipooperacion, cuenta1, cuenta2, cuenta3, cuenta4,MovimientoExcepcion1,  
  MovimientoExcepcion2, MovimientoExcepcion3, Traba_Aplica_iess, Traba_Proyecto_imp_renta, Aplica_Proy_Renta, Empresa_Afecta_Iess } = req.query;

  // Hacer una solicitud a la API externa
  const response = await fetch(`http://apiservicios.ecuasolmovsa.com:3009/api/Varios/MovimientoPlanillaUpdate?codigoplanilla=${codigoplanilla}&conceptos=${conceptos}&prioridad=${prioridad}&tipooperacion=${tipooperacion}&cuenta1=${cuenta1}&cuenta2=${cuenta2}&cuenta3=${cuenta3}&cuenta4=${cuenta4}&MovimientoExcepcion1=${MovimientoExcepcion1}&MovimientoExcepcion2=${MovimientoExcepcion2}&MovimientoExcepcion3=${MovimientoExcepcion3}&Traba_Aplica_iess=${Traba_Aplica_iess}&Traba_Proyecto_imp_renta=${Traba_Proyecto_imp_renta}&Aplica_Proy_Renta=${Aplica_Proy_Renta}&Empresa_Afecta_Iess=${Empresa_Afecta_Iess}`);
  const data = JSON.parse(await response.text());

  // Agregar un encabezado CORS a la respuesta
  res.setHeader('Access-Control-Allow-Origin', '*');

  // Enviar la respuesta
  res.status(200).json(data);
}
