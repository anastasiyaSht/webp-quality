const qualityRange = document.getElementById('webp-quality-range');
const qualityNumber = document.getElementById('webp-quality-number');

const changeImageQuality = (event) => {
    event.preventDefault()
    if (qualityRange.value === qualityNumber.value) {
        return
    }
    if (event.target && event.target.value) {
        fetch("/update-quality", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                webpQuality: parseInt(event.target.value)
            })
        })
        .then(res => res.json())
        .then(res => {
            const {id, value} = res
            const image = document.getElementById("webp-image");
            image.src = `./img/2.webp?timestamp=${id}?quality=${value}`;
            if (event.target.id === 'webp-quality-range') {
                qualityNumber.value = value;
            } else {
                qualityRange.value = value.toString();
            }
        })
    }
}

qualityRange.addEventListener('change', changeImageQuality);
qualityNumber.addEventListener('change', changeImageQuality);
