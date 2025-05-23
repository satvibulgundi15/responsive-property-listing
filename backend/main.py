from fastapi import FastAPI, Query
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles


import json
import os

app = FastAPI()
app.mount("/images", StaticFiles(directory="images"), name="images")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

DATA_FILE = os.path.join(os.path.dirname(__file__), "properties.json")

with open(DATA_FILE) as f:
    PROPERTIES = json.load(f)

@app.get("/properties")
def get_properties(
    min_price: int = Query(None),
    max_price: int = Query(None),
    type: str = Query(None),
    location: str = Query(None)
):
    results = PROPERTIES
    if min_price is not None:
        results = [p for p in results if p["price"] >= min_price]
    if max_price is not None:
        results = [p for p in results if p["price"] <= max_price]
    if type:
        results = [p for p in results if p["type"].lower() == type.lower()]
    if location:
        results = [p for p in results if p["location"].lower() == location.lower()]
    return results