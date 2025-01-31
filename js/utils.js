async function getShaderTexts(
  vertexShaderLocation = `../shaders/new/vertex.glsl`,
  fragmentShaderLocation = `../shaders/new/fragment.glsl`
) {
  const VERTEX_SHADER_RESPONSE = await fetch(vertexShaderLocation);

  if (VERTEX_SHADER_RESPONSE.status == 200) {
    const VERTEX_SHADER_RESPONSE = await fetch(vertexShaderLocation);
    const VERTEX_SHADER_TEXT = await VERTEX_SHADER_RESPONSE.text();

    const FRAGMENT_SHADER_RESPONSE = await fetch(fragmentShaderLocation);
    const FRAGMENT_SHADER_TEXT = await FRAGMENT_SHADER_RESPONSE.text();

    return { VERTEX_SHADER_TEXT, FRAGMENT_SHADER_TEXT }
  } else {
    const VERTEX_SHADER_RESPONSE = await fetch(
      vertexShaderLocation.substring(3)
    );
    const VERTEX_SHADER_TEXT = await VERTEX_SHADER_RESPONSE.text();

    const FRAGMENT_SHADER_RESPONSE = await fetch(
      fragmentShaderLocation.substring(3)
    );
    const FRAGMENT_SHADER_TEXT = await FRAGMENT_SHADER_RESPONSE.text();

    return { VERTEX_SHADER_TEXT, FRAGMENT_SHADER_TEXT }
  }
}

appendMemoryUsageCounter = () => {
  let script = document.createElement('script');
  script.src = 'https://rawgit.com/paulirish/memory-stats.js/master/bookmarklet.js';
  document.head.appendChild(script);
}
