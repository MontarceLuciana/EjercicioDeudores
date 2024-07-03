const express = require('express');
const { Op, ValidationError } = require("sequelize");
const router = express.Router();
const db = require("../base-orm/sequelize-init");

// Obtener todos los deudores
router.get('/api/deudores', async (req, res) => {
  try {
    const { count, rows } = await db.deudores.findAndCountAll({
        attributes: [
          "IdDeudor",
          "ApellidoYNombre",
          "FechaDeuda",
          "ImporteAdeudado"
        ],
        order: [["ApellidoYNombre", "ASC"]],
      });
    
      return res.json({ Items: rows, RegistrosTotal: count });  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los deudores' });
  }
});

// Crear un nuevo empleado
router.post('/api/deudores', async (req, res) => {
  try {
    const nuevoDeudor = await db.deudores.create(
      {
        ApellidoYNombre: req.body.ApellidoYNombre,
        FechaDeuda: req.body.FechaDeuda,
        ImporteAdeudado: req.body.ImporteAdeudado
      });
    res.status(200).json(nuevoDeudor);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;