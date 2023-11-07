//import { places } from "../../../../lib/db.js";
import Place from "@/db/models/Place";
import dbConnect from "@/db/connect";

export default async function handler(request, response) {
  await dbConnect();
  const { id } = request.query;

  if (!id) {
    return;
  }

  //const place = places.find((place) => place.id === id);
  if (request.method === "GET") {
    const place = await Place.findById(id);
    if (!place) {
      return response.status(404).json({ status: "Not found" });
    }
    response.status(200).json(place);
  }
  if (request.method === "PATCH") {
    const place = request.body;
    await Place.findByIdAndUpdate(id, place);
    return response.status(200).json({ status: "PLACE UPDATED" });
  }
  if (request.method === "DELETE") {
    await Place.findByIdAndDelete(id);
    return response.status(200).json({stauts: "PLACE DELETED"})
  }
}
