export default async function handler(req, res) {

  const {
    COMP_Codigo,
    Tipo_trabajador,
    Apellido_Paterno,
    Apellido_Materno,
    Nombres,
    Identificacion,
    Entidad_Bancaria,
    CarnetIESS,
    Direccion,
    Telefono_Fijo,
    Telefono_Movil,
    Genero,
    Nro_Cuenta_Bancaria,
    Codigo_Categoria_Ocupacion,
    Ocupacion,
    Centro_Costos,
    Nivel_Salarial,
    EstadoTrabajador,
    Tipo_Contrato,
    Tipo_Cese,
    EstadoCivil,
    TipodeComision,
    FechaNacimiento,
    FechaIngreso,
    FechaCese,
    PeriododeVacaciones,
    FechaReingreso,
    Fecha_Ult_Actualizacion,
    EsReingreso,
    Tipo_Cuenta,
    FormaCalculo13ro,
    FormaCalculo14ro,
    BoniComplementaria,
    BoniEspecial,
    Remuneracion_Minima,
    Fondo_Reserva
  } = req.query;

  const url = `http://apiservicios.ecuasolmovsa.com:3009/api/Varios/TrabajadorInsert?COMP_Codigo=${COMP_Codigo}&Tipo_trabajador=${Tipo_trabajador}&Apellido_Paterno=${encodeURIComponent(Apellido_Paterno)}&Apellido_Materno=${encodeURIComponent(Apellido_Materno)}&Nombres=${encodeURIComponent(Nombres)}&Identificacion=${Identificacion}&Entidad_Bancaria=${encodeURIComponent(Entidad_Bancaria)}&CarnetIESS=${CarnetIESS}&Direccion=${encodeURIComponent(Direccion)}&Telefono_Fijo=${Telefono_Fijo}&Telefono_Movil=${Telefono_Movil}&Genero=${Genero}&Nro_Cuenta_Bancaria=${Nro_Cuenta_Bancaria}&Codigo_Categoria_Ocupacion=${Codigo_Categoria_Ocupacion}&Ocupacion=${Ocupacion}&Centro_Costos=${Centro_Costos}&Nivel_Salarial=${Nivel_Salarial}&EstadoTrabajador=${EstadoTrabajador}&Tipo_Contrato=${Tipo_Contrato}&Tipo_Cese=${Tipo_Cese}&EstadoCivil=${EstadoCivil}&TipodeComision=${TipodeComision}&FechaNacimiento=${FechaNacimiento}&FechaIngreso=${FechaIngreso}&FechaCese=${FechaCese}&PeriododeVacaciones=${PeriododeVacaciones}&FechaReingreso=${FechaReingreso}&Fecha_Ult_Actualizacion=${Fecha_Ult_Actualizacion}&EsReingreso=${EsReingreso}&Tipo_Cuenta=${Tipo_Cuenta}&FormaCalculo13ro=${FormaCalculo13ro}&FormaCalculo14ro=${FormaCalculo14ro}&BoniComplementaria=${BoniComplementaria}&BoniEspecial=${BoniEspecial}&Remuneracion_Minima=${Remuneracion_Minima}&Fondo_Reserva=${Fondo_Reserva}`;

  console.log(url);

  fetch(url, {
    method: 'POST',
    headers: {
      'Accept': 'text/plain'
    }
  })
    .then(response => response.text())
    .then(data => console.log(data))
    .catch(error => console.error(error));

}
