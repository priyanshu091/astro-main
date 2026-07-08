import { computePanchang, computeHoraChaughadiya } from './engine';

try {
  const lat = 26.8467;
  const lng = 80.9462;
  const datetime = "2026-07-08T00:00:00+05:30";
  const p = computePanchang(datetime, lat, lng, "+05:30");
  console.log("Panchang success");
  const h = computeHoraChaughadiya(datetime, lat, lng, "+05:30");
  console.log("Hora success");
} catch (err: any) {
  console.error("Error:", err.message);
}
