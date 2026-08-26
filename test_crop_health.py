import base64
import requests

API_KEY = "YOUR_API_KEY"

image_path = "crop.jpg"

with open(image_path, "rb") as f:
    image = base64.b64encode(f.read()).decode("utf-8")

response = requests.post(
    "https://plant.id/api/v3/identification",
    headers={
        "Api-Key": Cu2ykrFzxDc4jwwoRDjYNOcsIWGLkH0DFwHiOHRCO8Vw0bSpoP,
        "Content-Type": "application/json",
    },
    json={
        "images": [image],
        "health": "all",
        "similar_images": True,
        "language": "en"
    }
)

print("Status:", response.status_code)
print(response.json())
