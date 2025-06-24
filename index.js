import express from 'express';
import cors from 'cors';
import axios from 'axios';

const app = express();
app.use(cors());
app.use(express.json());

const GOOGLE_SCRIPT_URL =
  'https://script.google.com/macros/s/AKfycbxLzty6M8vFnh0y9z1UFcBwpg34kdPK4Jn32VEDnYbokA00WGSqjew2dd_PTzsgujJg/exec';

app.post('/', async (req, res) => {
  console.log('📥 GPT llamó al proxy con:', JSON.stringify(req.body));
  try {
    const response = await axios.post(GOOGLE_SCRIPT_URL, req.body, {
      headers: { 'Content-Type': 'application/json' }
    });
    console.log('✅ Respuesta del Script:', response.data);
    res.status(200).json(response.data);
  } catch (error) {
    console.error('❌ Error al reenviar a Google Script:', error.message);
    if (error.response) console.error('🔍 Detalle:', error.response.data);
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