const express = require('express');
const cors = require('cors');
const axios = require('axios');
const app = express();

app.use(cors());
app.use(express.json());

const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbyEuqXXtR3TEOmgPUTl--peyDZJ_KlIc16YOim-Y0cHbGH3OxKl8_AOU1MWs57MHVqv/exec';

app.post('/', async (req, res) => {
  try {
    const response = await axios.post(GOOGLE_SCRIPT_URL, req.body);
    res.status(200).json(response.data);
  } catch (error) {
    console.error('❌ Error al reenviar a Google Script:', error.message);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Servir archivos estáticos: openapi.yaml y ai-plugin.json
const path = require('path');
app.use(express.static(path.join(__dirname, '/')));

app.listen(process.env.PORT || 3000, () => {
  console.log('✅ Proxy server corriendo');
});
