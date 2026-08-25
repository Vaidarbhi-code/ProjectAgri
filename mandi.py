import os
import requests

from dotenv import load_dotenv


load_dotenv()


RESOURCE_ID = os.getenv(
    "DATA_GOV_RESOURCE_ID",
    "9ef84268-d588-465a-a308-a864a43d0070"
)


def get_mandi_prices(
    api_key,
    state=None,
    commodity=None,
    district=None,
    market=None,
    limit=50
):
    """
    Fetch mandi prices from data.gov.in.

    No fake/fallback market values are used.
    """

    if not api_key:
        raise RuntimeError(
            "DATA_GOV_API_KEY is missing."
        )

    url = (
        "https://api.data.gov.in/resource/"
        f"{RESOURCE_ID}"
    )

    params = {
        "api-key": api_key,
        "format": "json",
        "limit": limit
    }

    if state:
        params[
            "filters[state]"
        ] = state

    if commodity:
        params[
            "filters[commodity]"
        ] = commodity

    if district:
        params[
            "filters[district]"
        ] = district

    if market:
        params[
            "filters[market]"
        ] = market

    response = requests.get(
        url,
        params=params,
        timeout=20
    )

    response.raise_for_status()

    data = response.json()

    prices = []

    for record in data.get(
        "records",
        []
    ):

        prices.append({

            "state":
                record.get("state"),

            "district":
                record.get("district"),

            "market":
                record.get("market"),

            "commodity":
                record.get("commodity"),

            "variety":
                record.get("variety"),

            "min_price":
                record.get("min_price"),

            "max_price":
                record.get("max_price"),

            "modal_price":
                record.get("modal_price"),

            "date":
                record.get("arrival_date")
        })

    return prices


if __name__ == "__main__":

    api_key = os.getenv(
        "DATA_GOV_API_KEY"
    )

    if not api_key:

        raise RuntimeError(
            "Add DATA_GOV_API_KEY "
            "to your .env file."
        )

    prices = get_mandi_prices(

        api_key=api_key,

        state="Maharashtra",

        commodity="Onion",

        district="Ahmednagar",

        market="Kopargaon",

        limit=20
    )

    if not prices:

        print(
            "No verified Kopargaon "
            "market records were returned."
        )

    for price in prices:

        print(
            f"{price['date']} | "
            f"{price['market']} | "
            f"{price['commodity']} | "
            f"₹{price['min_price']}–"
            f"₹{price['max_price']} | "
            f"Modal: ₹"
            f"{price['modal_price']}"
        )
