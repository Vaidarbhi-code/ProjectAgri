import requests


OPEN_METEO_URL = "https://api.open-meteo.com/v1/forecast"


def get_weather_forecast(
    lat,
    lon,
    days=7
):
    """
    Get live weather forecast from Open-Meteo.

    No fake/fallback weather values are used.
    """

    params = {
        "latitude": lat,
        "longitude": lon,

        "current": [
            "temperature_2m",
            "relative_humidity_2m",
            "wind_speed_10m",
            "precipitation"
        ],

        "daily": [
            "temperature_2m_max",
            "temperature_2m_min",
            "precipitation_sum",
            "precipitation_probability_max"
        ],

        "timezone": "auto",
        "forecast_days": days
    }

    response = requests.get(
        OPEN_METEO_URL,
        params=params,
        timeout=20
    )

    response.raise_for_status()

    data = response.json()

    current = data.get(
        "current",
        {}
    )

    daily = data.get(
        "daily",
        {}
    )

    dates = daily.get(
        "time",
        []
    )

    forecast = []

    for i, date in enumerate(dates):

        forecast.append({
            "date": date,

            "temp_max_c":
                daily[
                    "temperature_2m_max"
                ][i],

            "temp_min_c":
                daily[
                    "temperature_2m_min"
                ][i],

            "rainfall_mm":
                daily[
                    "precipitation_sum"
                ][i],

            "rain_probability_pct":
                daily[
                    "precipitation_probability_max"
                ][i]
        })

    return {
        "current": {
            "temperature_c":
                current.get(
                    "temperature_2m"
                ),

            "humidity_pct":
                current.get(
                    "relative_humidity_2m"
                ),

            "wind_speed_kmh":
                current.get(
                    "wind_speed_10m"
                ),

            "precipitation_mm":
                current.get(
                    "precipitation"
                )
        },

        "forecast": forecast
    }


if __name__ == "__main__":

    result = get_weather_forecast(
        lat=19.8833,
        lon=74.4833,
        days=7
    )

    print("\nCURRENT WEATHER\n")

    print(
        "Temperature:",
        result["current"]["temperature_c"],
        "°C"
    )

    print(
        "Humidity:",
        result["current"]["humidity_pct"],
        "%"
    )

    print(
        "Wind:",
        result["current"]["wind_speed_kmh"],
        "km/h"
    )

    print("\n7-DAY FORECAST\n")

    for day in result["forecast"]:

        print(
            f"{day['date']} | "
            f"{day['temp_min_c']}–"
            f"{day['temp_max_c']}°C | "
            f"Rain: "
            f"{day['rainfall_mm']} mm | "
            f"Probability: "
            f"{day['rain_probability_pct']}%"
        )
