require('dotenv').config();
const express = require('express');
const axios = require('axios');
const app = express();

app.use(express.json());

const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbyEuqXXtR3TEOmgPUTl--peyDZJ_KlIc16YOim-Y0cHbGH3OxKl8_AOU1MWs57MHVqv/exec';

app.post('/', async (req, res) => {
  console.log('📥 GPT llamó al proxy con:', JSON.stringify(req.body));

  try {
    const response = await axios.post(GOOGLE_SCRIPT_URL, req.body);
    console.log('✅ Respuesta del Script:', response.data);
    res.status(200).json(response.data);
  } catch (error) {
    console.error('❌ Error al reenviar a Google Script:', error.message);
    res.status(500).json({ success: false, error: error.message });
  }
});

app.get('/', (req, res) => {
  res.send('🟢 Servidor proxy en Render corriendo');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor escuchando en puerto ${PORT}`);
});
