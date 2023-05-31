const API_KEY = "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";
const form = document.getElementById("input-form");
const result = document.getElementById("result");
const copyBtn = document.getElementById("copy-btn");
const loaderContainer = document.getElementById("loader-container");

loaderContainer.style.display = "none"; // Oculta el contenedor del cargador inicialmente

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  loaderContainer.style.display = "block"; // Muestra el cargador

  const idioma = document.getElementById("idioma").value;
  const nicho = document.getElementById("nicho").value;
  const tono = document.getElementById("tono").value;
  const servicios = document.getElementById("servicios").value;
  const emojis = document.getElementById("emojis").value;
  const longitudTexto = document.getElementById("longitudTexto").value;
  const tipoDeMensaje = document.getElementById("tipoDeMensaje").value;
  const llamadoALaAccion = document.getElementById("llamadoALaAccion").value;

  const prompt = `
  Genera un texto promocional "${idioma}" dirigido al nicho "${nicho}" con un tono
  "${tono}". El objetivo es promover "${servicios}" y 
   lograr una respuesta efectiva. El texto puede incluir "${emojis}". Debe ser "${longitudTexto}" y 
   adaptado para "${tipoDeMensaje}". Incluye un llamado a la acción 
   persuasivo para motivar a los lectores a "${llamadoALaAccion}". Como experto en Ventas y Marketing, 
   asegúrate de resaltar los beneficios y características de los servicios, utilizar técnicas 
   persuasivas y transmitir el valor único que ofrecemos.

  Por favor, genera un texto que cumpla con estos requisitos.
`;



  try {
    // Consulta en español
    const response = await fetch(
      "https://api.openai.com/v1/engines/text-davinci-003/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${API_KEY}`,
        },
        body: JSON.stringify({
          prompt: prompt,
          max_tokens: 1000, // Ajusta este valor según tus necesidades
          temperature: 0,
        }),
      }
    );


    if (response.status !== 200) {
      alert(
        "Se ha producido un error al comunicarse con la API. Por favor, inténtalo de nuevo más tarde."
      );
      return;
    }

    const data = await response.json();

    const generatedText = data.choices[0].text.trim();

    const combinedResult = `${generatedText}`;

    result.value = combinedResult;
  } catch (error) {
    console.error("Error al obtener datos de la API:", error);
  } finally {
    loaderContainer.style.display = "none"; // Oculta el cargador
  }
});

copyBtn.addEventListener("click", () => {
  result.select();
  document.execCommand("copy");
});