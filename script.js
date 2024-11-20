async function classifyImage(event) {
    const file = event.target.files[0];
    if (!file) return;
  
    // Load the MobileNet model
    const model = await mobilenet.load();
  
    // Display the uploaded image
    const img = document.createElement('img');
    img.src = URL.createObjectURL(file);
    img.width = 300; // Resize for display
  
    // Wait for the image to load
    img.onload = async () => {
      document.getElementById('result').innerHTML = ''; // Clear previous result
      document.getElementById('result').appendChild(img);
  
      // Run classification
    const predictions = await model.classify(img);
      const topPrediction = predictions[0]; // The first item in the sorted list is the most accurate
      const p = document.createElement('p');
      p.textContent = `Скоріш за все, це ${topPrediction.className}. Точність відповіді ${(topPrediction.probability * 100).toFixed(2)}%`;
      p.id = 'answer';
      document.getElementById('result').appendChild(p);

      const addinfo = document.createElement('p');
      addinfo.textContent = `Якщо ви хочете дізнатися більше про ${topPrediction.className}, перейдіть за посиланням:`
      addinfo.id = 'addinfo';
      document.getElementById('result').appendChild(addinfo);

      const searsh = document.createElement('a')
      searsh.href = `https://www.google.com/search?q=${topPrediction.className}`
      searsh.textContent = 'Посилання'
      searsh.id = 'search'
      searsh.target = '_blank'
      document.getElementById('result').appendChild(searsh);
    };
  }

